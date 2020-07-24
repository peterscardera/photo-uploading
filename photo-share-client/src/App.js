import React from "react";
import { gql } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

import Users from "./Users";
import AuthUser from "./AuthUser";

export const ROOT_QUERY = gql`
  query allUsers {
    totalUsers
    allUsers {
      ...userInfo
    }
    me {
      ...userInfo
    }
  }

  fragment userInfo on User {
    githubLogin
    name
    avatar
  }
`;

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Users />
        <AuthUser />
      </div>
    </BrowserRouter>
  );
};

export default App;
