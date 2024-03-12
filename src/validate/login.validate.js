const Joi = require('joi');


const loginValidate = {
    username: Joi.string().required(),
    password: Joi.string().required()
}

module.exports = {
    loginValidate
}