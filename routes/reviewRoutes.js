const {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const { Router } = require("express");
const { authMiddleware } = require("../middleware/authmiddleware");

const router = Router();

router.route("/").get(getAllReviews).post(authMiddleware, createReview);
router
  .route("/:id")
  .patch(authMiddleware, updateReview)
  .delete(authMiddleware, deleteReview)
  .get(getReview);

module.exports = router;
