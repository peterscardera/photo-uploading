const { authorizeWithGithub } = require("../helpers/github.js");

module.exports = {
  //! obtain data from GH.
  async githubAuth(parent, { code }, { db }) {
    let {
      message,
      access_token,
      avatar_url,
      login,
      name,
    } = await authorizeWithGithub({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    });
    // console.log(message, access_token, 'HERE')

    //! if theres a message smt went wrong***
    if (message) {
      throw new Error(message);
    }
    //  Package the results into a single object
    let latestUserInfo = {
      name,
      githubLogin: login,
      githubToken: access_token,
      avatar: avatar_url,
    };
    //!  Add or update the collection with the new information
    const {
      ops: [user],
    } = await db
      .collection("users")
      .replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true });
    //! Return user data and their token
    return { user, token: access_token };
  },

  async postPhoto(parent, args, { db, currentUser }) {
    if (!currentUser) {
      throw new Error("only authorized user can pst a photo");
    }
    const newPhoto = {
      ...args.input,
      userID: currentUser.githubLogin,
      created: new Date(),
    };

    //!Insert the new photo and capture the id that the database created
    const { insertedIds } = await db.collection("photos").insert(newPhoto);
    // console.log('HERE0', insertedIds)
    newPhoto.id = insertedIds[0];

    return newPhoto;
  },
};
