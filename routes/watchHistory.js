const express = require("express");

const router = express.Router();

const {
  createHistory,
  getWatchHistory,
  updateHistory,
  deleteHistory,
  deleteAllHistory,
} = require("../controllers/WatchHistoryController");

const { authenticate } = require("../middleware/auth");

// add new watch history
router.post("/", authenticate, createHistory); //Work Properly

// update watch history
router.put("/:id", authenticate, updateHistory); //Work Properly

// delete watch history
router.delete("/:id", authenticate, deleteHistory); //Work Properly

// delete all records
router.delete("/user/:id", authenticate, deleteAllHistory); //Work Properly

// get watch history of a user
router.get("/", authenticate, getWatchHistory); //Work Properly

module.exports = router;
