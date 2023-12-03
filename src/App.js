import "./App.css";
import "./styles/_base.scss";
import AnimationCli from "./components/animationcli";
import dino from "./components/dino.json";
import Repos from "./components/repos.json";
import education from "./components/education.json";
import experience from "./components/experience.json";
import projects from "./components/Projects.json";
import CardComponent from "./components/card";
import Progress from "./components//progress";
import AnimationScroll from "./components/animscroll";
import { Navbar } from "./components/navBar";
function App() {
  const repos = Repos;
  return (
    <div className="App" id="home">
      <Navbar />
      <header className="App-header">
        <div className="columns is-desktop p-6 is-multiline">
          <div className="column has-text-centered">
            <AnimationCli data={dino} />
            <h5 className="title has-text-centered">Desarrollador Web</h5>
            <p>
              Aplicación Portfolio con {"NextJs"}Aplicación Portfolio
              conAplicación Portfolio conAplicación Portfolio conAplicación
              Portfolio conAplicación Portfolio conAplicación Portfolio
              conAplicación Portfolio conAplicación Portfolio conAplicación
              Portfolio conAplicación Portfolio conAplicación Portfolio
              conAplicación Portfolio conAplicación Portfolio conAplicación
              Portfolio conAplicación Portfolio conAplicación Portfolio
              conAplicación Portfolio conAplicación Portfolio conAplicación
              Portfolio con
            </p>
          </div>
        </div>
      </header>

      <div className="columns is-desktop p-6 is-multiline" id="studies">
        <div className="column is-half">
          <AnimationScroll data={education} />
          <h5 className="title has-text-centered">Education</h5>
          <CardComponent
            className="textarea"
            title="CFGS-Digital Artist"
            subtitle="Audiovisuales, Animacion 2D 3D"
            text=""
            imageUrl="/assets/enti.png"
          />
          <CardComponent
            title="CFGS-DAM"
            subtitle="Desarrollo de Aplicaciones Multiplataforma"
            text=""
            imageUrl="/assets/linkialogo.jpg"
          />
        </div>
        <div className="column is-half">
          <CardComponent
            title="Desarrollador web"
            subtitle="Consultor analista BaseTIS S.L."
            text=""
            imageUrl="/assets/basetis.png"
          />

          <CardComponent
            title="Desarrollador .NET"
            subtitle="Programador Junior Indra S.A."
            text=""
            imageUrl="/assets/indra.png"
          />
          <AnimationCli data={experience} />
          <h5 className="title has-text-centered">Experience</h5>
        </div>
        <div className="column is-offset mt-6">
          <div className="center mt-6">
            <AnimationScroll data={projects} />
          </div>
          <h5 className="title has-text-centered" id="projects">
            Projects
          </h5>
          <div>
            <div className="columns is-multiline">
              {repos.map((repo) => {
                // const languages = await github.get(repo.languages_url);
                return (
                  <div key={repo.id} className="column is-one-quarter">
                    <span className="box">
                      <p className="title">{repo.name}</p>
                      <li>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {repo.description}
                          <Progress languages={repo.languages_url}></Progress>
                          {/* {languages} */}
                        </a>
                      </li>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* <div className="columns is-desktop">
          <div className="column">
            <div className="profile">
              <img
                src={user.avatar_url || null}
                alt={`${user.login}'s avatar`}
              />
            </div>
          </div>
          <div className="column">
            <h2>{user.login}</h2>
            <p>Followers: {user.followers}</p>
            <p>Repositories: {user.public_repos}</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default App;
