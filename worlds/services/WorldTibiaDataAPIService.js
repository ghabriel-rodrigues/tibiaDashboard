'use strict'

const got = require('got')

const URL = process.env.TIBIA_DATA_API_URL

const ENDPOINT = {
  WORLD   : 'world/',
  WORLDS  : 'worlds'
}

/**
 * Contains a set of methods that handles `TibiaData`'s `World` results
 * 
 * @class WorldTibiaDataAPIService
*/
class WorldTibiaDataAPIService {

  /**
   * Returns the `worlds` info
   * @async
   * 
   * @return {Object} The `worlds` info
   * 
   * @see {@link https://tibiadata.com/doc-api-v2/worlds/}
  */
  static async getWorlds() {
    const response = await this._sendRequest(ENDPOINT.WORLDS)

    const worlds = response && response.body ?
      response.body : null

    return worlds
  }

  /**
   * Returns the list of `worlds`
   * @async
   * 
   * @return {Array<Object>} The list of `worlds`
   * 
   * @see {@link https://tibiadata.com/doc-api-v2/worlds/}
  */
  static async getWorldsList() {
    const worlds = await this.getWorlds()

    const worldsList = worlds && worlds.worlds ?
      worlds.worlds.allworlds : []

    return worldsList
  }

  /**
   * Returns the `world`
   * @async
   * 
   * @param {string} name `World`'s name
   * 
   * @return {Object} The `world`
   * 
   * @see {@link https://tibiadata.com/doc-api-v2/worlds/}
  */
  static async getWorld(name) {
    const endpoint = `${ENDPOINT.WORLD}${name}`

    let world = null

    const response = await this._sendRequest(endpoint)

    if (response && response.body)
      world = response.body

    return world
  }
  
  /**
   * Returns the total of `online players`
   * @async
   * 
   * @param {string} name `World`'s name
   * 
   * @return {Number} The total of `online players`
  */
  static async getTotalPlayersOnline(name) {
    let totalPlayersOnline = null

    const world = await this.getWorld(name)

    if (world)
      totalPlayersOnline = world.world.world_information.players_online

    return totalPlayersOnline
  }
  
  /**
   * Sends an request to `endpoint`'s location
   * 
   * @param {string} endpoint The `endpoint`
   * @param {Object} query The `queryString` params
   * 
   * @return {Promise<Object>} The `json` response object
  */
  static _sendRequest(endpoint) {
    return got(`${URL}${endpoint}.json`, { json: true })
  }
}

module.exports = WorldTibiaDataAPIService