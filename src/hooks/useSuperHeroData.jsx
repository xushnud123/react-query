import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

export const useSuperHeroData = (heroId) => {
  function fetchSuperHero({ queryKey }) {
    const heroId = queryKey[1];
    return axios
      .get(`http://localhost:4000/superheroes/${heroId}`)
      .then((res) => res.data);
  }

  const queryClient = useQueryClient();

  return useQuery(["super-hero", heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("heroes")
        ?.find((hero) => hero.id === parseInt(heroId));

      console.log("hero", hero);

      if (hero) {
        return hero;
      } else return undefined;
    },
  });
};
