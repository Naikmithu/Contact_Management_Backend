// contains all the logic of requests

//desc register a use
//route post /api/user/register
//access public
const asyncHandler = require("express-async-handler"); //handls expeceptions
const config = require("config");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are Mandatory");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User Exists");
  }

  //We cannot store raw password into the databse so we need to hash we use :
  //bcrypt library
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User Created Successfully ${user}`);

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data was not valid");
  }

  res.json({ message: "Register User" });
});

const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are Mandatory !");
  }

  const userFind = await User.findOne({ email });
  //compare Password
  if (userFind && (await bcrypt.compare(password, userFind.password))) {
    // password passed through body compare with databse stored password
    const acessToken = jwt.sign(
      {
        user: {
          username: userFind.username,
          email: userFind.email,
          id: userFind.id,
        },
      },
      config.get("ACCESS_TOKEN"),
      { expiresIn: "15m" }
    );
    res.status(200).json({ acessToken });
  } else {
    res.status(401);
    throw new Error("Passoword is not Valid");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, LoginUser, currentUser };
