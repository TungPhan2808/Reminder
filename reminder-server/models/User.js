const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
const Users = mongoose.model("User", User);

module.exports = Users;
