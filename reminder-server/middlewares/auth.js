const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')

const auth = (req, res, next) => {
  const token = req.cookies.token
  if (!req.cookies.token || !token) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'UNAUTHORIZED' })
    return
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const { _id } = payload
    req.user = { _id }
    next()
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'UNAUTHORIZED' })
  }
}

module.exports = auth
