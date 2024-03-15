const Authentication = require('../utils/authentication.js')
const Controller = require('../controllers/api.controllers.js')
const { jwtVerify } = require('../utils/jwt.handler.js')
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
        method: 'POST',
        path: '/api/users/create',
        config: Controller.CreateUser,
    },
    {
        method : 'POST',
        path : '/api/users/updatetheme',
        config : Controller.UpdateTheme
    }
]


module.exports = {
    routers
}