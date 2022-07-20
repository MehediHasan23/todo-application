const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      reqired: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      reqired: true,
      trim: true,
    },
    password: {
      type: String,
      reqired: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
