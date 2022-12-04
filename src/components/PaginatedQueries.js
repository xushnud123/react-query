import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchPaginatedQueries = (id) => {
  return axios
    .get(`http://localhost:4000/colors/?_limit=2&_page=${id}`)
    .then((res) => res.data);
};

export const PaginatedQueries = () => {
  const [state, setState] = useState(1);
  const { data, isLoading, isError, error } = useQuery(
    ["colors", state],
    () => fetchPaginatedQueries(state),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  console.log(data);

  return (
    <div>
      <h2>Pagination</h2>
      <div>
        <button onClick={() => setState(state - 1)} disabled={state === 1}>
          Prev
        </button>
        <button onClick={() => setState(state + 1)} disabled={state === 4}>
          Next
        </button>
      </div>
      {data &&
        data?.map((color) => {
          return (
            <h1 key={color.id}>
              {color.id}. {color.label}
            </h1>
          );
        })}
    </div>
  );
};
