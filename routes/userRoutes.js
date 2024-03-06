const express = require("express");
const { route } = require("./contactRoutes");
const {
    registerUser,
    LoginUser,
    currentUser,
} = require("../Controllers/userController");
const validateToken=require("../middleware/validationError")

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", LoginUser);

router.get("/current", validateToken,currentUser);

module.exports = router;
