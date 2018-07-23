const terminalProcedures = require('./')

terminalProcedures.list('PANC').then(results => {
  console.log(results)
  const out = results.map(tp => {
    return {
      name: tp.procedure.name,
      type: tp.type,
      url: tp.procedure.url
    }
  })
  console.log(
    JSON.stringify(
      {
        documents: {
          terminalProcedures: [out]
        }
      },
      null,
      2
    )
  )
})
