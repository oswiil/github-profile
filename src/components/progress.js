'use client';
import React from 'react';

function Progress(data) {
  console.log('🚀 ~ file: progress.js:5 ~ Progress ~ data:', data);
  const z = [];
  const Colors = {
    JavaScript: '#f1e05a',
    CSS: '#563d7c',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    Less: '#1d365d',
    Batchfile: '#C1F12E',
    Dockerfile: '#384d54',
    Shell: '#89e051',
    Solidity: '#AA6746',
  };

  Object.keys(data.languages).map((lang) => z.push(lang));

  const totalLines = Object.values(data.languages).reduce(
    (acc, lines) => acc + lines,
    0
  );
  const progressItems = Object.entries(data.languages).map(
    ([language, value]) => {
      // Check if the language key exists in the Colors object
      if (Colors[language]) {
        const color = Colors[language];
        // console.log(color, language, value);
        const percent = (value / totalLines) * 100;
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
    }
  );

  return (
    <>
      {(!z || !progressItems) && <p>Loading</p>}
      <p className="columns is-multiline languages has-text-centered">
        {z &&
          Object.values(z).map((value) => (
            <div key={value}>
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill={Colors[value]} />
              </svg>
              {value}
            </div>
          ))}
      </p>
      <span className="Progress" data-view-component="true">
        {progressItems}
      </span>
    </>
  );
}

export default Progress;
