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
router.post("/:id", authenticate, addNewRating);

// update rating
router.put("/:id", authenticate, updateRating);

// delete rating
router.delete("/:id", authenticate, deleteRating);

// get all ratings for a content
router.get("/content/:id", authenticate, getAllContentRatings);

// get all ratings done by a user
router.get("/user", authenticate, getAllUserRatings);

module.exports = router;
