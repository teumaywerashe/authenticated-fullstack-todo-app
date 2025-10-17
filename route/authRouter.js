const express = require("express");
const router = express.Router();

const { signup, login } = require("../connection/auth");

router.route("/auth/register").post(signup);
router.route("/auth/login").post(login);
module.exports = router;