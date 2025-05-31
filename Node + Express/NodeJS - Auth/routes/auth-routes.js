const express = require("express");
const { loginUser, registerUser } = require("../controllers/auth-controllers");
const router = express.Router();

//all routes are related to authentication & authorization

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
