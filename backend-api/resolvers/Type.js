const { GraphQLScalarType } = require("graphql");
const { ObjectID } = require("mongodb");

module.exports = {
  Photo: {
    id: (parent) => parent.id || parent._id,
    url: (parent) => `/img/photos/${parent._id}.jpg`,
    postedBy: (parent, args, { db }) =>
      db.collection("users").findOne({ githubLogin: parent.userID }),
  },

  User: {
    postedPhotos: (parent, args, { db }) =>
      db.collection("photos").find({ userID: parent.githubLogin }).toArray(),

    inPhotos: async (parent, args, { db }) => {
      const tags = await db.collection("tags").find().toArray();

      const photoIDs = tags
        .filter((t) => t.githubLogin === parent.githubLogin)
        .map((t) => ObjectID(t.photoID));

      return db
        .collection("photos")
        .find({ _id: { $in: photoIDs } })
        .toArray();
    },
  },

  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid date time value.",
    parseValue: (value) => new Date(value),
    serialize: (value) => new Date(value).toISOString(),
    parseLiteral: (ast) => ast.value,
  }),
};
