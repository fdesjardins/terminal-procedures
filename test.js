/* global describe, it */

const assert = require('chai').assert
const terminalProcedures = require('./index')

describe('terminalProcedures', () => {
  it('should fetch terminal procedures for a single ICAO', () => {
    return terminalProcedures('PANC').then(procedures => {
      assert(procedures)
    })
  })

  it('should fetch terminal procedures for an array of ICAOs', () => {
    return terminalProcedures(['PANC', 'KSFO']).then(procedures => {
      assert(procedures.length === 2)
      procedures.map(assert)
    })
  })

  it('should expose the list method', () => {
    return terminalProcedures.list('PANC')
  })

  it('should fetch terminal procedures for an array of ICAOs using the list method', () => {
    return terminalProcedures.list(['PANC', 'KSFO']).then(procedures => {
      assert(procedures.length === 2)
      procedures.map(assert)
    })
  })
})
