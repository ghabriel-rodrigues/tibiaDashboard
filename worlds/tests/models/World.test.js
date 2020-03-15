'use strict'

const chai = require('chai')
const { expect } = require('chai')

const World = require('worlds/models/World')

const WorldMock = require('worlds/tests/mocks/models/WorldMock')

chai
  .use(require('chai-as-promised'))
  .use(require('chai-shallow-deep-equal'))

describe('World', () => {
  describe('#save', () => {
    context('when `world` is valid', () => {
      let world

      before(async () => {
        world = WorldMock.getMock()

        await world.save()
      })

      after(async () => await WorldMock.remove(world))

      it('should save the `world`', async () => {
        const worldTemp = await World
          .findById(world.get('_id'))

        expect(worldTemp.get('_id')).to.exist
      })
    })

    context('when `world` is invalid', () => {
      let world, expectionFunction

      before(async () => {
        world = WorldMock
          .getMock({
            name: null
          })

        expectionFunction = async () => await world.save()
      })

      it('should return an `exception`', () => {
        return expect(expectionFunction()).to.be.rejectedWith(Error)
      })

      it('should not save the `world`', async () => {
        const worldTemp = await World
          .findById(world.get('_id'))

        expect(worldTemp).to.not.exist
      })
    })
  })

  describe('.find', () => {
    context('when filtered by `name`', () => {
      const LOCATION = 'Arpel World'

      let worlds, defaultFilterParams

      before(async () => {
        worlds = await WorldMock
          .addMocks({
            location: LOCATION
          })

        worlds = await World
          .find(defaultFilterParams)

        defaultFilterParams = { 
          location: LOCATION
        }
      })

      after(async () => await WorldMock.remove(worlds))

      it('should return the list of `worlds`', async () => {
        const worldsTemp = await World
          .find(defaultFilterParams)

        expect(JSON.parse(JSON.stringify(worldsTemp))).to.deep.equal(JSON.parse(JSON.stringify(worlds)))
      })
    })
  })

  describe('.findOne', () => {
    context('when filtered by `name`', () => {
      const ATTR_FILTER_NAME = 'name'
      const DEFAULT_PARAMS = {
        transfer_type: 'Arpel World'
      }

      let worlds, world

      before(async () => {
        worlds = await WorldMock
          .addMocks(DEFAULT_PARAMS)

        world = worlds[0]
      })

      after(async () => await WorldMock.remove(worlds))

      it('should return the `world`', async () => {
        const params = {
          ...DEFAULT_PARAMS,
          [ATTR_FILTER_NAME]: world[ATTR_FILTER_NAME]
        }

        const worldTemp = await World
          .findOne(params)

        expect(JSON.parse(JSON.stringify(worldTemp))).to.shallowDeepEqual(JSON.parse(JSON.stringify(world.toJSON())))
      })
    })
  })
})