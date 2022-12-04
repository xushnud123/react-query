import React from "react";
import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

export const RQSuperHeroes = () => {
  const { heroId } = useParams();
  const { data, isLoading, isError, error } = useSuperHeroData(heroId);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>{error}</h1>;
  }
 
  return (
    <div>
      <div>{data?.name}</div>
      <div>{data?.alterEgo}</div>
    </div>
  );
};
