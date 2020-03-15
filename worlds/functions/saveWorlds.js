'use strict'

require('module-alias/register')

const WorldSaveService = require('worlds/services/WorldSaveService')

/**
 * @apiName getNearest
 * @apiVersion 0.1.0
 * @apiGroup World
 *
 * @apiParam {World} The world filters 
 *
 * @apiSuccess {Object} The list of [`Worlds`]{@link World}
 *
 * @apiSuccessExample Success-Response:
 *  [
 *    {
 *      name           : 'Calmera',
 *      creation_date  : '2003-04',
 *      location       : 'North America',
 *      ...
 *    }
 *    ...
 *  ]
*/
const main = async event => {
  try {
    console.warn(`[saveWorlds] ${new Date()} init`)

    const worlds = await WorldSaveService
      .sync()

    console.warn(`[saveWorlds] ${new Date()} finish ${worlds.length}`)

    return ({
      worlds
    })
  }
  catch (e) {
    console
      .error(`[getWorlds] ${event.queryStringParameters}`, {
        error : e.message,
        stack : e.estack
      })

    return ({ e })
  }
}

module.exports = { main }