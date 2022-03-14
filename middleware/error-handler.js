const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/custom-error");
const errorHandler = (err, req, res, next) => {
  let customError = {
    customMsg: err.message || "something went wrong please try again later",
    statusCode: err.statusCode || 500,
  };
  if (err.name === "ValidationError") {
    const errorKeys = Object.keys(err.errors);
    const message = errorKeys
      .map((error) => {
        return err.errors[error].message;
      })
      .join(" & ");
    customError.customMsg = message;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err && err.code && err.code === 11000) {
    customError.customMsg = "email already exist";
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "CastError") {
    customError.customMsg = `the provided id doesn't match our requirement ${err.value}`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  return res
    .status(customError.statusCode)
    .json({ msg: customError.customMsg });
  // return res.send(err);
};

module.exports = errorHandler;
