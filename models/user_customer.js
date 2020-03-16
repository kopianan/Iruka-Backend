const Joi = require("joi");
const mongoose = require("mongoose");

const userCustomerSchema = new mongoose.Schema({
  points: {
    type: Number,
    required: true
  }
});
const UserCustomer = mongoose.model("UserCustomerDetail", userCustomerSchema);
function validateUserCustomer(userCustomer) {
  const schema = {
    points: Joi.number()
      .required()
  };

  return Joi.validate(userCustomer, schema);
}
exports.UserCustomer = UserCustomer;
exports.validateUserCustomer = validateUserCustomer;
exports.userCustomerSchema = userCustomerSchema;
