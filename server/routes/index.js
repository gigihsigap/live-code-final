const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController.js')
const caseController = require('../controllers/caseController.js')

const {authentication, authorization} = require('../middlewares/auth.js')

router.post('/register', userController.register)
router.post('/login', userController.login)

router.get('/countries', authentication, caseController.findAllCountries)
router.get('/reports', authentication, caseController.findAllReports)
router.post('/reports', authentication, caseController.createReport)
router.delete('/reports/:id', authentication, caseController.deleteReport)

module.exports = router