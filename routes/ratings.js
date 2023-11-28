const express = require("express");

const router = express.Router();

const {
  addNewRating,
  updateRating,
  deleteRating,
  getAllContentRatings,
  getAllUserRatings,
} = require("../controllers/RatingController");
const { authenticate } = require("../middleware/auth");

// add rating
router.post("/:id", authenticate, addNewRating); //Work Good!

// update rating
router.put("/:id", authenticate, updateRating); //Work Good!

// delete rating
router.delete("/:id", authenticate, deleteRating); //Work Good!

// get all ratings for a content
router.get("/content/:id", authenticate, getAllContentRatings); //Work Good!

// get all ratings done by a user
router.get("/user", authenticate, getAllUserRatings); //Work Good!

module.exports = router;
