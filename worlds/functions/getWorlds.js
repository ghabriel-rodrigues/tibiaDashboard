'use strict'

require('module-alias/register')

const middy = require('middy')
const { cors, doNotWaitForEmptyEventLoop } = require('middy/middlewares')

const World = require('worlds/models/World')

/**
 * @api {get} /api/worlds Returns all `Worlds`
 * @apiName getWorlds
 * @apiVersion 0.1.0
 * @apiGroup World
 *
 * @apiParam {Object} The world filters 
 *
 * @apiSuccess {Object} The list of [`Worlds`]{@link World}
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  [
 *    {
 *      name           : 'Calmera',
 *      creation_date  : '2003-04',
 *      location       : 'North America',
 *      ...
 *    },
 *    ...
 *  ]
*/
const main = middy(async event => {
  try {
    const queryParams = event.queryStringParameters

    const worlds = await World
      .find(queryParams)

    return ({
      statusCode  : 200,
      body        : JSON.stringify(worlds)
    })
  }
  catch (e) {
    console
      .error(`[getWorlds] ${event.queryStringParameters}`, {
        error : e.message,
        stack : e.estack
      })

    return ({
      statusCode: e.statusCode || 500
    })
  }
})

main
  .use(cors())
  .use(doNotWaitForEmptyEventLoop())

module.exports = { main }