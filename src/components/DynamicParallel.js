import axios from "axios";
import React from "react";
import { useQueries } from "react-query";

export default function DynamicParallel({ heroIds }) {
  const fetchSuperHero = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
  };

  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
        refetchOnWindowFocus: false,
      };
    })
  );
  console.log(queryResults);
  return <div>DynamicParallel</div>;
}
