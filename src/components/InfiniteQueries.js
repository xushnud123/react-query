import axios from "axios";
import { useInfiniteQuery } from "react-query";

const fetchInfiniteQueries = ({ pageParam = 1 }) => {
  return axios
    .get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
    .then((res) => res.data);
};

export const InfiniteQueries = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["colors"], fetchInfiniteQueries, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else return undefined;
    },
  });

  console.log(isFetching,isFetchingNextPage)

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  // console.log(data);

  return (
    <div>
      <h2>Pagination</h2>
      {data &&
        data.pages?.map((group, i) => {
          return (
            <div key={i}>
              {group.map((color) => (
                <h1 key={color.id}>
                  {color.id}. {color.label}
                </h1>
              ))}
            </div>
          );
        })}
      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load More
        </button>
      </div>
      <div>{isFetching && isFetchingNextPage ? "Loading..." : ""}</div>
    </div>
  );
};
