const Authentication = require('../authentication/authentication.js')

const routers = [
    {
        method: 'POST',
        path: '/api/auth/register',
        config: Authentication.Register
    },
    {
        method: 'POST',
        path: '/api/auth/login',
        config: Authentication.Login
    }
]


module.exports = {
    routers
}