const Hapi = require('@hapi/hapi')
const prismaDB = require('./src/plugin/prisma.js')
const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    })
    await server.start().then((v) => {
        console.log(`🚀 Server listening ${server.info.uri}🚀`)
         prismaDB.connectDB()
    }).catch((e) => {
        console.log(e)
        server.stop()
    })
}

init()