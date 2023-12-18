import "./App.css";
import "./styles/_base.scss";
import MainRepos from "./jsons/mainrepos.json";
import MainReposSecond from "./jsons/mainrepossecond.json";
import Progress from "./components//progress";
import { Navbar } from "./components/navBar";
import { useState } from "react";
import GraphCli from "./components/graphHook";
import RepoCli from "./components/repoHook";

function App() {
  const [focus, setRepoFocus] = useState("updated-portfolio");
  const [user_name, setUserName] = useState("oswiil");

  return (
    <div className="App" id="home">
      <Navbar className="navbar" />
      <header className="header">
        {" "}
        <div className="column has-text-centered p-6">
          <h1 className="title ">Aplicación de React usando Github API Rest</h1>
          <h2 className="description">
            La intención de este proyecto es recopilar datos de usuarios de
            Github mostrando el lenguaje principal, las métricas de actividad y
            facilitar la visibilidad de los repositorios que posee. Aún se está
            implementando, aqui se puede ver la actividad de este mismo proyecto
          </h2>{" "}
        </div>
      </header>
      <div>
        {" "}
        <div className="columns is-desktop p-6 is-relative">
          <div className="column is-full-mobile is-one-third-desktop">
            <div className="is-sticky pt-7">
              <GraphCli data={focus} />
            </div>
          </div>
          <div className="column is-two-thirds-desktop is-multiline h-2">
            {MainReposSecond.map((repo) => {
              return (
                <div key={repo.id}>
                  <span
                    className="box mt-5"
                    onClick={() => setRepoFocus(repo.name)}
                  >
                    <p className="title">{repo.name}</p>
                    <p className="description">{repo.description}</p>
                    <li>
                      <>
                        <Progress languages={repo.languages_url}></Progress>
                      </>
                    </li>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="columns is-desktop p-6 is-multiline" id="studies">
        <div className="column is-offset mt-6">
          <div className="center mt-6"></div>
          <h5 className="title has-text-centered" id="projects">
            Mostrando data del usuario {user_name}
          </h5>
          <div className="column languages mb-4">
            {" "}
            <label for="usearch" className="title"></label>
            <input
              className="box"
              type="search"
              id="gsearch"
              name="usearch"
              onChange={(e) => setUserName(e.target.value)}
            ></input>
          </div>

          <div>
            <div className="columns is-multiline">
              <RepoCli data={user_name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
