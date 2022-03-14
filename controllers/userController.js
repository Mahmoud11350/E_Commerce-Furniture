const { compare } = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/custom-error");
const User = require("../models/User");
const checkPermission = require("../utils/checkPermision");

const getAllusers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users });
};
const getSingleUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    throw new CustomError(
      `can't find user with id ${req.params.id}`,
      StatusCodes.NOT_FOUND
    );
  checkPermission(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) {
    throw new CustomError(`invalid update`, StatusCodes.BAD_REQUEST);
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { email, name },
    {
      runValidators: true,
      new: true,
    }
  );
  if (!user) {
    throw new CustomError(
      `can't find user with id ${req.params.id}`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).json({ user });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError("please provide password", StatusCodes.BAD_REQUEST);
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new CustomError("Invalid Update", StatusCodes.NOT_FOUND);
  }

  const isMatch = await compare(oldPassword, user.password);

  if (!isMatch) {
    throw new CustomError("Wrong password", StatusCodes.BAD_REQUEST);
  }

  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ user });
};

module.exports = {
  getAllusers,
  getSingleUser,
  updateUser,
  updateUserPassword,
};
