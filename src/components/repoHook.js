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

        //   const repositoriesWithLanguages = [];
        //   for (const repo of repositories) {
        //     try {
        //       // Hacer la solicitud de lenguajes
        //       const languageResponse = await axios.get(repo.languages_url, {
        //         baseURL: repo.languages_url,
        //       });

        //       const languages_url = languageResponse.data;

        //       // Agregar el repositorio con los lenguajes al array final
        //       repositoriesWithLanguages.push({
        //         ...repo,
        //         languages_url,
        //       });

        //       // Esperar un breve período de tiempo entre las solicitudes
        //       await new Promise((resolve) => setTimeout(resolve, 1500)); // 1000 milisegundos (1 segundo)
        //     } catch (languageError) {
        //       console.error(
        //         'Error al obtener lenguajes para el repositorio:',
        //         languageError
        //       );
        //     }
        //   }
        //   console.log('secargo', repositoriesWithLanguages);
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

  const handlerCopy = (text) => {
    window.prompt(text);
  };
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
              <p className="description">
                {repo.language}
                {/* <Progress languages={repo.language}></Progress>  */}
              </p>
              <p>{repo.forks_count}</p>
              <p> {repo.default_branch}</p>
              <p>{repo.size / 1000 + '/mb'}</p>
              {/* <div onClick={handlerCopy(repo.git_url)}></div> */}
              {/* git_url ssh_url */}
            </li>
          </span>
        </div>
      ))}
    </>
  );
}

export default RepoCli;
