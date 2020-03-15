const Joi = require('joi');
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    role_name : {
        type : String, 
        required : true , 
        maxlength : 50
    }
}); 
const Role = mongoose.model('Role', roleSchema); 

function validateRole(role){
    const schema ={
        role_name : Joi.string().max(50).required()  
    }; 

    return Joi.validate(role, schema); 
    
}

exports.Role = Role ; 
exports.validate = validateRole ; 
exports.roleSchema = roleSchema ; 