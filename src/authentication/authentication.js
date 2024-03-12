const { PrismaClient } = require('@prisma/client')
const prismaClient = new PrismaClient()
const registerValidate = require('../validate/register.validate.js')
const loginValidate = require('../validate/login.validate.js')
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
                    const duplicateUser = await prismaClient.users.findFirst({
                        where: {
                            username: value.username
                        }
                    }).then((v) => {
                        return v
                    }).catch((e) => {
                        return e
                    })
                    if (duplicateUser) {
                        const salt = 10
                        const encpytPassword = await bcrypt.hash(value.password, salt)
                        const payload_users = {
                            first_name: value.first_name,
                            last_name: value.last_name,
                            email: value.email,
                            address: value.address,
                            username: value.username,
                            password: encpytPassword,
                            role_active: 'DEMO',
                            first_login: false,
                            setting_id: responseUsersetting
                        }
                        const responseUsers = await prismaClient.users.create({
                            data: payload_users
                        }).then((v) => {
                            return v
                        }).catch((e) => {
                            return e
                        })
                        if (responseUsers) {
                            BaseInterface.IBaseNocontentModel.status = true
                            BaseInterface.IBaseNocontentModel.status_code = http_response.STATUS_201.status_code
                            BaseInterface.IBaseNocontentModel.message = http_response.STATUS_201.message
                            return reply.response(await BaseResult.IBaseNocontent(BaseInterface.IBaseNocontentModel))
                        }
                        else {
                            BaseInterface.IBaseNocontentModel.status = false
                            BaseInterface.IBaseNocontentModel.status_code = http_response.STATUS_500.status_code
                            BaseInterface.IBaseNocontentModel.message = http_response.STATUS_500.message
                            return reply.response(await BaseResult.IBaseNocontent(BaseInterface.IBaseNocontentModel))
                        }
                    }
                    else {
                        BaseInterface.IBaseNocontentModel.status = false
                        BaseInterface.IBaseNocontentModel.status_code = http_response.STATUS_400.status_code
                        BaseInterface.IBaseNocontentModel.message = http_response.STATUS_400.message
                        return reply.response(await BaseResult.IBaseNocontent(BaseInterface.IBaseNocontentModel))
                    }
                }
                else {
                    BaseInterface.IBaseNocontentModel.status = false
                    BaseInterface.IBaseNocontentModel.status_code = http_response.STATUS_500.status_code
                    BaseInterface.IBaseNocontentModel.message = http_response.STATUS_500.message
                    return reply.response(await BaseResult.IBaseNocontent(BaseInterface.IBaseNocontentModel))
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

const Login = {
    handler: async (request, reply) => {
        try {
            const payload = request.payload
            console.log(payload.username)
            const { value, error } = loginValidate.loginValidate.validate(payload)
            if (!error) {
                const responseLogin = await prismaClient.users.findFirst({
                    where: {
                        username: value.username
                    }
                }).then((v) => {
                    return v
                }).catch((e) => {
                    return e
                })
                if (responseLogin) {
                    BaseInterface.IBaseSingleResultModel.result = responseLogin
                    BaseInterface.IBaseSingleResultModel.status = true
                    BaseInterface.IBaseSingleResultModel.status_code = http_response.STATUS_200.status_code
                    BaseInterface.IBaseSingleResultModel.message = 'Get data successfully'
                    BaseInterface.IBaseSingleResultModel.errorMessage = null
                    return reply.response(await BaseResult.IBaseSingleResult(BaseInterface.IBaseSingleResultModel))
                }
                else {
                    BaseInterface.IBaseSingleResultModel.result = null
                    BaseInterface.IBaseSingleResultModel.status = false
                    BaseInterface.IBaseSingleResultModel.status_code = http_response.STATUS_200.status_code
                    BaseInterface.IBaseSingleResultModel.errorMessage = null
                    return reply.response(await BaseResult.IBaseSingleResult(BaseInterface.IBaseSingleResultModel))
                }
            }
        }
        catch (e) {

        }
    }
}


module.exports = {
    Register,
    Login
}