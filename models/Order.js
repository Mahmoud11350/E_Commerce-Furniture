const { Schema, model, Types } = require("mongoose");

const orderItems = Schema({
  name: {
    type: String,
    required: [true, "please provide ordered product name"],
  },
  price: {
    type: Number,
    required: [true, "please provide ordered product price"],
  },
  image: {
    type: String,
    required: [true, "please provide ordered product image"],
  },
  amount: {
    type: Number,
    required: [true, "please provide ordered product amount"],
  },
  product: {
    type: Types.ObjectId,
    required: [true, "please provide ordered product id"],
    ref: "Product",
  },
});

const orderScheam = new Schema(
  {
    tax: {
      type: Number,
      required: [true, "please provide tax"],
    },
    shippingFee: {
      type: Number,
      required: [true, "please provide shipping fee"],
    },
    subTotal: {
      type: Number,
      required: [true, "please provide subTotal "],
    },
    total: {
      type: Number,
      required: [true, "please provide total"],
    },
    orderItems: [orderItems],
    status: {
      type: String,
      enum: ["pending", "paid", "canceled", "delevired"],
      default: "pending",
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "please provide user "],
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderScheam);
module.exports = Order;
