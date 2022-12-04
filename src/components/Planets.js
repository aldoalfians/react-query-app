import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./planet";

export default function Planets() {
  const [page, setPage] = useState(1);

  const fetchPlanets = async () => {
    const res = await fetch(`https://swapi.py4e.com/api/planets/?page=${page}`);
    return res.json();
  };

  const { data, status, isFetching, isPreviousData } = useQuery(
    ["planets", page],
    fetchPlanets,
    { keepPreviousData: true }
  );
  console.log(data);

  return (
    <>
      <h2>Planets</h2>
      {/* <p>{status}</p> */}

      <span>Current Page: {page}</span>
      <button
        disabled={page === 1}
        onClick={() => setPage((old) => Math.max(old - 1, 1))}
      >
        Previous
      </button>
      <button
        onClick={() => {
          if (!isPreviousData) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isPreviousData || page === 7}
      >
        Next Page
      </button>

      {isFetching && <div>Loading...</div>}
      {status === "error" && <div>Error Fetching Data</div>}
      {status === "success" && (
        <div>
          {data?.results?.map((planet) => (
            <Planet key={planet?.name} planet={planet} />
          ))}
        </div>
      )}
    </>
  );
}
