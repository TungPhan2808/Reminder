const jwt = require('jsonwebtoken')

const getToken = user => {
  const { _id, googleId, email, picture, name } = user
  return jwt.sign(
    { _id, googleId, email, picture, name },
    process.env.JWT_SECRET
  )
}

const decodeToken = token => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
  getToken,
  decodeToken,
}
