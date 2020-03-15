const express = require("express");
const router = express.Router();
const { Feed, validate } = require("../models/feed");
const { User } = require("../models/user");
const { Role } = require("../models/role");

router.get("/", async (req, res) => {
  const feed = await Feed.find();

  res.send(feed);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if there is user with the id
  const user = await User.findById(req.body.create_by);
  if (!user) return res.status(400).send("Invalid User Id");

  //check if the roles is valid
  const roles = await Role.find({ _id: { $in: [req.body.specifics_roles] } });
  if (roles.length == 0) {
    res.status(400).send("No kind of roles id");
  }
  if (!roles) return res.status(400).send(roles.error.message);
  

  let feed = new Feed({
    feed_name: req.body.feed_name,
    description: req.body.description,
    link: req.body.link,
    picture: req.body.picture,
    specifics_roles: req.body.specifics_roles,
    create_by: req.body.create_by
  });
  feed = await feed.save();

  res.send(feed);
});

module.exports = router;
