const Joi = require("joi");
const mongoose = require("mongoose");

const jwt = require('jsonwebtoken');
const config = require('config');

const { userCustomerSchema } = require("../models/user_customer");
const { userGroomerSchema } = require("../models/user_groomer");

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
    },
    userCustomerDetail: {
      type: userCustomerSchema,
      required: function () {
        if (this.userType == 'customer') {
          return true;
        }
      }
    },
    userGroomerDetail: {
      type: userGroomerSchema,
      required: function () {
        if (this.userType == 'groomer') {
          return true;
        }
      }
    }
  }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
  return token
}
const User = mongoose.model("User", userSchema);

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
    isActive: Joi.boolean(),
    userCustomerDetail: Joi.object().when('userType', {
      is: 'customer',
      then: Joi.object().required(),
      otherwise: Joi.object().allow(null).default(null)
    }),
    userGroomerDetail: Joi.object().when('userType', {
      is: 'groomer',
      then: Joi.object().required(),
      otherwise: Joi.object().allow(null).default(null)
    })
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;
exports.userSchema = userSchema;
