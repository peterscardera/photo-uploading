const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const expressPlayground = require("graphql-playground-middleware-express").default;
const { readFileSync } = require("fs");

const resolvers = require("./resolvers");
const initDb = require("./DB_Connection/connection");

require("dotenv").config();
const typeDefs = readFileSync("./backend/typeDefs.graphql", "UTF-8");


const app = express();

initDb().then((resp) => {
  if (resp) {
    const server = new ApolloServer({ typeDefs, resolvers });

    //call `applyMiddleware()` to allow middleware mounted on the same path
    server.applyMiddleware({ app });
    app.get("/playground", expressPlayground({ endpoint: "/graphql" }));
    app.get("/", (req, res) => res.end("Welcome to the PhotoShare API"));

    app.listen({ port: 4000 }, () =>
      console.log(
        `GraphQL Server running @ http://localhost:4000${server.graphqlPath}`
      )
    );
  } else {
    console.log("error connecting to MongoDB before opening port");
  }
});
