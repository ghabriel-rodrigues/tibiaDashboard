'use strict'

require('dotenv').load()

const chai = require('chai')
const { expect } = require('chai')

const WorldMock = require('worlds/tests/mocks/models/WorldMock')

const RequestMock = require('libs/mocks/RequestMock')

chai
  .use(require('chai-http'))
  .use(require('chai-things'))
  .use(require('chai-shallow-deep-equal'))

describe('getWorlds', () => {
  const URL = '/worlds'

  describe('GET /worlds', () => {
    const PATH = URL

    context('when there are persisted `worlds`', () => {
      context('when `queryString` has `name` attr', () => {
        let worlds, world, response
        
        before(async () => {
          worlds = await WorldMock
            .addMocks()

          world = worlds[0]

          const queryString = {
            name: world.name
          }

          response = await RequestMock.GET(PATH, queryString)
        })

        after(async () => {
          await WorldMock.remove([ ...worlds, world ])
        })

        it('should return the `world`', () => {
          const worldsTemp = [JSON.parse(JSON.stringify(world))]

          expect(response.body).to.shallowDeepEqual(worldsTemp)
        })
      })

      context('when `queryString` is empty', () => {
        let worlds, response
        
        before(async () => {
          worlds = await WorldMock
            .addMocks()

          response = await RequestMock.GET(PATH, {})
        })

        after(async () => {
          await WorldMock.remove(worlds)
        })

        it('should return all `worlds`', () => {
          expect(response.body.map(w => w._id)).to.have.same.members(worlds.map(w => w.id))
        })
      })
    })
      
    context('when there are no persisted `worlds`', () => {
      context('when `queryString` has `name` attr', () => {
        let response

        before(async () => {
          const queryString = {
            name: 'arpel'
          }

          response = await RequestMock.GET(PATH, queryString)
        })

        it('should return an empty `array`', () => {
          expect(response.body).to.have.lengthOf(0)
        })
      })

      context('when `queryString` is empty', () => {
        let response

        before(async () => {
          response = await RequestMock.GET(PATH, {})
        })

        it('should return an empty `array`', () => {
          expect(response.body).to.have.lengthOf(0)
        })
      })
    })
  })
})