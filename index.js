const Hapi = require('@hapi/hapi')
const config = require('./src/config/configuration.js')
const jwtHandler = require('./src/utils/jwt.handler.js')
const forge = require('node-forge')

//Encrypt

// const HashSha256 = (data) => {
//     console.log(data)
//     const hash = forge.md.sha256.create()
//     hash.update(data.key)
//     const new_hash = hash.digest().toHex().substring(0, data.length)
//     return new_hash
// }
// const hash = HashSha256({ key: process.env.SECRET_KEY, length: 30 })
// const Encpty = (data) => {
//     const buffer = new Buffer.from(data)
//     const encryption = new forge.cipher.createCipher('AES-GCM', data)
//     encryption.start({
//         iv: 'iv',
//     });
//     encryption.update(forge.util.createBuffer('test', 'utf-8'));
//     encryption.finish();
//     var encryptedData = encryption.output.data;
//     console.log(encryptedData)
// }
// const result = Encpty(hash)
// console.log('result0', result)




const init = async () => {
    const server = Hapi.server({
        port: config.server.port,
        host: config.server.host,
        routes: config.server.routes
    })
    server.ext('onRequest', function (request, h) {

        return h.continue;
    });
    await server.register(config.register).then((v) => {

    }).catch((e) => {
        console.log(e)
    })
    server.auth.strategy('jwt', 'jwt',
        {
            key: process.env.SECRET_KEY,
            validate: async (request, token, h) => {
                try {
                    const data = await jwtHandler.jwtVerify(token.auth.token, process.env.SECRET_KEY)
                    return {
                        isValid: data.isValid,
                        data: data.data
                    }
                }
                catch (e) {
                    console.log(e)
                }

            }
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