const Joi = require("joi");
const mongoose = require("mongoose");
const { userSchema, User } = require("../models/user");
 Joi.objectId =  require('joi-objectid')(Joi); 

const feedSchema = new mongoose.Schema({
  feed_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  link: {
    type: String
  },
  picture: {
    type: String
  },
  start_date: {
    type: Date,
    required: true,
    default: Date.now
  },
  end_date: {
    type: Date
  },
  status: {
    type: Boolean,
    default: false
  },
  is_active: {
    type: Boolean,
    default: true
  },
  specifics_roles: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Role"
  },
  create_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Feed = mongoose.model("Feeds", feedSchema);

function validateFeed(feed) {
  const schema = {
    feed_name: Joi.string()
      .min(5)
      .max(255)
      .required(),
    description: Joi.string()
      .min(5)
      .max(1024)
      .required(),
    link: Joi.string(),
    picture: Joi.string(),
    //validate joi array with object id inside
    specifics_roles: Joi.array().items(Joi.objectId()),
    //validate with objectid and required
    create_by: Joi.objectId().required()
  };
  return Joi.validate(feed, schema);
}

exports.feedSchema = feedSchema;
exports.Feed = Feed;
exports.validate = validateFeed;
