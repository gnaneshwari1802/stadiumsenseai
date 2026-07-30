const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI);

async function createAdmin() {

    const hash = await bcrypt.hash("admin123",10);

    await User.create({

        username:"admin",

        password:hash

    });

    console.log("Admin Created");

    process.exit();

}

createAdmin();