const { PrismaClient } = require('@prisma/client')
const prismaClient = new PrismaClient()
const verify_auth = require('../utils/jwt.handler.js')
const Boom = require('boom')
const Validate = require('../validate/api.validate.js')
const BaseResult = require('../utils/Response.js')
const BaseInterface = require('../utils/Response_model.js')
const http_response = require('../constant/http-response.js')
const CreateUser = {
    auth: false,
    handler: async (request, reply) => {
        try {
            const { value, error } = Validate.createUser.validate(request.payload)
            if (!error) {
                //Create usersetting
                const settingCode = 'setting-' + Date.now().toString(32) + '-' + Math.random().toString(4).replaceAll('.', '')
                const themeCode = 'theme-' + Date.now().toString(32) + '-' + Math.random().toString(4).replaceAll('.', '')
                const responseUsersetting = await prismaClient.userSetting.create({
                    data: {
                        setting_code: settingCode,
                        is_default: 'DEFAULT',
                    }
                })
                if (responseUsersetting) {
                    const responseTheme = await prismaClient.themeConfig.create({
                        data: {
                            theme_code: themeCode,
                            bg_color: '#fff',
                            logo: 'https://t4.ftcdn.net/jpg/03/92/55/79/360_F_392557923_FCHEloSJcOq9FzElO6mIIGEW8p1aCiII.jpg',
                            userSettingId: responseUsersetting.id
                        }
                    })
                    if (responseTheme) {
                        await prismaClient.users.create({
                            data: {
                                first_name: value.first_name,
                                last_name: value.last_name,
                                email: value.email,
                                address: value.address,
                                username: value.username,
                                password: value.password,
                                setting_id: responseUsersetting.setting_code
                            }
                        }).then((v) => {
                            return v
                        }).catch((e) => {
                            return e
                        })
                        BaseInterface.IBaseNocontentModel.status = true
                        BaseInterface.IBaseNocontentModel.status_code = http_response.STATUS_201.status_code
                        BaseInterface.IBaseNocontentModel.message = http_response.STATUS_201.message
                        return reply.response(await BaseResult.IBaseNocontent(BaseInterface.IBaseNocontentModel))
                    }
                    return Boom.internal()
                }
                return Boom.internal()

            }
            return Boom.badRequest()
        }
        catch (e) {
            console.log(e)
        }
    }
}

const UpdateTheme = {
    handler: async (request, reply) => {
        try {
            const { value, error } = Validate.updateTheme.validate(request.payload)
            if (!error) {
                const responseTheme = await prismaClient.themeConfig.updateMany({
                    data: {
                        bg_color: value?.bg_color,
                        logo: value?.logo
                    },
                    where: {
                        userSettingId: value.userSettingId
                    }
                })
                if (responseTheme) {
                    BaseInterface.IBaseNocontentModel.status = true
                    BaseInterface.IBaseNocontentModel.status_code = http_response.STATUS_200.status_code
                    BaseInterface.IBaseNocontentModel.message = responseTheme.id
                    return reply.response(await BaseResult.IBaseNocontent(BaseInterface.IBaseNocontentModel))
                }
                return Boom.internal()
            }
            return Boom.badRequest()

        }
        catch (e) {
            console.log(e)
        }
    }
}
module.exports = {
    CreateUser,
    UpdateTheme
}