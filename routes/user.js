const express = require("express");

const router = express.Router();

const {
  signUp,
  login,
  changePassword,
  generateOtp,
  verifyOtp,
  updateProfile,
  createPayment,
} = require("../controllers/UserController");

const { authenticate } = require("../middleware/auth");

router.post("/signup", signUp);
router.post("/login", login);
router.post("/change", authenticate, changePassword);
router.post("/generate-otp", authenticate, generateOtp);
router.post("/verify-otp", authenticate, verifyOtp);
router.put("/update", authenticate, updateProfile);
router.post("/payment", authenticate, createPayment);

module.exports = router;
