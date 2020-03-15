'use strict'

const chai = require('chai')

chai.use(require('chai-http'))

const DEFAULT_URL = `http://localhost:${process.env.LOCAL_PORT}/api`

/**
 * Contains a set of (`chai`) `http` request methods
 * @class
*/
class RequestMock {
  /**
   * Default `URL` used for all methods (`baseUrl`)
   * 
   * @type {string}
   * @default `http://localhost:${process.env.LOCAL_PORT}/api`
  */
  static get DEFAULT_URL() { return DEFAULT_URL }

  /**
   * Sends an `GET` `HTTP` request
   * 
   * @param {string} path The `endpoint`'s path
   * @param {Object} [queryString = {}] The `queryString` params
   * @param {string} [baseUrl = RequestMock.DEFAULT_URL] The base `URL`
   * 
   * @return {Promise} The `HTTP` _response_
  */
  static GET(path, queryString = {}, baseUrl = DEFAULT_URL) {
    return chai
      .request(baseUrl)
      .get(path)
      .query(queryString)
  }
}

module.exports = RequestMock