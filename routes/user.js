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

router.post("/signup", signUp); // Work Properly
router.post("/login", login);  // Work Properly
router.put("/change", authenticate, changePassword); // Work Properly
router.post("/generate-otp", authenticate, generateOtp); // Work Properly
router.post("/verify-otp", authenticate, verifyOtp); // Work Properly
router.put("/update", authenticate, updateProfile); // Work Properly
router.post("/payment", authenticate, createPayment); //Work Properly

module.exports = router;
