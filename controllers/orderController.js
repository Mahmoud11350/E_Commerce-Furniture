const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/custom-error");
const Product = require("../models/Product");
const Order = require("../models/Order");
const checkPermission = require("../utils/checkPermision");

const createOrder = async (req, res) => {
  let { tax, shippingFee, subTotal, total, orderItems } = req.body;
  const user = req.user.userId;

  if (!orderItems || orderItems.length < 0) {
    throw new CustomError("please fill your cart", StatusCodes.BAD_REQUEST);
  }
  let cartItems = [];
  let subtotal = 0;
  for (const item of orderItems) {
    const product = await Product.findById(item.product);

    if (!product) {
      throw new CustomError(
        "please provide valid product",
        StatusCodes.NOT_FOUND
      );
    }

    const { name, price, _id: productId, image } = product;
    cartItems = [
      ...cartItems,
      { name, price, product: productId, image, amount: item.amount },
    ];
    subtotal += product.price * item.amount;
  }

  subTotal = subtotal;
  total = subtotal + tax + shippingFee;

  const order = await Order.create({
    total,
    subTotal,
    tax,
    shippingFee,
    orderItems: cartItems,
    user,
  });
  res.status(StatusCodes.CREATED).json({ order });
};

const getAllorders = async (req, res) => {
  const orders = await Order.find({});
  res.status(StatusCodes.CREATED).json({ orders, numOfOrders: orders.length });
};

const getSingleOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    throw new CustomError("no order with given id ", StatusCodes.NOT_FOUND);
  }
  checkPermission(req.user, order.user);
  res.status(StatusCodes.CREATED).json({ order });
};

const getCurrentUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId });

  if (orders.length > 0) {
    checkPermission(req.user, orders[0]?.user);
  }

  res.status(StatusCodes.CREATED).json({ orders, numOfOrders: orders.length });
};

module.exports = {
  createOrder,
  getAllorders,
  getSingleOrder,
  getCurrentUserOrders,
};
