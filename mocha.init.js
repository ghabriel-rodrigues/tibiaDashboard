'use strict'

require('module-alias/register')
require('dotenv').load()

const mongoose = require('mongoose')
const { spawn } = require('cross-spawn')

let slsOfflineProcess
let isDone = false

before(function (done) {
  clearMongooseCollections()

  this.timeout(8000)

  console.warn('[Serverless Offline Initialization] Start')

  startSlsOffline(function (e) {
    if (!isDone) {
      isDone = true

      if (!e) {
        console.warn('[Serverless Offline Initialization] Done')

        done()
      }
      else
        return done(e)
    }
  })
})

after(function () {
  console.warn('[Serverless Offline Shutdown] Start')

  stopSlsOffline()

  mongoose.disconnect()

  console.warn('[Serverless Offline Shutdown] Done')
})

async function clearMongooseCollections() {
  if (mongoose.connection.readyState === 0)
    await mongoose.connect(process.env.MONGODB_URL_TEST)

  return await clearCollections()
}

async function clearCollections() {
  const promises = []

  for (var collection in mongoose.connection.collections) {
    const promise = mongoose.connection.collections[collection].deleteOne()

    promises.push(promise)
  }

  return Promise.all(promises)
}

function startSlsOffline(done) {
  slsOfflineProcess = spawn('sls', ['offline', 'start', '--skipCacheInvalidation', `--port ${process.env.LOCAL_PORT}`]) 

  console.warn(`Serverless: Offline started with PID : ${slsOfflineProcess.pid}`)

  slsOfflineProcess.stdout.on('data', (data) => {
    if (data.includes('Offline listening on')) {
      console.warn(data.toString().trim())

      done()
    }
  })

  slsOfflineProcess.stderr.on('data', (e, a) => {
    console.warn(`Error starting Serverless Offline:\n${e}\n${a}`)
    done(e)
  })
}

function stopSlsOffline() {
  slsOfflineProcess.kill()

  console.warn('Serverless Offline stopped')
}