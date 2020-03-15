const express = require("express");
const _ = require("lodash");
const router = express.Router();
const {
  UserCustomer,
  validateUserCustomer
} = require("../models/user_customer");

router.post("/", async (req, res) => {
  const { error } = validateUserCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let userCustomer = new UserCustomer(_.pick(req.body, ["points"]));
  await userCustomer.save();

  res.send(userCustomer);
});

module.exports = router;
