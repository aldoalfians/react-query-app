import React from "react";
import { useQuery } from "react-query";
import Person from "./Person";

const fetchPeople = async () => {
  const res = await fetch("https://swapi.py4e.com/api/people/");
  return res.json();
};

export default function People() {
  const { data, status } = useQuery("people", fetchPeople);
  console.log(data);

  return (
    <>
      <h2>People</h2>

      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error Fetching Data</div>}
      {status === "success" && (
        <div>
          {data.results.map((person) => (
            <Person key={person.name} person={person} />
          ))}
        </div>
      )}
    </>
  );
}
