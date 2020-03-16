const express = require("express");
const Fawn = require("fawn");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");
const {
  User,
  validateUser
} = require("../models/user");
const { validateUserCustomer } = require('../models/user_customer');
const { validateUserGroomer } = require('../models/user_groomer');
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


  let userCustomerDetail = null;
  let userGroomerDetail = null;

  switch (req.body.userType) {
    case 'customer':
      const { error } = validateUserCustomer(req.body.userCustomerDetail);
      if (error) return res.status(400).send(error.details[0]);
      userCustomerDetail = req.body.userCustomerDetail;
      ; break;
    case 'groomer':
      const { errorGroomer } = validateUserGroomer(req.body.userGroomerDetail);
      if (errorGroomer) return res.status(400).send(errorGroomer.details[0]);
      userGroomerDetail = req.body.userGroomerDetail;
      ; break;
    default:
      userCustomerDetail = null;
      userGroomerDetail = null;
  }

  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    userType: req.body.userType,
    userCustomerDetail: userCustomerDetail,
    userGroomerDetail: userGroomerDetail
  });

  await user.save();
  res.send(user);
});

module.exports = router;
