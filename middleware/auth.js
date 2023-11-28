// validate token
// if token is valid, then api is called
// else, error message is returned

const jwt = require("jsonwebtoken");
const { failureResponse } = require("../controllers/utils");
const User = require("../models/Users"); // Update the path accordingly

// const authenticate = async (req, res, next) => {
//   try {
//     // Extract the token from the Authorization header
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized - Token not provided' });
//     }

//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yourSecretKey');

//     // Check if the user exists in the database
//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(401).json({ message: 'Unauthorized - User not found' });
//     }

//     // Attach the user information to the request for later use
//     req.user = decoded;

//     // Continue to the next middleware or route handler
//     next();
//   } catch (error) {
//     console.error('Error in authenticate middleware:', error);
//     return res.status(401).json({ message: 'Unauthorized - Invalid token' });
//   }
// };

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

    if (!user) {
      return false;
    }

    // if user has paid membership
    if (user.payment && user.payment.paidMembership) {
      // check if the paid membership is valid
      if (user.payment.endDate > Date.now()) {
        return true;
      } else {
        // If membership has expired, update the user's payment status
        user.payment.paidMembership = false;
        user.payment.endDate = null;
        user.payment.startDate = null;
        await user.save();
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error checking paid membership");
  }
};

module.exports = {
  authenticate,
  checkPaidMembership,
};
