'use strict'

const mongoose = require('mongoose')

const genericSchema = require('@contartec/generic-model/lib/models/genericSchema')

const db = require('app/db')

const REQUIRED = { required: true }

const STRING_REQUIRED = {
  ...REQUIRED,
  type: String
}

const SCHEMA = {
  name                : {
    ...STRING_REQUIRED,
    unique: true
  },
  creation_date       : String,
  location            : STRING_REQUIRED,
  pvp_type            : STRING_REQUIRED,
  world_quest_titles  : String,
  battleye_status     : String,
  transfer_type       : String,
  game_world_type     : String,
  online_record       : {}
}

const OPTIONS = {
  _id         : true,
  strict      : true,
  timestamps  : {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

const { GenericModel, GenericSchema } = genericSchema(SCHEMA, OPTIONS, db)

/**
 * Represents the `World` model in `db`
 * 
 * @class World
 * @extends {GenericModel}
 * 
 * @property {string} name
 * @property {string} creation_date
 * @property {string} location
 * @property {string} pvp_type
 * @property {string} battleye_status
 * @property {string} transfer_type
 * @property {string} game_world_type
 * @property {Object} online_record
 * @property {Date} created_at_ds
 * @property {Date} updated_at_ds
*/
class World extends GenericModel {
  
}

GenericSchema
  .loadClass(World)

module.exports = mongoose.model('World', GenericSchema)