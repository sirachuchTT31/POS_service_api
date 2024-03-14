const Hapi = require('@hapi/hapi')
const config = require('./src/config/configuration.js')
const jwtHandler = require('./src/utils/jwt.handler.js')


const init = async () => {
    const server = Hapi.server({
        port: config.server.port,
        host: config.server.host,
        routes: config.server.routes
    })
    server.ext('onRequest', function (request, h) {
        // console.log(request.info)
        return h.continue;
    });
    await server.register(config.register).then((v) => {

    }).catch((e) => {
        console.log(e)
    })
    server.auth.strategy('jwt', 'jwt',
        {
            validate: async (request, token, h) => {
                console.debug('test',h),
                console.debug('token',token)
                const { isValid, data } = await jwtHandler.jwtVerify(token, process.env.SECRET_KEY)

                const credentials = { token };
                const artifacts = { ...data };

                return { isValid, credentials, artifacts };
            },
        }
    )
    server.auth.default('jwt')
    await server.start().then((v) => {
        console.log(`🚀 Server listening ${server.info.uri}🚀`)
    }).catch((e) => {
        console.log(e)
        server.stop()
    })
}

init()