const {routers} = require('../routers/routers.js')
module.exports = {
    plugin: {
        name: 'router',
        version: '1.0.0',
        register: (server) => {
            routers?.forEach((path) => server.route(path))
        }
    }
}