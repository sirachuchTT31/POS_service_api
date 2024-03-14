const Hapi = require('@hapi/hapi')
const prismaDB = require('./src/plugin/prisma.js')
const { routers } = require('./src/routers/routers.js')
const config = require('./src/config/configuration.js')
const init = async () => {
    const server = Hapi.server({
        port: config.server.port,
        host: config.server.host
    })
    await server.register(config.register)
    // await server.auth.strategy()
    await server.start().then((v) => {
        console.log(`🚀 Server listening ${server.info.uri}🚀`)
        // prismaDB.connectDB()
    }).catch((e) => {
        console.log(e)
        server.stop()
    })
}

init()