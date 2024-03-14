const routerPlugin = require('../plugin/routers.js')
const prismaPlugin = require('../plugin/prisma.js')
const hapi_bearer = require('hapi-auth-bearer-token');
const Jwt = require('hapi-auth-jwt2');
const inert = require('@hapi/inert')
const Basic = require('@hapi/basic');
module.exports = {
    server: {
        port: 3000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
                credentials: true,
                additionalHeaders: ['Access-Control-Allow-Origin', 'Access-Control-Request-Method', 'Access-Control-Allow-Methods']
            }
        }
    },
    register: [
        routerPlugin,
        prismaPlugin,
        hapi_bearer,
        Jwt,
        inert,
        Basic
    ]
}