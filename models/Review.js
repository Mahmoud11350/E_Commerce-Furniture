const { Schema, model, Types } = require("mongoose");

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      max: 5,
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    comment: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 500,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);
// reviewSchema.index({ user: 1, product: 1 }, { unique: true });
reviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        numOfReview: { $sum: 1 },
      },
    },
  ]);
  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: result[0]?.averageRating,
        numOfReview: result[0]?.numOfReview,
      },
      { new: true, runValidators: true }
    );
  } catch (error) {
    console.log(error);
  }
};

reviewSchema.post("save", async function () {
  this.constructor.calculateAverageRating(this.product);
});

reviewSchema.post("remove", async function () {
  this.constructor.calculateAverageRating(this.product);
});
const Product = model("Review", reviewSchema);

module.exports = Product;
