import axios from 'axios';

const github = axios.create({ baseURL: 'https://api.github.com' });

// let accessToken = null;

github.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer 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`;
  config.headers['Content-Type'] = 'application/json';
  config.headers['X-GitHub-Api-Version'] = '2022-11-28';
  config.headers['Accept'] = 'application/vnd.github+json';
  return config;
});

github.interceptors.response.use(async (config) => {
  console.log(
    '🚀 ~ file: axios.js:18 ~ github.interceptors.response.use ~ config:',
    config
  );

  return config;
});

// let renewtoken = async () => {
//   if (!accessToken) {
//     try {
//       const response = await github.get('https://api.github.com/octocat', {
//         headers: {
//           Authorization: `Bearer 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`,
//         },
//       });
//       accessToken = response.data.access_token;
//     } catch (error) {
//       console.error(
//         'Error obtaining access token:',
//         error.response ? error.response.data : error.message
//       );
//       throw error;
//     }
//   }
// };
export default github;
