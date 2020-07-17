// 1. Require 'apollo-server'
const { ApolloServer } = require("apollo-server");

const typeDefs = `
# 1. Add Photo type definition
type Photo {
  id: ID!
  url: String!
  name: String!
  description: String
  category: PhotoCategory!
}

	type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  type Mutation {
    postPhoto(input: PostPhotoInput!):Photo!
  }

  enum PhotoCategory {
    SELFIE
    PORTRAIT
    ACTION
    LANDSCAPE
    GRAPHIC
  }

  input PostPhotoInput {
    name: String!
    category: PhotoCategory=PORTRAIT
    description: String
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
      console.log(parent);
      var newPhoto = {
        //since it requires an Id
        id: _id++,
        //details for the photo, the name, description, and category are now nested within the input field
        ...args.input,
      };
      photos.push(newPhoto);
      return newPhoto;
    },
  },
  //In this case, the parent represents the current Photo object that is being resolved
  Photo: {
    //the parent represents the current Photo object that is being resolved
    // {
    //   id: 0,
    //   name: 'sample photo A',
    //   category: 'PORTRAIT',
    //   description: 'A sample photo for our dataset'
    // }
    
    url: (parent) => `http://yoursite.com/img/${parent.id}.jpg`,
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
