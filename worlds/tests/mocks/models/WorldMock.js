'use strict'

const GenericMock = require('@contartec/generic-model/tests/mocks/models/GenericMock')

const World = require('worlds/models/World')

/**
 * Mock class for [`World` model]{@link World}
 * 
 * @class WorldMock
 * @extends {GenericMock}
*/
class WorldMock extends GenericMock {
  /**
   * The `mock` class for `GenericMock` usage
   * 
   * @type {World}
  */
  static get MockClass() { return World }

  /**
   * Returns the default mock object
  */
  static getDefaultObject() {
    return {
      name                : `name_${Math.round(Math.random() * 999999)}`,
      creation_date       : `2019-10`,
      location            : `location_${Math.round(Math.random() * 999999)}`,
      pvp_type            : `pvp_type_${Math.round(Math.random() * 999999)}`,
      world_quest_titles  : `world_quest_titles_${Math.round(Math.random() * 999999)}`,
      battleye_status     : `battleye_status_${Math.round(Math.random() * 999999)}`,
      transfer_type       : 'transfer_type',
      game_world_type     : 'game_world_type',
      online_record       : {
        players : Math.round(Math.random() * 999999),
        date    : {
          date          : '2017-12-03 19:10:30.000000',
          timezone_type : 2,
          timezone      : 'CET'
        }
      },
    }
  }
}

module.exports = WorldMock