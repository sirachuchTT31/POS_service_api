const Authentication = require('../authentication/authentication.js')
const Controller = require('../controllers/api.controllers.js')
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
    },
    //API
    {
        method : 'GET',
        path : '/api/users/getall',
        config : Controller.getUserAll
    }
]


module.exports = {
    routers
}