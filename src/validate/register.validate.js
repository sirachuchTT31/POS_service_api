const Joi = require('joi');


const registerValidate = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
})



module.exports = {
    registerValidate
}