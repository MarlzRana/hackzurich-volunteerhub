require("dotenv").config();
const { MongoClient } = require("mongodb");

async function connect(callback) {
  const MONGO_URI = process.env.MONGO_URI;
  const client = new MongoClient(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    await callback(client);
  } catch (e) {
    console.error(e);
    throw new Error("Error when connecting to the database");
  }
}

module.exports = connect;
