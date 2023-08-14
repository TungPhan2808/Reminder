const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const Users = require('../models/User')

passport.serializeUser((user, done) => {
  done(null, user.googleId)
})

passport.deserializeUser(async (id, done) => {
  try {
    var user = await Users.findOne({ googleId: id })
    done(null, user)
  } catch (err) {
    done(err)
  }
})

module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, cb) => {
    const {
      _json: { sub, email, picture, name },
    } = profile
    try {
      const user = await Users.findOne({
        googleId: sub,
      })
      if (user) {
        return cb(null, user)
      } else {
        const user = await Users.create({
          googleId: sub,
          email: email,
          picture: picture,
          name: name,
        })

        return cb(null, user)
      }
    } catch (error) {
      return cb(error)
    }
  }
)
