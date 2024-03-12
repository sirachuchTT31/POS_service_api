const Authentication = require('../authentication/authentication.js')

const routers = [
    {
        method: 'POST',
        path: '/api/auth/register',
        config: Authentication.Register
    }
]


module.exports = {
    routers
}