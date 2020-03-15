const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Coupon, validatePromo } = require("../models/promo_coupon");

router.get("/", async (req, res) => {
  const roles = await Coupon.find();
  res.send(roles);
});

router.post("/", async (req, res) => {
  const { error } = validatePromo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let coupon = new Coupon(
    _.pick(req.body, [
      "promo_name",
      "create_by",
      "quantity",
      "total_applied",
      "exchange_rate",
      "discount_value",
      "isAvailable",
      "expired_date"
    ])
  );
  coupon = await coupon.save();

  res.send(coupon);
});

module.exports = router;
