import axios from 'axios';

const github = axios.create({ baseURL: 'https://api.github.com' });

github.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer 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`;
  config.headers['Content-Type'] = 'application/json';
  config.headers['X-GitHub-Api-Version'] = '2022-11-28';
  config.headers['Accept '] = 'application/vnd.github+json';
  return config;
});

export default github;