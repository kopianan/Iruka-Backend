const express = require("express");
const Fawn = require("fawn");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");
const {
  User,
  validateUser,
  UserCustomer,
  UserGroomer
} = require("../models/user");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const user = await User.find();
  res.send(user);
});
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0]);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  // But a ClickedLinkEvent can
  user = new UserCustomer({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    userType: req.body.userType,
    points: req.body.points
  });
  // user = new UserCustomer (
  //   _.pick(req.body, [
  //     "name",
  //     "email",
  //     "password",
  //     "phoneNumber",
  //     "picture",
  //     "isActive",
  //     "userType",
  //     "userRoleDetail"
  //   ])
  // );
  await user.save();
  res.send(user);
});

module.exports = router;
