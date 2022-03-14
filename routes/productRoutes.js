const { Router } = require("express");
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  productImage,
} = require("../controllers/productController");
const {
  adminauthrize,
  authMiddleware,
} = require("../middleware/authmiddleware");

const router = Router();

router
  .route("/")
  .get(getAllProducts)
  .post(authMiddleware, adminauthrize("admin"), createProduct);
router
  .route("/image")
  .post(authMiddleware, adminauthrize("admin"), productImage);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(authMiddleware, adminauthrize("admin"), updateProduct)
  .delete(authMiddleware, adminauthrize("admin"), deleteProduct);

module.exports = router;
