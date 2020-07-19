const { MongoClient } = require("mongodb");
require("dotenv").config();

let _db;

//establish connection
const initDb = async () => {
  const client = new MongoClient(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    _db = await client.connect();
    console.log("connected to db");
  } catch (error) {
    console.log(error, "error connnecting");
    process.exit(1);
  }
  //return the connection
  return _db;
};

module.exports = initDb;
