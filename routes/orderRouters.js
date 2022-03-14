const { Router } = require("express");
const {
  createOrder,
  getAllorders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
} = require("../controllers/orderController");
const { adminauthrize } = require("../middleware/authmiddleware");
const checkPermission = require("../utils/checkPermision");

const router = Router();
router.route("/").get(adminauthrize("admin"), getAllorders).post(createOrder);
router.route("/user").get(getCurrentUserOrders);
router.route("/:id").get(getSingleOrder);

module.exports = router;
