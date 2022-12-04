import { request } from "../utils/axios-utils";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useSuperHeroesData = ({ onSuccess, onError }) => {
  const fetchSuperHeroes = () => {
    // return axios.get('http://localhost:4000/superheroes')
    return request({ url: "/superheroes" }).then((res) => res.data);
  };

  const query = useQuery("heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
    // staleTime: 3000,
    refetchOnWindowFocus: false,
    enabled: true,
  });
  return query;
};

export const useAddSuperHeroesData = () => {
  const addSuperHero = (hero) => {
    // return axios.post('http://localhost:4000/superheroes',hero)
    return request({ url: "/superheroes", method: "post", data: hero });
  };
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // 1-yo'li so'rovni bekor qilamiz react-query o'zi qayta yuklaydi
    //   // queryClient.invalidateQueries("heroes");
    //   // 2-yo'li post data ni ham qaytaradi shuni keshga qo'shib qo'yamiz
    //   queryClient.setQueryData("heroes", (oldData) => {
    //     return [...oldData, data.data];
    //   });
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelMutations("heroes");
      const previewData = queryClient.getQueryData("heroes");
      queryClient.setQueryData("heroes", (oldData) => {
        return [...oldData, { ...newHero, id: oldData.length + 1 }];
      });
      return previewData;
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData("heroes", context.previewData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("heroes");
    },
  });
};
