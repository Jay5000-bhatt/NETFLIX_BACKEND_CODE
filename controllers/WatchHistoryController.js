const WatchHistory = require("../models/WatchHistory");
const Content = require("../models/Content");

const { failureResponse, successResponse } = require("./utils");

const createHistory = async (req, res) => {
  try {
    let data = await createUpdateHistory(
      req.body.contentId,
      req.user.id,
      req.body.playedDuration
    );
    successResponse(res, data);
  } catch (error) {
    failureResponse(res, error);
  }
};

const getWatchHistory = async (req, res) => {
  try {
    let userId = req.user.id;
    let watchHistory = await WatchHistory.find({ userId })
      .populate("userId", "email role")
      .populate("contentId", "name genre")
      .sort({ lastPlayed: -1 });

    successResponse(res, watchHistory);
  } catch (error) {
    failureResponse(res, error);
  }
};

const updateHistory = async (req, res) => {
  try {
    let data = await createUpdateHistory(
      req.body.contentId,
      req.user.id,
      req.body.playedDuration
    );
    successResponse(res, data);
  } catch (error) {
    failureResponse(res, error);
  }
};

const deleteHistory = async (req, res) => {
  try {
    let userId = req.user.id;
    let contentId = req.params.id;
    await WatchHistory.deleteOne({ userId, contentId });
    successResponse(res, "Watch History deleted successfully.");
  } catch (error) {
    failureResponse(res, error);
  }
};

const deleteAllHistory = async (req, res) => {
  try {
    let userId = req.user.id;
    await WatchHistory.deleteMany({ userId });
    successResponse(res, "Watch History deleted successfully.");
  } catch (error) {
    failureResponse(res, error);
  }
};

function createUpdateHistory(contentId, userId, playedDuration) {
  return new Promise(async (resolve, reject) => {
    let content = await Content.findById(contentId);
    if (!content) {
      reject("Content not found");
    } else {
      // check if the ContentId already exists in the watch history
      let history = await WatchHistory.findOne({ contentId, userId });
      if (history) {
        // if yes, update the playedDuration and lastPlayed
        history.playedDuration = playedDuration;
        history.lastPlayed = new Date();
        await history.save();
        resolve("Watch History updated successfully.");
      } else {
        // if no, create a new watch history
        const movieDuration = content.duration;
        const lastPlayed = new Date();
        const watchHistory = new WatchHistory({
          contentId,
          userId,
          playedDuration,
          movieDuration,
          lastPlayed,
        });
        await watchHistory.save();
        resolve("Watch History created successfully.");
      }
    }
  });
}

module.exports = {
  createHistory,
  getWatchHistory,
  updateHistory,
  deleteHistory,
  deleteAllHistory,
};
