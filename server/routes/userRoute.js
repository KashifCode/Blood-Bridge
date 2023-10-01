// IMPORTS -
const express = require("express");
const router = express.Router();
const { registerUser, verifyUser, loginUser } = require("../controllers/userController");
const { authenticate, authorizeRoles } = require("../middlewares/auth");

router.route("/register").post(registerUser);
router.route("/:id/verify/:token").get(verifyUser);
router.route("/login").post(loginUser);

module.exports = router;