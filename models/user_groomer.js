const Joi = require("joi");
const mongoose = require("mongoose");

const userGroomerSchema = new mongoose.Schema({
  isShow: {
    type: Boolean,
    default: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  yearsOfExperience: {
    type: Number,
    default: 0,
    min: 0
  },
  styling: {
    type: Number,
    default: 0,
    required: true,
    min: 0,
    max: 3
  },

  clipping: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 3
  },
  keyFeatures: {
    type: String
  },
  trainingStartDate: {
    type: Date
  },
  trainingTotalYears: {
    type: Number,
    min: 0
  },
  trainingCourse: {
    type: String
  },
  description: {
    type: String
  },
  isCertificated: {
    type: Boolean
  }
});
const UserGroomer = mongoose.model("UserGroomerDetail", userGroomerSchema);
function validateUserGroomer(userGroomer) {
  const schema = {
    isShow: Joi.boolean()
      .required()
      .required(),
    styling: Joi.number()
      .min(0)
      .max(3)
      .required(),
    clipping: Joi.number()
      .min(0)
      .max(3)
      .required()
  };

  return Joi.validate(userGroomer, schema);
}
exports.UserGroomer = UserGroomer;
exports.validateUserGroomer = validateUserGroomer;
exports.userGroomerSchema = userGroomerSchema;
