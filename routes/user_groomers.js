const express = require("express");
const _ = require('lodash'); 
const router = express.Router();
const { UserGroomer, validateUserGroomer } = require("../models/user_groomer");

router.post("/", async (req, res) => {
  const { error } = validateUserGroomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let userGroomer = new UserGroomer(
    _.pick(req.body, [
      "isShow",
      "isAvailable",
      "yearsOfExperience",
      "styling",
      "clipping",
      "keyFeatures",
      "trainingStartDate",
      "trainingTotalYears",
      "trainingCourse",
      "description",
      "isCertificated"
    ])
  );
  await userGroomer.save();

  res.send(userGroomer);
});

module.exports = router ; 
