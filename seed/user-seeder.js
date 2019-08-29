/* eslint-disable no-console */
const User = require('../models/user')
const mongoose = require('mongoose')
const config = require("../config/config")

mongoose.Promise = global.Promise
mongoose.connect(`${global.gConfig.DATABASE_URL}/${global.gConfig.DATABASE_NAME}`, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true
})

function exit() {
  console.log('Seeding products collection done!')
  mongoose.disconnect()
}

// drop collections first
User.deleteMany({}, function(err) {
  if (err) {
    console.log('Error')
  }
})

let newUser = new User()
newUser.email = 'cypress_test@gmail.com'
newUser.password = newUser.encryptPassword('test12345')
// eslint-disable-next-line no-unused-vars
newUser.save(function(err, result) {
  exit()
})
