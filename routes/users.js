const express = require("express");
const Fawn = require("fawn");
const router = express.Router();
const mongoose = require("mongoose");
// const bcrypt = require('bcrypt');
const _ = require("lodash");
const {
  User,
  validateUser
} = require("../models/user");
const { validateUserCustomer } = require('../models/user_customer');
const { validateUserGroomer } = require('../models/user_groomer');
const asyncMiddleware = require('../middleware/async');

const authMiddleware = require('../middleware/auth');


Fawn.init(mongoose);

router.get("/me", authMiddleware, asyncMiddleware(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
}));



router.get("/", asyncMiddleware(async (req, res) => {
  
  throw new Error("error cuk");
  const user = await User.find();
  res.send(user);
}));

//get data with token given
// router.get("/", authMiddleware, asyncMiddleware(async (req, res) => {
//   const user = await User.find();
//   res.send(user);
// }));



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

  // const salt = await bcrypt.genSalt(10);
  // const hashed = await bcrypt.hash(req.body.password, salt);


  user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    userType: req.body.userType,
    userCustomerDetail: userCustomerDetail,
    userGroomerDetail: userGroomerDetail
  });
  user.password = req.body.password;
  await user.save();
  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(user)
});

module.exports = router;
