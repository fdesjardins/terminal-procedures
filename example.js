const terminalProcedures = require('./')

terminalProcedures.list(['PANC', 'PADK']).then(results => {
  console.log(JSON.stringify(results, null, 2))
})
