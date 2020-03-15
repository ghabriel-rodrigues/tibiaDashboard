'use strict'

const rewire = require('rewire')
const { expect } = require('chai')

const WorldSaveService = rewire('worlds/services/WorldSaveService')

const World = require('worlds/models/World')

const WorldMock = require('worlds/tests/mocks/models/WorldMock')
const SpyMock = require('libs/mocks/SpyMock')

describe('WorldSaveService', () => {
  describe('.sync', () => {
    context('when `worldsList` has itens', () => {
      let worldsList, worlds

      before(async () => {
        worlds = WorldMock
          .getMocks()
          .map(w => w.toJSON())

        SpyMock
          .addDependencySpy(WorldSaveService, 'WorldTibiaDataAPIService.getWorldsList', worlds)

        worldsList = await WorldSaveService
          .sync()
      })

      after(async () => {
        await WorldMock.remove(worlds)

        SpyMock.restoreAll()
      })

      it('should return the list of inserted `worlds`', () => {
        expect(worldsList).to.have.lengthOf(worlds.length)
      })

      it('should save the `worlds`', async () => {
        const worldsTemp = await World
          .getAll({
            name_in: worlds.map(w => w.name)
          })

        expect(worldsList.map(w => w.name)).to.have.same.members(worldsTemp.map(w => w.name))
      })
    })

    context('when `worldsList` has no itens', () => {
      let worldsList

      before(async () => {
        SpyMock
          .addDependencySpy(WorldSaveService, 'WorldTibiaDataAPIService.getWorldsList', [])

        worldsList = await WorldSaveService
          .sync()
      })

      after(async () => SpyMock.restoreAll())

      it('should return an empty `array`', () => {
        expect(worldsList).to.have.lengthOf(0)
      })
    })
  })

  describe('.parse', () => {
    context('when `world` is not `null`', () => {
      context('when `pvp_type` is not `null`', () => {
        const worldObject = {
          pvp_type  : 'Open PVP',
          worldtype : 'Hardcore PVP'
        }

        let world

        before(() => {
          world = WorldSaveService
            .parse(worldObject)
        })

        it('should return an instance of `World`', () => {
          expect(world).to.be.instanceOf(World)
        })

        it('should set `pvp_type`', () => {
          expect(world.pvp_type).to.eql(worldObject.pvp_type)
        })
      })
      
      context('when `pvp_type` is `null`', () => {
        context('when `worldtype` is not `null`', () => {
          const worldObject = {
            worldtype: 'Hardcore PVP'
          }
  
          let world
  
          before(() => {
            world = WorldSaveService
              .parse(worldObject)
          })
  
          it('should return an instance of `World`', () => {
            expect(world).to.be.instanceOf(World)
          })
  
          it('should set `pvp_type`', () => {
            expect(world.pvp_type).to.eql(worldObject.worldtype)
          })
        })

        context('when `worldtype` is `null`', () => {
          const worldObject = {
            name: 'Demona'
          }
  
          let world
  
          before(() => {
            world = WorldSaveService
              .parse(worldObject)
          })
  
          it('should return an instance of `World`', () => {
            expect(world).to.be.instanceOf(World)
          })
  
          it('should not set `pvp_type`', () => {
            expect(world.pvp_type).to.not.exist
          })
        })
      })
    })
  })
})