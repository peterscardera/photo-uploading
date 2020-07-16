// 1. Require 'apollo-server'
const { ApolloServer } = require("apollo-server");

const typeDefs = `
# 1. Add Photo type definition
type Photo {
  id: ID!
  url: String!
  name: String!
  description: String
}


	type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  type Mutation {
    postPhoto(
      name: String!
      description: String
    ):Photo!
  }
`;
var photos = [];
// 1. A variable that we will increment for unique ids
var _id = 0;

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos,
  },
  Mutation: {
    //same name as schema and typeDef mutation
    postPhoto(parent, args) {
      var newPhoto = {
        //since it requires an Id
        id: _id++,
        ...args,
      };
      photos.push(newPhoto);
      return newPhoto;
    },
  },
};

// 2. Create a new instance of the server.
// 3. Send it an object with typeDefs (the schema) and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// 4. Call listen on the server to launch the web server
server
  .listen()
  .then(({ url }) => console.log(`GraphQL Service running on ${url}`));
