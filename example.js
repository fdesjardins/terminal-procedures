const terminalProcedures = require('./')

terminalProcedures.list('KLOL').then(results => {
  console.log(JSON.stringify(results, null, 2))
})
