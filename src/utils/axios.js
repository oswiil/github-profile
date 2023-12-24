import axios from "axios";

const github = axios.create({ baseURL: "https://api.github.com" });

let accessToken = null;

github.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${accessToken}`;
  config.headers["Content-Type"] = "application/json";
  config.headers["X-GitHub-Api-Version"] = "2022-11-28";
  config.headers["Accept"] = "application/vnd.github+json";
  return config;
});

github.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get("code");
      console.log("log ~ authorizationCode:", authorizationCode);

      try {
        if (authorizationCode) {
          console.log("entramoas aqu");
          await exchangeCodeForAccessToken(authorizationCode);
        } else {
          redirectToGitHub();
        }
      } catch (authError) {
        console.error("Authorization Error:", authError.message);
        // Handle the error, e.g., show a message to the user
      }
    }
    return Promise.reject(error);
  }
);

const redirectToGitHub = () => {
  const clientId = "Iv1.974fb44a9bcc8a75"; // Replace with your GitHub App's client ID
  const redirectUri = "https://www.osanchez.net"; // Replace with your callback URL
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;

  // Redirect the user to GitHub for authorization
  window.location.href = authUrl;
};

const exchangeCodeForAccessToken = async (code) => {
  const clientId = "Iv1.974fb44a9bcc8a75"; // Replace with your GitHub App's client ID
  const clientSecret = "70545b062f130d397b64bb3e3d0699b643312f69"; // Replace with your GitHub App's client secret
  const redirectUri = "https://www.osanchez.net"; // Replace with your callback URL
  console.log("estamos post");
  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectUri,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("BITCH", accessToken);
    accessToken = response.data.access_token;

    // Log the obtained access token
    console.log("Obtained Access Token:", accessToken);

    // Use the obtained access token for API requests
    // For example, you can fetch user information
    // const userResponse = await github.get("/user");
    // console.log("User Information:", userResponse.data);
  } catch (error) {
    console.error(
      "Error exchanging code for access token:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default github;
