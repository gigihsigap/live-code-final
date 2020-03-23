const bcryptjs = require('bcryptjs')

function generatePassword(passInput) {
    console.log('Generate password:')
    const count = 10
    const salt = bcryptjs.genSaltSync(count)
    return bcryptjs.hashSync(passInput, salt)
}

function checkPassword(passInput, passDB) {
    return bcryptjs.compareSync(passInput, passDB)
}

module.exports = {generatePassword, checkPassword}