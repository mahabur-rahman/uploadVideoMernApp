const mongoose = require("mongoose");
const DB = process.env.MONGO_URI;

// connected to db
const connectedDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(DB);

    console.log(`mongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`mongoDB err : ${err}`.red.underline);
  }
};

module.exports = connectedDB;
