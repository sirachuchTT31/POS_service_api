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

module.exports = {
    connectDB
}