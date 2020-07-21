const fetch = require("isomorphic-fetch");

const requestGithubToken = (credentials) => {
  fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(JSON.stringify(error));
    });
};

// once we get the GitHub token, we need to access information from the current user’s account
const requestGithubUserAccount = (token) =>
  fetch(`https://api.github.com/user?access_token=${token}`)
    .then(toJSON)
    .catch(throwError);

//async function that  trigger both above in order to

const authorizeWithGithub = async credentials => {
  const { access_token } = await requestGithubToken(credentials)
  const githubUser = await requestGithubUserAccount(access_token)
  //front end need the access token if future requests needed. The client will save the token locally and send it back to us with each request.
  return {...githubUser, access_token}
}