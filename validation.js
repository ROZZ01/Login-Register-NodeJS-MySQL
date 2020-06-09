//Validation
const joi = require('@hapi/joi');

const registerValidation = data => {
    
    const schema = joi.object({
    name : joi.string().min(6).required(),
    email : joi.string().min(6).required().email(),
    password : joi.string().min(6).required()
    });

    return schema.validate(data);
    // if(error) return res.status(404).send(error.details[0].message);
};

const loginValidation = data => {
    
    const schema = joi.object({
    email : joi.string().min(6).required().email(),
    password : joi.string().min(6).required()
    });

    return schema.validate(data);
    // if(error) return res.status(404).send(error.details[0].message);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

