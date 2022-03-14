const { StatusCodes } = require("http-status-codes");
const checkPermission = require("../utils/checkPermision");
const Product = require("../models/Product");
const Review = require("../models/Review");
const CustomError = require("../errors/custom-error");

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  req.body.user = req.user.userId;
  const product = await Product.findById(productId);
  if (!product) {
    throw new CustomError(`no product with id ${productId}`, StatusCodes.OK);
  }
  const userId = req.user.userId;

  const reviewExist = await Review.findOne({
    product: productId,
    user: userId,
  });
  if (reviewExist) {
    throw new CustomError(
      "You Already Reviewed before please only update your last review",
      StatusCodes.BAD_REQUEST
    );
  }
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
};
const getAllReviews = async (req, res) => {
  const reviews = await Review.find({}).populate({
    path: "product",
    select: "name price company",
  });
  res.status(StatusCodes.OK).json({ reviews });
};
const getReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    throw new CustomError(`no review with id ${req.params.id}`, StatusCodes.OK);
  }
  res.status(StatusCodes.CREATED).json({ review });
};
const updateReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    throw new CustomError(`no review with id ${req.params.id}`, StatusCodes.OK);
  }
  checkPermission(req.user, review.user);
  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.CREATED).json({ updatedReview });
};
const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    throw new CustomError(`no review with id ${req.params.id}`, StatusCodes.OK);
  }
  checkPermission(req.user, review.user);
  await review.remove();

  res.status(StatusCodes.CREATED).json({ msg: "Review deleted successfully" });
};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
};
