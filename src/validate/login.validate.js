const Joi = require('joi');


const loginValidate = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = {
    loginValidate
}