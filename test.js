/* global describe, it */

const terminalProcedures = require('./index')

describe('terminalProcedures', () => {
  it('should fetch terminal procedures for a single ICAO', (done) => {
    terminalProcedures('KFDC').then(() => done())
  })

  it('should fetch terminal procedures for an array of ICAOs', (done) => {
    terminalProcedures(['KFDC', 'KZBW']).then(() => done())
  })

  it('should expose the list method', (done) => {
    terminalProcedures.list('KFDC').then(() => done())
  })

  it('should fetch terminal procedures for an array of ICAOs using the list method', (done) => {
    terminalProcedures.list(['KFDC', 'KZBW']).then(() => done())
  })
})
