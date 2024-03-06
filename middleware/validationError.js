const asyncHandler = require("express-async-handler");
const config = require("config");

const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, config.get("ACCESS_TOKEN"), (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is Not Authorized");
      }
      req.user = decoded.user;
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error("User is Not Authorized ot Token is missing");
    }
  }
});

module.exports = validateToken;
