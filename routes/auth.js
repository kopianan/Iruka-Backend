const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");
const bcrypt = require('bcrypt');
const Joi = require("joi");
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');  

// router.get("/", async (req, res) => {
//   const user = await User.find();
//   res.send(user);
// });

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0]);
    console.log(req.body.email);
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("invalid Password");

    const token =user.generateAuthToken() ; 
    res.send(token);

});



function validate(user) {
    const schema = {
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .max(255)
            .required(),

    };

    return Joi.validate(user, schema);
}
module.exports = router;
