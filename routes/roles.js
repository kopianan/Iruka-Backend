const express = require('express');
const router = express.Router();
const {Role, validate} = require('../models/role'); 


router.get('/', async (req, res) => {
    const roles = await Role.find(); 
    res.send(roles); 
}); 

//insert new role

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let role = new Role({ role_name: req.body.role_name });
    role = await role.save();
    
    res.send(role);
  });

module.exports = router; 