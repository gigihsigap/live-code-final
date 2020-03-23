const jwt = require('jsonwebtoken')

function generateToken(payload) {
    console.log('Generate token')
    return jwt.sign(payload, process.env.JWT_SECRET)
}

function verifyToken(token) {
    console.log('Verify token')
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {generateToken, verifyToken}