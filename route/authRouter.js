const express = require('express')
const router = express.Router()

const {
    register,
    login
} = require('../connection/auth')

router.route('/auth/register').post(register)
router.route('/auth/login').post(login)
module.exports = router