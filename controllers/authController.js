const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const cookiesResponse = require("../utils/jwt");
const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount === true ? "admin" : "user";
  const user = await User.create({ ...req.body, role });
  const userToken = { name: user.name, userId: user._id, role: user.role };
  const token = cookiesResponse({ res, userToken });
  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByCredintial({ email, password });
  let token = null;
  if (user) {
    const userToken = { name: user.name, userId: user._id, role: user.role };
    token = cookiesResponse({ res, userToken });
  }
  res.status(StatusCodes.OK).json({ user, token });
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({
    msg: "logged out successfully",
  });
};
module.exports = {
  register,
  login,
  logout,
};
