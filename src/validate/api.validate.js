const Joi = require('joi')

const createUser = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
})

const updateTheme = Joi.object().keys({
    userSettingId: Joi.string().required(),
    bg_color : Joi.string(),
    logo : Joi.string()
})
module.exports = {
    createUser,
    updateTheme
}