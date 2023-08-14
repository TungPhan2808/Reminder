const { StatusCodes } = require('http-status-codes')
const Users = require('../models/User')
const { getToken } = require('../services/jwt')

const login = async (req, res) => {
  const { googleId } = req.body
  try {
    const userExisted = await Users.findOne({
      googleId: googleId,
    })
    let newUser
    if (!userExisted) {
      newUser = await Users.create(req.body)
    }
    const user = userExisted || newUser
    const token = getToken(user)
    res.cookie('token', token, { maxAge: 86400000 })
    res.status(StatusCodes.OK).json({ user, token })
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'UNAUTHORIZED' })
  }
}

module.exports = { login }
