const { PrismaClient } = require('@prisma/client')
const prismaClient = new PrismaClient()

const connectDB = async () => {
    try {
        prismaClient.$connect().then((v) => {
            console.log("connect db success !")
        }).catch((e) => {
            prismaClient.$disconnect()
        })
    }
    catch (e) {
        
    }
}

const plugin = {
    plugin : {
        name : 'prisma',
        version : '1.0.0',
        register : connectDB
    }
}

module.exports = {
    plugin
}