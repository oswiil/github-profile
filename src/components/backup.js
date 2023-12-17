import React, { useEffect, useRef, useState } from 'react';

import github from '../utils/axios';
import Progress from './progress';
import axios from 'axios';
import debounce from 'lodash';

function RepoCli(user_name) {
  const [data, setData] = useState();
  useEffect(() => {
    const debounceFn = useCallback(debounce(handleDebounceFn, 1000), []);

    github
      .get(`/users/${user_name.data}/repos`)
      .then((response) => {
        const repositories = response.data;
        const languagePromises = repositories.map((repo) =>
          axios.get(repo.languages_url)
        );

        Promise.all(languagePromises)
          .then((languageResponses) => {
            // Mapear las respuestas y agregar la información de lenguajes a cada repositorio
            const repositoriesWithLanguages = repositories.map(
              (repo, index) => ({
                ...repo,
                languages_url: languageResponses[index].data,
              })
            );

            setData(repositoriesWithLanguages);
          })
          .catch((error) => {
            console.error('Error al obtener lenguajes:', error);
          });
      })
      .catch((error) => {
        console.error('Error al obtener repositorios:', error);
      });
  }, [user_name]);

  return (
    <>
      {data &&
        data.map((repo) => {
          return (
            <div key={repo.id} className="column is-one-fifth">
              <span className="box">
                <p className="title">{repo.name}</p>
                <li>
                  <p className="description">
                    {repo.description}
                    <Progress languages={repo.languages_url}></Progress>
                  </p>
                </li>
              </span>
            </div>
          );
        })}
    </>
  );
}

export default RepoCli;
