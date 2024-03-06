const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    
    username: {
      type: String,
      required: [true, "Please enter your Name"],
    },

    email: {
      type: String,
      required: [true, "Please add your contact Email Address"],
      unique: [true, "Email adress already taken"],
    },

    password: {
      type: String,
      required: [true, "Please enter the User Passowrd"],
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
