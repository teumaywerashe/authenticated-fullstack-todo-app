const { StatusCodes } = require("http-status-codes");
const User = require("../module/user");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const { UnauthenticatedError } = require('../../final/errors')

const signup = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ name: user.name, token });
  } catch (error) {
    return res.status(401).json({ msg: "user alreaded signedin" });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ msg: "Invalid email or password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ msg: "Invalid email or password" });
  }
  const token = user.createJWT();
  // console.log(token)
  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    return res.status(401).json({ msg: "Invalid email or password" });
  }
  res.status(StatusCodes.OK).json({ name: user.name, token });
};

module.exports = {
  login,
  signup,
};
