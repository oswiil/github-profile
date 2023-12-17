import React, { useEffect, useState, useCallback } from 'react';
import github from '../utils/axios';
import debounce from 'lodash/debounce'; // Importa específicamente la función debounce de lodash

function RepoCli(user_name) {
  console.log('🚀 ~ file: repoHook.js:8 ~ RepoCli ~ user_name:', user_name);
  const [data, setData] = useState([]);

  const fetchData = useCallback(
    debounce(async () => {
      try {
        const response = await github.get(`/users/${user_name.data}/repos`);
        const repositories = response.data;

        setData(repositories);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }, 3000),
    [user_name]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
              <p>{repo.size / 1000 + '/mb'}</p>
            </li>
          </span>
        </div>
      ))}
    </>
  );
}

export default RepoCli;
