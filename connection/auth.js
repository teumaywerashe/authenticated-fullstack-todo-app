const { StatusCodes } = require('http-status-codes')
const User = require('../module/user')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
    // const { UnauthenticatedError } = require('../../final/errors')

const register = async(req, res) => {
    const user = await User.create(req.body)
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ name: user.name, token })

}
const login = async(req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        // res.status(StatusCodes.BAD_REQUEST).send('please provide name and password')
        // throw new BadRequestError('please provide email and password')
        return res.status(401).json({ msg: 'Invalid email or password' });
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(401).json({ msg: 'Invalid email or password' });
        // throw new UnauthenticatedError('invalid cridential')
        // res.status(StatusCodes.NOT_FOUND).send('incorrect email and password')
    }
    const token = user.createJWT()
        // console.log(token)
    const isCorrectPassword = await user.comparePassword(password)
    if (!isCorrectPassword) {
        return res.status(401).json({ msg: 'Invalid email or password' });
    }
    res.status(StatusCodes.OK).json({ name: user.name, token })
}

module.exports = {
    login,
    register
}
module.exports = {
    login,
    register
}