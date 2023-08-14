const express = require('express')
const router = express.Router()
const { decodeToken } = require('../services/jwt')
const { login } = require('../controllers/authController')
const { StatusCodes } = require('http-status-codes')

router.post('/login', login)

router.get('/login/success', (req, res) => {
  const token = req.cookies.token
  if (token) {
    const payload = decodeToken(token)
    res.status(200).json(payload)
    return
  }
  res.status(StatusCodes.UNAUTHORIZED).json({
    msg: 'unauthorized!',
  })
})

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.status(StatusCodes.OK).json({ msg: 'Logout successfully' })
})

module.exports = router
