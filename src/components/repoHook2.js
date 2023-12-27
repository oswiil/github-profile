import React, { useEffect, useState } from "react";
import github from "../utils/axios";
import GraphCli from "./graphHook";

function RepoCli2(user_name) {
  const [data, setData] = useState([]);
  const [focus, setRepoFocus] = useState("updated-portfolio");
  const [copied, setCopied] = useState({ ssh: false, clone: false });

  const handleCopyToClipboard = (text, type) => {
    navigator.clipboard
      .writeText(text)
      .then(() => setCopied((prev) => ({ ...prev, [type]: true })))
      .catch((error) => console.error("Error copying to clipboard", error));
  };

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

    // Llama a fetchData solo una vez mediante un array de dependencia vacío
    fetchData();
  }, [user_name]); // Agrega user_name.data al array de dependencia

  return (
    <>
      <div className="columns is-desktop p-6 is-relative">
        <div className="column is-full-mobile is-one-third-desktop">
          <div className="is-sticky pt-7">
            <GraphCli data={focus} />
            Actividad del repositorio
          </div>
        </div>
        <div className="column is-full-mobile is-two-thirds-desktop">
          <div className="columns is-multiline">
            {data.map((repo) => (
              <div
                key={repo.id}
                className="column is-half relative-position"
                onClick={() => setRepoFocus(repo.name)}
                role="menu"
              >
                <div className="box">
                  <p className="title">{repo.name}</p>

                  <ul>
                    <li>
                      <p className="description">{repo.description}</p>
                      <p>{repo.forks_count}</p>
                      <p>{repo.default_branch}</p>
                      <p>{repo.size / 1000 + "/mb"}</p>

                      {/* Dropdown para copiar al portapapeles */}
                      <div className="dropdown is-hoverable">
                        <div className="dropdown-trigger">
                          <button
                            className="button is-small box"
                            aria-haspopup="true"
                            aria-controls="dropdown-menu"
                          >
                            Copy URL
                          </button>
                        </div>
                        <div
                          className="dropdown-menu"
                          id="dropdown-menu"
                          role="menu"
                        >
                          <div className="dropdown-content">
                            {/* Botón para copiar ssh_url */}
                            <button
                              className={`button is-small ${
                                copied.ssh ? "is-success" : "is-white"
                              }`}
                              onClick={() =>
                                handleCopyToClipboard(repo.ssh_url, "ssh")
                              }
                            >
                              Copy SSH URL
                            </button>

                            {/* Botón para copiar clone_url */}
                            <button
                              className={`button is-small ${
                                copied.clone ? "is-success" : "is-white"
                              }`}
                              onClick={() =>
                                handleCopyToClipboard(repo.clone_url, "clone")
                              }
                            >
                              Copy https URL
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RepoCli2;
