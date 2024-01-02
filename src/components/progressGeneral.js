import React from "react";

function Progress({ languages, owner }) {
  const Colors = {
    JavaScript: "#f1e05a",
    CSS: "#563d7c",
    TypeScript: "#3178c6",
    HTML: "#e34c26",
    Less: "#1d365d",
    Batchfile: "#C1F12E",
    Dockerfile: "#384d54",
    Shell: "#89e051",
    Solidity: "#AA6746",
  };

  // Create a set of languages to avoid duplicates
  const uniqueLanguages = new Set();
  Object.keys(languages).forEach((repo) => {
    Object.keys(languages[repo]).forEach((lang) => {
      uniqueLanguages.add(lang);
    });
  });

  // Calculate total lines and find the main language
  let totalLines = 0;
  let mainLanguage = "";
  let mainLanguagePercentage = 0;

  Array.from(uniqueLanguages).forEach((language) => {
    const totalLinesForLanguage = Object.values(languages).reduce(
      (acc, repo) => acc + (repo[language] || 0),
      0
    );

    totalLines += totalLinesForLanguage;

    const percent = (totalLinesForLanguage / totalLines) * 100;
    if (percent > mainLanguagePercentage) {
      mainLanguage = language;
      mainLanguagePercentage = percent;
    }
  });

  const progressItems = Array.from(uniqueLanguages).map((language) => {
    const totalLinesForLanguage = Object.values(languages).reduce(
      (acc, repo) => acc + (repo[language] || 0),
      0
    );

    if (Colors[language]) {
      const color = Colors[language];
      const percent = (totalLinesForLanguage / totalLines) * 100;
      return (
        <span
          key={language}
          style={{
            backgroundColor: color,
            width: `${parseFloat(percent).toFixed(2)}%`,
          }}
          title={`${language}: ${parseFloat(percent).toFixed(2)}%`}
          aria-label={`${language} ${parseFloat(percent).toFixed(2)}%`}
          data-view-component="true"
          className="Progress-item color-bg-success-emphasis"
        ></span>
      );
    } else {
      return null; // Handle languages not found in Colors (you can also apply a default color)
    }
  });

  return (
    <>
      <div className="container has-text-centered">
        <div className="columns is-centered mt-1">
          <div className="column is-one-third">
            <h1 className="description">Usuario {owner}</h1>
          </div>
          <div className="column is-two-thirds">
            <p className="description">Lenguaje más usado</p>
            <p className="title">{mainLanguage}</p>
            <div className="languages">
              {Array.from(uniqueLanguages).map((value) => (
                <div key={value}>
                  <svg
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10" cy="10" r="10" fill={Colors[value]} />
                  </svg>
                  {value}
                </div>
              ))}
              <span className="Progress" data-view-component="true">
                {progressItems}
              </span>
            </div>
          </div>

          {/* Segunda columna */}
        </div>
      </div>
    </>
  );
}

export default Progress;
