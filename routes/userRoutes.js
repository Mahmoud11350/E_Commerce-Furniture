const { Router } = require("express");
const { adminauthrize } = require("../middleware/authmiddleware");
const {
  getAllusers,
  getSingleUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");

const router = Router();

router.route("/").get(adminauthrize("admin"), getAllusers);
router.route("/:id").get(getSingleUser).patch(updateUser);
router.route("/password/:id").patch(updateUserPassword);

module.exports = router;
