const terminalProcedures = require('./')

terminalProcedures.list('KBRO').then(results => {
  const out = results.map(tp => {
    return {
      name: tp.procedure.name,
      type: tp.type,
      url: tp.procedure.url
    }
  })
  console.log(JSON.stringify({
    documents: {
      terminalProcedures: [
        out
      ]
    }
  }, null, 2))
})
