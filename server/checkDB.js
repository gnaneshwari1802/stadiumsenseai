const mongoose = require("mongoose");
require("dotenv").config();

async function check() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected Database:", mongoose.connection.db.databaseName);
  process.exit();
}

check();