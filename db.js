'use strict'

const mongoose = require('mongoose')

const URL = process.env.NODE_ENV != 'test' ?
  process.env.MONGODB_URL :
  process.env.MONGODB_URL_TEST

let db

module.exports = async () => {
  if (!db || (db && db.connection.readyState == 0))
    db = await mongoose.connect(URL)

  return db
}