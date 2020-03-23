const {} = require('../models')
const {verifyToken} = require('../helpers/jsonwebtoken.js')

function authentication(req, res, next) {
    try {
        let decoded = verifyToken(req.headers.token)
        req.userData = decoded
        next()
    } catch(err) {
        next(err)
    }
}

function authorization(req, res, next) {
    
}

module.exports = {authentication, authorization}