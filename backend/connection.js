require("dotenv").config();
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");

async function connect(callback) {
  const MONGO_URI = process.env.MONGO_URI;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await callback(mongoose);
  } catch (e) {
    console.error(e);
    throw new Error("Error when connecting to the database");
  }
}

module.exports = connect;
