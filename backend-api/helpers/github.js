const fetch = require("isomorphic-fetch");

// ask githib for token by providing the credentials(credentials consist of three things: the client_id, client_secret, and code) the Code github gves it to the client
const requestGithubToken = (credentials) =>
  fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((res) => res.json());

// once we get the GitHub token, we need to access information from the current user’s account
const requestGithubUserAccount = (token) =>
  fetch(`https://api.github.com/user?access_token=${token}`).then((res) =>
    res.json()
  );

//async function that  trigger both above in order to
const authorizeWithGithub = async (credentials) => {
  const { access_token } = await requestGithubToken(credentials);
  const githubUser = await requestGithubUserAccount(access_token);
  return { ...githubUser, access_token };
};

module.exports = { authorizeWithGithub };
