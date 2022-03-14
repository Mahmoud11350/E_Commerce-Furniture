const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/custom-error");
const Product = require("../models/Product");
const productsJson = require("../product.json");
// const productsJson = require("../mockData/products.json");
const cloud = require("cloudinary").v2;
const { unlinkSync } = require("fs");
const getAllProducts = async (req, res) => {
  const products = await Product.find({}).populate("reviews");
  res.status(StatusCodes.OK).json({ products });
};
const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new CustomError(
      `No Product with Id ${req.params.id}`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).json({ product });
};

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  // const product = await Product.create(productsJson);
  res.status(StatusCodes.CREATED).json({ product });
};
const updateProduct = async (req, res) => {
  const validupdaite = [
    "name",
    "price",
    "description",
    "colors",
    "company",
    "category",
  ];
  const wantUpdate = Object.keys(req.body);
  const isValidUpdate = wantUpdate.every((key) => validupdaite.includes(key));
  if (!isValidUpdate) {
    throw new CustomError("Invalid Update", StatusCodes.BAD_REQUEST);
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.CREATED).json({ product });
};
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new CustomError(
      `NO Product with id ${req.params.id}`,
      StatusCodes.NOT_FOUND
    );
  }
  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "product deleted successfully" });
};
const productImage = async (req, res) => {
  const image = req.file;
  if (!image.mimetype.startsWith("image")) {
    throw new CustomError("please upload image ", StatusCodes.BAD_REQUEST);
  }
  const result = await cloud.uploader.upload(image.path, {
    use_filename: true,
    folder: "e-commerce",
  });
  unlinkSync(image.path);
  res.status(StatusCodes.CREATED).json({ image: result.secure_url });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productImage,
};
