'use strict'

const World = require('worlds/models/World')

const WorldTibiaDataAPIService = require('worlds/services/WorldTibiaDataAPIService')

/**
 * Handles the `save` routines for [`Worlds`]{@link World}
 * 
 * @class WorldSaveService
*/
class WorldSaveService {

  /**
   * Syncs the `worlds`
   * @async
   * 
   * @return {Array<Object>} The list of saved `worlds`
   * 
   * @see {@link https://tibiadata.com/doc-api-v2/worlds/}
  */
  static async sync() {
    const worldsList = await WorldTibiaDataAPIService
      .getWorldsList()

    let savedWorlds = []

    if (worldsList.length > 0) {
      const worlds = worldsList
        .map(this.parseObject)
  
      savedWorlds = await this
        .saveWorlds(worlds)
    }
    
    return savedWorlds
  }

  /**
   * Saves the `worlds`
   * @async
   * 
   * @param {Array<World>} worlds The list of `worlds`
   * 
   * @return {Array<Object>} The list of inserted `worlds`
  */
  static async saveWorlds(worlds) {
    const promises = worlds
      .map(w => {
        const filterParams = {
          name: w.name
        }

        const options = {
          upsert: true,
          new   : true
        }

        return World
          .findOneAndUpdate(filterParams, w, options)
      })

    return await Promise.all(promises)
  }

  /**
   * Parses the `world` object from [API response]{@link https://tibiadata.com/doc-api-v2/worlds} to [`World`]{@link World} model
   * 
   * @param {Object} worldObject The `world` object from [API response]{@link https://tibiadata.com/doc-api-v2/worlds}
   * 
   * @return {World} The `World` model
  */
  static parseObject(worldObject) {
    const worldObjectTemp = { ...worldObject }

    const world = {
      ...worldObjectTemp,
      pvp_type: worldObjectTemp.pvp_type
        || worldObjectTemp.worldtype
    }

    return world
  }

  /**
   * Parses the `world` object from [API response]{@link https://tibiadata.com/doc-api-v2/worlds} to [`World`]{@link World} model
   * 
   * @param {Object} worldObject The `world` object from [API response]{@link https://tibiadata.com/doc-api-v2/worlds}
   * 
   * @return {World} The `World` model
  */
  static parse(worldObject) {
    const worldObjectTemp = this.parseObject(worldObject)

    const world = new World(worldObjectTemp)

    return world
  }
}

module.exports = WorldSaveService