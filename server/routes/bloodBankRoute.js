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
  updateProfile,
  verifyEmail,
  resendEmailVerification,
  getBloodBankLocation,
  completeProfile,
  deactivateAccount,
  getAllBloodBanks,
} = require("../controllers/bloodBankController");
const { authenticateBloodBank, authorizeRoles, authenticateUser } = require("../middlewares/auth");

// BLOOD BANK ROUTES -
router.route("/auth/bloodBank/register").post(registerBloodBank);
router.route("/auth/bloodBank/:id/verify/:token").get(verifyBloodBank);
router.route("/auth/bloodBank/login").post(loginBloodBank);
router.route("/auth/bloodBank/logout").get(logoutBloodBank);
router.route("/auth/bloodBank/forgot").post(forgotPassword);
router.route("/auth/bloodBank/reset/:token").put(resetPassword);
router.route("/bloodBank/profileCompletion").post(authenticateBloodBank, authorizeRoles("bloodBank"), completeProfile)
router.route("/bloodBank/me").get(authenticateBloodBank, authorizeRoles("bloodBank"), getBloodBank);
router.route("/bloodBank/password/update").put(authenticateBloodBank, authorizeRoles("bloodBank"), updatePassword);
router.route("/bloodBank/me/update").put(authenticateBloodBank, authorizeRoles("bloodBank"), updateProfile);
router.route("/bloodBank/:id/verify/:token").get(verifyEmail);
router.route("/bloodBank/email/resend").get(authenticateBloodBank, authorizeRoles("bloodBank"), resendEmailVerification)
router.route("/bloodBank/location").get(getBloodBankLocation);
router.route("/bloodBank/deactivate").put(authenticateBloodBank, authorizeRoles("bloodBank"), deactivateAccount)

// ADMIN ROUTES -
router.route("/admin/bloodBank/all").get(authenticateUser, authorizeRoles("admin"), getAllBloodBanks);

module.exports = router;
