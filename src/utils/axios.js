import axios from 'axios';

const github = axios.create({ baseURL: 'https://api.github.com' });

let accessToken = null;

github.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${
    accessToken || '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'
  }`;
  config.headers['Content-Type'] = 'application/json';
  config.headers['X-GitHub-Api-Version'] = '2022-11-28';
  config.headers['Accept'] = 'application/vnd.github+json';
  return config;
});

github.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      renewtoken();
    }
    return Promise.reject(error);
  }
);

let renewtoken = async () => {
  try {
    const response = await github.get('https://api.github.com/octocat', {
      headers: {
        Authorization: `Bearer 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`,
      },
    });
    accessToken = response.data.access_token;
  } catch (error) {
    console.error(
      'Error obtaining access token:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default github;
