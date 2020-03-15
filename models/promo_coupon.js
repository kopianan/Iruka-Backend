const Joi = require("joi");
const mongoose = require("mongoose");

const promoSchema = new mongoose.Schema({
  promo_name: {
    type: String,
    required: true,
    maxlength: 255
  },
  create_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0,
    required: true
  },
  total_applied: {
    type: Number,
    min: 0,
    default: 0,
    required: true
  },
  exchange_rate: {
    type: Number,
    min: 0,
    default: 0,
    required: true
  },
  discount_value: {
    type: Number,
    min: 0,
    default: 0,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true,
    required: true
  },
  expired_date: {
    type: Date,
    default: Date.now,
    required: true
  }
});
const Coupon = mongoose.model("PromoCoupon", promoSchema);

function validatePromo(promo) {
  const schema = {
    promo_name: Joi.string()
      .max(255)
      .required(),
    create_by: Joi.string().required()
  };

  return Joi.validate(promo, schema);
}

exports.Coupon = Coupon;
exports.validatePromo = validatePromo;
exports.promoSchema = promoSchema;
