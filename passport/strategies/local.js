const User = require('../../db/models/user')
const { Strategy } = require('passport-local')

async function localHandler (email, password, done) {
  const message = 'Invalid credentials!'

  try {
    const user = await User.findOne({ 'local.email': email })

    if (!user) {
      done(null, false, { message })
    } else if (!await user.checkPassword(password)) {
      done(null, false, { message })
    } else {
      done(null, user)
    }
  } catch (err) {
    console.error(err)
    done(err)
  }
}

module.exports = new Strategy({ usernameField: 'email' }, localHandler)
