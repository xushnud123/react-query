import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

export default function ParallelQueriesPage() {
  const fetchSuperHeroesFriends = () => {
    return axios
      .get(`http://localhost:4000/friends`)
      .then((res) => res.data);
  };
  const fetchSuperHeroes = () => {
    return axios
      .get(`http://localhost:4000/superheroes`)
      .then((res) => res.data);
  };
  const { data, isLoading, isError, error } = useQuery(
    ["super-heroes"],
    fetchSuperHeroes,
  );
  const { data: s } = useQuery(["fiends"], fetchSuperHeroesFriends);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>{error}</h1>;
  }
  return <div>{data?.name}</div>;
}
