const { PrismaClient } = require('@prisma/client')
const prismaClient = new PrismaClient()
const registerValidate = require('../validate/register.validate.js')
const BaseResult = require('../utils/Response.js')
const BaseInterface = require('../utils/Response_model.js')
const http_response = require('../constant/http-response.js')
const bcrypt = require('bcrypt')
const Register = {
    handler: async (request, reply) => {
        try {
            const payload = request.payload
            const { value, error } = registerValidate.registerValidate.validate(payload)
            if (!error) {
                // genarate setting_code
                const setting_code_genarate = 'setting-' + Date.now().toString(32) + '-' + Math.random().toString(5).replaceAll('.', '')
                // const theme_code_genarate = 'theme-' + Date.now().toString(32) + '-' + Math.random().toString(5).replaceAll('.', '')
                const payload_user_setting = {
                    setting_code: setting_code_genarate,
                    is_default: 'DEFAULT'
                }
                //create userSetting first 
                const responseUsersetting = await prismaClient.userSetting.create({
                    data: payload_user_setting
                }).then((v) => {
                    return v.setting_code
                }).catch((e) => {
                    return e
                })
                if (responseUsersetting) {
                    const salt = 10
                    const encpytPassword = bcrypt.hash(payload.password, salt)
                    const payload_users = {
                        first_name: payload.first_name,
                        last_name: payload.last_name,
                        email: payload.email,
                        address: payload.address,
                        username: payload.username,
                        password: encpytPassword,
                        role_active: 'DEMO',
                        first_login: false,
                        setting_id: responseUsersetting
                    }
                    const responseUsers = await prismaClient.users.create(payload_users).then((v) => {
                        return v
                    }).catch((e) => {
                        return e
                    })
                    if (responseUsers) {
                        BaseInterface.IBaseNocontentModel.status = http_response.STATUS_201.status_code
                        BaseInterface.IBaseNocontentModel.message = http_response.STATUS_201.message
                        return reply.response(await BaseResult.IBaseNocontent(BaseInterface.IBaseNocontentModel))
                    }
                    else {
                        BaseInterface.IBaseNocontentModel.status = http_response.STATUS_500.status_code
                        BaseInterface.IBaseNocontentModel.message = http_response.STATUS_500.message
                        return reply.response(await BaseResult.IBaseNocontent(BaseInterface.IBaseNocontentModel))
                    }
                }
                else {
                    
                }
                // const payload_themeconfig = {
                //     theme_code: theme_code_genarate,
                //     bg_color : "#fff",
                //     logo : "https://t4.ftcdn.net/jpg/03/92/55/79/360_F_392557923_FCHEloSJcOq9FzElO6mIIGEW8p1aCiII.jpg",
                // }
            }
            else {
                BaseInterface.IBaseNocontentModel.status = http_response.STATUS_400.status_code
                BaseInterface.IBaseNocontentModel.message = http_response.STATUS_400.message
                return reply.response(await BaseResult.IBaseNocontent(BaseInterface.IBaseNocontentModel))
            }
        }
        catch (e) {

        }
    }
}


module.exports = {
    Register
}