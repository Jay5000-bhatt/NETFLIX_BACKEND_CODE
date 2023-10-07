const Ratings = require("../models/Ratings");
const { failureResponse, successResponse } = require("./utils");

const addNewRating = async (req, res) => {
  try {
    let userId = req.user.id;
    let contentId = req.params.id;
    let { isLiked } = req.body;
    let rating = await Ratings.findOne({ userId, contentId });
    // if rating already exists, then user cannot add new rating
    if (rating) {
      failureResponse(res, "Rating already exists");
    } else {
      // we will add new rating
      let newRating = new Ratings({ userId, contentId, isLiked });
      await newRating.save();
      successResponse(res, "Rating added successfully");
    }
  } catch (error) {
    failureResponse(res, error);
  }
};

const updateRating = async (req, res) => {
  try {
    // if rating does not exist, then user cannot update rating
    let userId = req.user.id;
    let contentId = req.params.id;
    let { isLiked } = req.body;
    let rating = await Ratings.find({ userId, contentId });
    if (!rating || rating.length === 0) {
      failureResponse(res, "Rating does not exist");
    } else {
      // we will update rating
      await Ratings.updateOne({ userId, contentId }, { isLiked });
      successResponse(res, "Rating updated successfully");
    }
  } catch (error) {
    failureResponse(res, error);
  }
};

const deleteRating = async (req, res) => {
  try {
    let contentId = req.params.id;
    let userId = req.user.id;
    let rating = await Ratings.findOne({ userId, contentId });
    if (rating) {
      await Ratings.deleteOne({ userId, contentId });
      successResponse(res, "Rating deleted successfully");
    } else {
      failureResponse(res, "Rating does not exist");
    }
  } catch (error) {
    failureResponse(res, error);
  }
};

const getAllContentRatings = async (req, res) => {
  try {
    let contentId = req.params.id;
    let ratings = await Ratings.find({ contentId });
    successResponse(res, ratings);
  } catch (error) {
    failureResponse(res, error);
  }
};

const getAllUserRatings = async (req, res) => {
  try {
    let userId = req.user.id;
    let ratings = await Ratings.find({ userId });
    successResponse(res, ratings);
  } catch (error) {
    failureResponse(res, error);
  }
};

module.exports = {
  addNewRating,
  updateRating,
  deleteRating,
  getAllContentRatings,
  getAllUserRatings,
};
