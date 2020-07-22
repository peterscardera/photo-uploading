const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const expressPlayground = require("graphql-playground-middleware-express")
  .default;
const { readFileSync } = require("fs");

const resolvers = require("./resolvers");
const initDb = require("./DB_Connection/connection");

require("dotenv").config();
const typeDefs = readFileSync("./typeDefs.graphql", "UTF-8");

const app = express();

//!connect to the database first
initDb().then((resp) => {
  if (resp) {
    //!adding the database to a context object and giving it name db
    const db = resp.db("photoUploadingGQL");
    //!added the database abd current user in the context
    // const context = { db };
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: async ({ req }) => {
        //with every request the context gets set. Headers need the token
        const githubToken = req.headers.authorization;
        const currentUser = await db
          .collection("users")
          .findOne({ githubToken });
        return { db, currentUser };
      },
    });

    //!call `applyMiddleware()` to allow middleware mounted on the same path
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
