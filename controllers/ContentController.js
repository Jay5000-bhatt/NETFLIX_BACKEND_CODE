const { failureResponse, successResponse } = require("./utils");

const Content = require("../models/Content");
const Ratings = require("../models/Ratings");
const WatchHistory = require("../models/WatchHistory");

const createContent = async (req, res) => {
  try {
    const {
      name,
      description,
      genre,
      duration,
      language,
      coverPhoto,
      contentUrl,
    } = req.body;
    const content = new Content({
      name,
      description,
      genre,
      duration,
      language,
      coverPhoto,
      contentUrl,
    });
    await content.save();
    successResponse(res, "Content Created Successfully", 201);
  } catch (error) {
    // return res.status(500).json({ error: error });
    failureResponse(res, error);
  }
};

const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      failureResponse(res, "Content not found");
    } else successResponse(res, content);
  } catch (error) {
    failureResponse(res, error);
  }
};

const getAllContent = async (req, res) => {
  try {
    const content = await Content.find();
    successResponse(res, content);
  } catch (error) {
    failureResponse(res, error);
  }
};

const updateContent = async (req, res) => {
  try {
    let contentId = req.params.id;
    if (contentId) {
      // whether the content ID exists in the database or not
      let content = await Content.findById(contentId);
      if (!content) {
        throw new Error("Content not found");
      } else {
        const {
          name,
          description,
          genre,
          duration,
          language,
          coverPhoto,
          contentUrl,
        } = req.body;
        content.name = name ? name : content.name;
        content.description = description ? description : content.description;
        content.genre = genre ? genre : content.genre;
        content.duration = duration ? duration : content.duration;
        content.language = language ? language : content.language;
        content.coverPhoto = coverPhoto ? coverPhoto : content.coverPhoto;
        content.contentUrl = contentUrl ? contentUrl : content.contentUrl;

        await content.save();
        successResponse(res, "Content updated successfully");
      }
    } else {
      failureResponse(res, "Content not found");
    }
  } catch (error) {
    failureResponse(res, error);
  }
};

const deleteContent = async (req, res) => {
  try {
    let contentId = req.params.id;
    let content = await Content.findById(contentId);
    if (!content) {
      throw new Error("Content not found");
    } else {
      await content.deleteOne({ id: contentId });
      //   await content.remove();
      successResponse(res, "Content deleted successfully");
    }
  } catch (error) {
    failureResponse(res, error);
  }
};

const uploadFile = async (req, res) => {
  try {
    const { contentId } = req.body;
    const content = await Content.findById(contentId);

    if (!content) {
      return failureResponse(res, "Content not found");
    }

    if (!req.file) {
      return failureResponse(res, "No file uploaded");
    }

    const uploadedFile = req.file;
    const uploadPath = uploadedFile.path; // Assuming you want to store the file path

    // Update the content with the file path
    content.contentUrl = uploadPath;
    await content.save();

    successResponse(res, "Content uploaded successfully");
  } catch (error) {
    failureResponse(res, error.message || "An error occurred");
  }
};

const getRecommendedMovies = async (req, res) => {
  // 3 factors to be considered for recommendation:
  // 1. get all movie information from the database
  // 2. prefered genres of the user
  // 3. get evaluation based on played duration / total duration of the movie
  // 4. generate score based on the above factors
  // 5. sort the movies based on the score

  // get all movie information from the database
  try {
    const userId = req.user.id;
    const movies = await Content.find().lean(); //bson--> json
    const ratings = await Ratings.find({ userId }).lean();
    const watchHistory = await WatchHistory.find({ userId }).lean();
    // // if no movies found
    // if(movies.length === 0) {
    //   failureResponse(res, "No movies found");
    // }
    let genres = movies.map((movie) => movie.genre);
    // remove duplicate genres
    genres = [...new Set(genres)];
    let scores = []; // [{genre: "action", score: 0}, {genre: "comedy", score: 0}....]
    genres.forEach((ele) => {
      scores.push({
        genre: ele,
        score: 0,
      });
    });

    // get scores from ratings
    // if movie is liked then its genre will be incremented by 1
    // if movie is disliked then its genre will be decremented by 1
    ratings.forEach((rating) => {
      let movie = movies.find(
        (movie) => movie._id.toString() == rating.contentId
      );
      let genre = movie.genre;
      let score = scores.find((score) => score.genre === genre);
      if (rating.isLiked) {
        score.score += 1;
      } else {
        score.score -= 1;
      }
    });

    // get scores from watch history
    // if movie is watched completely then its genre will be incremented by 2 //--> 0.75 - 1
    // if movie is watched partially then its genre will be incremented by 1 // 0.5-0.75
    // if movie is watched less than half then its genre will be decremented by 1 // 0-0.5
    watchHistory.forEach((history) => {
      let movie = movies.find(
        (movie) => movie._id.toString() == history.contentId
      );
      let genre = movie.genre;
      let score = scores.find((score) => score.genre === genre);
      let playedDuration = history.playedDuration;
      let totalDuration = movie.duration;
      let percentage = playedDuration / totalDuration;
      if (percentage > 0.75) {
        score.score += 2;
      } else if (percentage > 0.5) {
        score.score += 1;
      } else {
        score.score -= 1;
      }
    });

    // sort the movies based on the score
    scores.sort((a, b) => b.score - a.score);

    let recommendedMovies = [];

    scores.forEach((score) => {
      let genre = score.genre;
      movies.forEach((movie) => {
        if (movie.genre === genre) {
          recommendedMovies.push(movie);
        }
      });
    });

    successResponse(res, recommendedMovies);
  } catch (error) {
    failureResponse(res, error);
  }
};

module.exports = {
  createContent,
  getContentById,
  getAllContent,
  updateContent,
  deleteContent,
  uploadFile,
  getRecommendedMovies,
};
