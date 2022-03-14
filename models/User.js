const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
const CustomError = require("../errors/custom-error");
const { hash, compare } = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");

const userSchema = new Schema({
  name: {
    type: String,
    minlength: [3, "minimum allowed length (3)"],
    maxlength: 50,
    required: [true, "please provide a name"],
    trim: true,
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: [true, "please provide a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please provide a email adress"],
    unique: true,
    trim: true,
    validate(value) {
      if (!isEmail(value)) throw new CustomError("please provide email adress");
    },
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 50,
    required: [true, "please provide a password"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});
userSchema.statics.findByCredintial = async function ({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("wrong email adress", StatusCodes.NOT_FOUND);
  }
  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw new CustomError("wrong password", StatusCodes.NOT_FOUND);
  }
  return user;
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 8);
  }
});
const User = model("User", userSchema);
module.exports = User;
