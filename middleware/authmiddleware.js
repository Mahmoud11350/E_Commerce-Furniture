const { StatusCodes } = require("http-status-codes");
const { verify } = require("jsonwebtoken");
const CustomError = require("../errors/custom-error");
const authMiddleware = (req, res, next) => {
  const token = req.signedCookies.token;
  try {
    const user = verify(token, process.env.TOKEN_SECRET);
    if (!user) {
      throw new CustomError("Un authenticated", StatusCodes.UNAUTHORIZED);
    }
    req.user = user;
  } catch (error) {
    throw new CustomError("Un authenticated", StatusCodes.UNAUTHORIZED);
  }

  next();
};
const adminauthrize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError(
        "not allowed to access this route",
        StatusCodes.FORBIDDEN
      );
    }
    next();
  };
module.exports = {
  authMiddleware,
  adminauthrize,
};
