const Joi = require("joi");
const mongoose = require("mongoose");

var options = { discriminatorKey: "kind" };
const userCustomerSchema = new mongoose.Schema({
  points: {
    type: Number,
    default: 0,
    required: true,
    min: 0
  }
},options);
const UserCustomer = mongoose.model("UserCustomerDetail", userCustomerSchema);
function validateUserCustomer(userCustomer) {
  const schema = {
    points: Joi.number()
      .min(0)
      .required()
  };

  return Joi.validate(userCustomer, schema);
}
exports.UserCustomer = UserCustomer;
exports.validateUserCustomer = validateUserCustomer;
exports.userCustomerSchema = userCustomerSchema;
