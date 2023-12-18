import React, { useEffect, useState, useCallback } from 'react';
import github from '../utils/axios';
import axios from 'axios';
import debounce from 'lodash/debounce'; // Importa específicamente la función debounce de lodash

function LangCli(user_name) {
  console.log('🚀 ~ file: repoHook.js:8 ~ RepoCli ~ user_name:');
  const [data, setData] = useState([]);

  const fetchData = useCallback(
    debounce(async () => {
      try {
        const response = await github.get(`/users/oswiil/repos`);
        const repositories = response.data;

        const repositoriesWithLanguages = [];
        for (const repo of repositories) {
          try {
            // Hacer la solicitud de lenguajes
            const languageResponse = await axios.get(repo.languages_url, {
              baseURL: repo.languages_url,
            });

            const languages_urll = languageResponse.data;

            // Agregar el repositorio con los lenguajes al array final
            repositoriesWithLanguages.push({
              ...repo,
              languages_urll,
            });

            // Esperar un breve período de tiempo entre las solicitudes
            await new Promise((resolve) => setTimeout(resolve, 1500)); // 1000 milisegundos (1 segundo)
          } catch (languageError) {
            console.error(
              'Error al obtener lenguajes para el repositorio:',
              languageError
            );
          }
        }
        console.log('secargo', repositoriesWithLanguages);
        setData(repositories);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    }, 3000),
    []
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {console.log(data) &&
        data.map((repo) => (
          <div key={repo.id} className="column is-one-quarter">
            <span className="box">
              <a href={repo.html_url}>
                <p className="title">{repo.name}</p>
              </a>
              <li>
                <p className="description">{repo.description}</p>
                <p className="description">
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

export default LangCli;
