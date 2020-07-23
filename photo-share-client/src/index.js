import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from "./App";

const client = new ApolloClient({ uri: "http://localhost:4000/graphql" });

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);



//Apollo Client is used to handle all network requests to our GraphQL service. Additionally,
// by default, it automatically caches the results locally and defers to the local cache to improve our applications performance.
//the client caches locally and we could view it by looking
// console.log('cache', client.extract())
// client.query({query})
//     .then(() => console.log('cache', client.extract()))
//     .catch(console.error)