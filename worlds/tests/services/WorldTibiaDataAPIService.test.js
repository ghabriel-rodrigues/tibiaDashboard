'use strict'

const { expect } = require('chai')

const WorldTibiaDataAPIService = require('worlds/services/WorldTibiaDataAPIService')

const tibiaDataAPIWorlds = require('worlds/tests/fixtures/tibiaDataAPIWorld.fixture')
const tibiaDataAPIWorldNotFound = require('worlds/tests/fixtures/tibiaDataAPIWorldNotFound.fixture')

const WorldMock = require('worlds/tests/mocks/models/WorldMock')
const SpyMock = require('libs/mocks/SpyMock')

describe('WorldTibiaDataAPIService', () => {
  describe('.getWorldsList', () => {
    context('when `worlds` has itens', () => {
      let worlds, worldsList

      before(async () => {
        worlds = WorldMock
          .getMocks()
          .map(w => w.toJSON())

        const worldsObject = {
          worlds: {
            allworlds: worlds
          }
        }

        SpyMock
          .addReturnSpy(WorldTibiaDataAPIService, 'getWorlds', worldsObject)

        worldsList = await WorldTibiaDataAPIService
          .getWorldsList()
      })

      after(() => SpyMock.restoreAll())

      it('should return the list of `worlds`', () => {
        expect(worldsList).to.shallowDeepEqual(worlds)
      })
    })

    context('when `worlds` has no itens', () => {
      let worldsList

      before(async () => {
        const worldsObject = {
          worlds: {
            allworlds: []
          }
        }

        SpyMock
          .addReturnSpy(WorldTibiaDataAPIService, 'getWorlds', worldsObject)

        worldsList = await WorldTibiaDataAPIService
          .getWorldsList()
      })

      after(() => SpyMock.restoreAll())

      it('should return an empty `array`', () => {
        expect(worldsList).to.have.lengthOf(0)
      })
    })

    context('when `worlds` is `null`', () => {
      let worldsList

      before(async () => {
        SpyMock
          .addReturnSpy(WorldTibiaDataAPIService, 'getWorlds', null)

        worldsList = await WorldTibiaDataAPIService
          .getWorldsList()
      })

      after(() => SpyMock.restoreAll())

      it('should return an empty `array`', () => {
        expect(worldsList).to.have.lengthOf(0)
      })
    })
  })

  describe('.getTotalPlayersOnline', () => {
    context('when `world` is found', () => {
      let totalPlayersOnline

      before(async () => {
        const worldName = tibiaDataAPIWorlds.world.world_information.name

        SpyMock
          .addReturnSpy(WorldTibiaDataAPIService, 'getWorld', tibiaDataAPIWorlds)

        totalPlayersOnline = await WorldTibiaDataAPIService
          .getTotalPlayersOnline(worldName)
      })

      after(() => SpyMock.restoreAll())

      it('should return the total of online players', () => {
        expect(totalPlayersOnline).to.eql(tibiaDataAPIWorlds.world.world_information.players_online)
      })
    })

    context('when `world` is not found', () => {
      let totalPlayersOnline

      before(async () => {
        const worldName = 'arpel'

        SpyMock
          .addReturnSpy(WorldTibiaDataAPIService, 'getWorld', tibiaDataAPIWorldNotFound)

        totalPlayersOnline = await WorldTibiaDataAPIService
          .getTotalPlayersOnline(worldName)
      })

      after(() => SpyMock.restoreAll())

      it('should return `null`', () => {
        expect(totalPlayersOnline).to.not.exist
      })
    })
  })
})