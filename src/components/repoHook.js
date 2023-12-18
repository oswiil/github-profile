import React, { useEffect, useState } from "react";
import github from "../utils/axios";

function RepoCli({ user_name }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await github.get(`/users/${user_name.data}/repos`);
        const repositories = response.data;
        setData(repositories);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    // Call fetchData only once by passing an empty dependency array
    fetchData();
  }, [user_name.data]); // Add user_name.data to the dependency array

  return (
    <>
      {data.map((repo) => (
        <div key={repo.id} className="column is-one-quarter">
          <span className="box">
            <a href={repo.html_url}>
              <p className="title">{repo.name}</p>
            </a>
            <li>
              <p className="description">{repo.description}</p>
              <p className="description">{repo.language}</p>
              <p>{repo.forks_count}</p>
              <p> {repo.default_branch}</p>
              <p>{repo.size / 1000 + "/mb"}</p>
            </li>
          </span>
        </div>
      ))}
    </>
  );
}

export default RepoCli;
