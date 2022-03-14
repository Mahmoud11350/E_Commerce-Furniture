const { Router } = require("express");
const { register, login, logout } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authmiddleware");

const router = new Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authMiddleware, logout);

module.exports = router;
