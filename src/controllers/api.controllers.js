const { PrismaClient } = require('@prisma/client')
const prismaClient = new PrismaClient()
const verify_auth = require('../utils/jwt.handler.js')

const getUserAll = {
    handler: async (request, reply) => {
        try {
            console.log('test')
            console.log(request.headers.Authorization)
            return reply.response({
                response : 'test'
            })
        }
        catch (e) {
            console.log(e)
        }
    }
}

module.exports = {
    getUserAll
}