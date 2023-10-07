// validate token
// if token is valid, then api is called
// else, error message is returned

const jwt = require("jsonwebtoken");
const { failureResponse } = require("../controllers/utils");
const User = require("../models/Users");

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    const decoded = jwt.verify(token, "mysecret");
    req.user = decoded;
    let flag = await checkPaidMembership(decoded.id);
    if (flag) {
      next();
    } else {
      failureResponse(res, "Invalid membership", 401);
    }
  } catch (error) {
    failureResponse(res, error);
  }
};

const checkPaidMembership = async (userId) => {
  try {
    // if user exists
    let user = await User.findById(userId);
    if (user) {
      // if user has paid membership
      if (user.payment && user.payment.paidMembership) {
        // check if the paid membership is valid
        // if valid, return true
        if (user.payment.endDate > Date.now()) {
          return true;
        } else {
          user.payment.paidMembership = false;
          user.payment.endDate = null;
          user.payment.startDate = null;
          await user.save();
          return false;
        }
        // else, return false
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    failureResponse(res, error);
  }
};

module.exports = {
  authenticate,
};
