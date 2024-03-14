const { PrismaClient } = require('@prisma/client')
const prismaClient = new PrismaClient()
const verify_auth = require('../authentication/jwt.js')

const getUserAll = {
    // auth: true,
    handler: async (request, reply) => {
        try {
            const bearer = request.headers.authorization
            const verify =await verify_auth.jwtVerify(bearer, 'jwt_kdey_secret_pos')
            console.log(verify)
            return reply.response({
                data: 'test'
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