const { Schema, model, Types } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "please provide product name "],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    price: {
      type: Number,
      required: [true, "please provide product price "],
      default: 0,
    },
    image: {
      type: String,
      required: [true, "please provide product image  "],
      trim: true,
      default:
        "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image-620x600.jpg",
    },
    colors: {
      type: [String],
      required: [true, "please provide product color "],
      default: "#222",
    },
    company: {
      type: String,
      required: [true, "please provide company "],
      trim: true,
      enum: {
        values: ["liddy", "ikea", "marcos"],
        message: "please provide valid company ",
      },
    },
    category: {
      type: String,
      required: [true, "please provide product category "],
      trim: true,
      enum: {
        values: ["office", "kitchen", "bedroom", "living room", "dining"],
        message: "please provide valid category ",
      },
    },
    description: {
      type: String,
      required: [true, "please provide product description "],
      trim: true,
      minlength: 20,
      maxlength: 1000,
    },
    shipping: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    averageRating: {
      type: Number,
      required: true,
      default: 0,
    },
    numOfReview: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      ref: "User",
      type: Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});
productSchema.pre("remove", async function () {
  await this.model("Review").deleteMany({ product: this._id });
});

const Product = model("Product", productSchema);

module.exports = Product;
