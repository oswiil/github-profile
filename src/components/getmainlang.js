import React, { useEffect, useState } from "react";
import axios from "axios";
import Progress from "./progressGeneral";
import github from "../utils/axios";
import debounce from "lodash/debounce";

function MainLang(user_name) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await github.get(`/users/${user_name.data}/repos`);
        const repositories = response.data;

        const languagePromises = repositories.map((repo) =>
          axios.get(repo.languages_url)
        );

        const languageResponses = await Promise.all(languagePromises);

        // Obtener la información de lenguajes de todos los repositorios
        const allLanguages = languageResponses.reduce((acc, res, index) => {
          acc[repositories[index].name] = res.data;
          return acc;
        }, {});

        setData(allLanguages);
      } catch (error) {
        console.error("Error al obtener repositorios y lenguajes:", error);
      }
    };

    const debounceFetchData = debounce(fetchData, 1000);

    debounceFetchData();

    // Limpiar el debounce en la limpieza del efecto
    return () => {
      debounceFetchData.cancel();
    };
  }, [user_name]);

  return (
    <>
      {data && (
        <div>
          {/* <span className="box"> */}
          <p className="description mt-5">
            Principales lenguajes del usuario <strong>{user_name.data}</strong>
          </p>
          <li>
            <p className="description has-text-centered">
              <Progress languages={data}></Progress>
            </p>
          </li>
          {/* </span> */}
        </div>
      )}
    </>
  );
}

export default MainLang;
