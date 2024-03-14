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
        console.log('secretKey', secretKey)
        if (bearer) {
            let verify = jwt.verify(bearer, key, { algorithms: ['HS256'] })
            if (verify) {
                return {
                    isValid: true,
                    data: verify
                }
            }
        }
        return {
            isValid : false,
            data : {}
        }
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