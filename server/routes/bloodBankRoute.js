// IMPORTS -
const express = require("express");
const router = express.Router();
const {
  registerBloodBank,
  verifyBloodBank,
  loginBloodBank,
  logoutBloodBank,
  forgotPassword,
  resetPassword, 
  getBloodBank,
  updatePassword,
} = require("../controllers/bloodBankController");
const { authenticateBloodBank, authorizeRoles } = require("../middlewares/auth");

router.route("/auth/bloodBank/register").post(registerBloodBank);
router.route("/auth/:id/verify/:token").get(verifyBloodBank);
router.route("/auth/bloodBank/login").post(loginBloodBank);
router.route("/auth/bloodBank/logout").get(logoutBloodBank);
router.route("/auth/bloodBank/forgot").post(forgotPassword);
router.route("/auth/bloodBank/reset/:token").put(resetPassword);
router.route("/bloodBank/me").get(authenticateBloodBank, authorizeRoles("bloodBank"), getBloodBank);
router.route("/bloodBank/password/update").put(authenticateBloodBank, authorizeRoles("bloodBank"), updatePassword);

module.exports = router;
