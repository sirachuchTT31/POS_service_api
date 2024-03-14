const jwt = require('jsonwebtoken')
const jwtAccessToken = (data) => {
    try {
        if (data.username) {
            const accessToken = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: 600000, algorithm: 'HS256' })
            return accessToken
        }
    }
    catch (e) {
    }

}

const jwtDecode = (token) => {
    try {
        const decode = jwt.decode(token)
        return decode
    }
    catch (e) {
        console.log(e)
    }
}

const jwtVerify = async (headers, secretKey) => {
    try {
        const bearer = headers
        const key = secretKey
        console.log('bearer',bearer)
        if (bearer) {
            const verify = jwt.verify(bearer, key, {
                algorithms: ['HS256']
            })
            console.log('verify',verify)
           if(verify){
            return true
           }
        }
        return false
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = {
    jwtAccessToken,
    jwtDecode,
    jwtVerify
}