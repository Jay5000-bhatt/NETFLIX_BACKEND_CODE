const express = require("express");
const router = express.Router();

const {
  createContent,
  getAllContent,
  getContentById,
  updateContent,
  deleteContent,
  uploadFile,
  getRecommendedMovies,
} = require("../controllers/ContentController");

const { authenticate } = require("../middleware/auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// create content
router.post("/", createContent); //work properly

// update content
router.put("/:id", authenticate, updateContent); //work properly

// delete content
router.delete("/:id", authenticate, deleteContent); //work properly

// get all content
router.get("/", authenticate, getAllContent); //work properly

// Get Movie Recomendation
router.get("/recommendation", authenticate, getRecommendedMovies);

// get content by id
router.get("/:id", authenticate, getContentById); //work properly

// upload content
router.post("/upload", authenticate, upload.single("content"), uploadFile); //work properly

// logic for not allowing any user to play content, genuine users only
// router.post("/getContent/:token", authenticate, getContent);
// // token will be used for validation whether its a genuine request or not
// // if token valid movie will play else url will not work

module.exports = router;
