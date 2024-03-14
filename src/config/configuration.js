const routerPlugin = require('../plugin/routers.js')
const prismaPlugin = require('../plugin/prisma.js')
module.exports = {
    server : {
        port : 3000,
        host : 'localhost'
    },
    register : [
        routerPlugin,
        prismaPlugin
    ]
}