const {User} = require('../models')
const {generateToken} = require('../helpers/jsonwebtoken.js')
const {checkPassword} = require('../helpers/bcryptjs.js')

class Controller {

    static register(req, res, next) {
        const obj = {
            username: req.body.username,
            password: req.body.password,
        }
        User.create(obj)
        .then((data) => {
            res.status(201).json(data)
        })
        .catch(next)
    }

    static login(req, res, next) {
        const obj = {
            username: req.body.username,
            password: req.body.password,
        }
        const option = { where: { username: obj.username }}
        if (!obj.username) throw { status: 400, message: 'Please insert your username!'}
        if (!obj.password) throw { status: 400, message: 'Please insert your password!'}
        User.findOne(option)
        .then((current) => {
            if (!current) throw { status: 400, message: 'Wrong email/password!'}

            let passInput = obj.password
            let passDB = current.password
            let compare = checkPassword(passInput, passDB)

            if (!compare) throw { status: 400, message: 'Wrong email/password!'}

            let payload = {
                id: current.id,
                username: current.username,
            }
            let token = generateToken(payload)
            let data = {
                token: token,
                id: current.id,
                username: current.username,
            }
            res.status(200).json(data)
        })
        .catch(next)
    }
}

module.exports = Controller