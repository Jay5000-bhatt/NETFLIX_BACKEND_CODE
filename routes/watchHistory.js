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

// get watch history of a user
router.get("/", authenticate, getWatchHistory);

// add new watch history
router.post("/", authenticate, createHistory);

// update watch history
router.put("/:id", authenticate, updateHistory);

// delete all records
router.delete("/all", authenticate, deleteAllHistory);

// delete watch history
router.delete("/:id", authenticate, deleteHistory);

module.exports = router;
