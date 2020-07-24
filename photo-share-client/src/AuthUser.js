import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import { ROOT_QUERY } from "./App";

const GITHUB_AUTH_MUTATION = gql`
  mutation githubAuth($code: String!) {
    githubAuth(code: $code) {
      token
    }
  }
`;

const AuthUser = () => {
  const [state, setState] = useState({ signingIn: false });
  const [githubAuth] = useMutation(GITHUB_AUTH_MUTATION);
 
  // let authorizationComplete = (cache, { data }) => {
    
  // };

  useEffect(() => {
    console.log("in useeffect", state);
    if (window.location.search.match(/code=/)) {
      setState({ signingIn: true });
      const code = window.location.search.replace("?code=", "");
      
      githubAuth({
        variables: { code: code },
        refetchQueries: [{ query: ROOT_QUERY }],
      
      });
    }
  }, []);

  const requestCode = () => {
    const clientID = process.env.REACT_APP_GIT_CLIENT_ID;
    window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`;
    console.log(window.location, "HEERE");
  };
  return (
    <>
      <button onClick={requestCode} disabled={state.signingIn}>
        Sign In with GitHub
      </button>
    </>
  );
};
export default AuthUser;
