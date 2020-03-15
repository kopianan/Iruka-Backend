const Joi = require("joi");
const mongoose = require("mongoose");
const { userGroomerSchema } = require("../models/user_groomer");

const { userCustomerSchema } = require("../models/user_customer");
var options = { discriminatorKey: "kind" };

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255
    },
    address: {
      type: String
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024
    },
    phoneNumber: {
      type: String,
      minlength: 6,
      maxlength: 50
    },
    picture: String,
    isActive: {
      type: Boolean,
      default: true,
      required: true
    },
    userType: {
      type: String,
      required: true,
      enum: ["groomer", "customer", "owner", "admin"],
      lowercase: true,
      trim: true
    }
  },
  options
);

const User = mongoose.model("User", userSchema);

const UserGroomer = User.discriminator("UserGroomer", userGroomerSchema);
const UserCustomer = User.discriminator(
  "UserCustomer",
  new mongoose.Schema({ points: Number }, options)
);

function validateUser(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(255)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .max(255)
      .required(),
    userType: Joi.string().required(),
    address: Joi.string(),
    phoneNumber: Joi.string()
      .min(6)
      .max(50),
    picture: Joi.string(),
    isActive: Joi.boolean()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;
exports.userSchema = userSchema;
exports.UserGroomer = UserGroomer;
exports.UserCustomer = UserCustomer;
