const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/custom-error");

const checkPermission = (signedUser, requstedUser) => {
  if (signedUser.role === "admin") return;
  if (signedUser.userId === requstedUser.toString()) return;
  throw new CustomError("the process can't be done", StatusCodes.FORBIDDEN);
};

module.exports = checkPermission;
