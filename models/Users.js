const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileInformationSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
});

const addressSchema = new Schema({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
});

const paymentSchema = new Schema({
  paidMembership: {
    type: Boolean,
    default: false,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  // enddate = today + 30 days
  endDate: {
    type: Date,
    default: () => {
      let today = new Date();
      today.setMonth(today.getMonth() + 1);
      return today;
    },
  },
});

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  token: {
    type: String,
  },
  token_expiry: {
    type: Date,
    default: Date.now,
  },
  profileInformation: profileInformationSchema,
  address: addressSchema,
  payment: paymentSchema,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
