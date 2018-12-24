const cheerio = require('cheerio')
const superagent = require('superagent')

const BASE_URL =
  'https://www.faa.gov/air_traffic/flight_info/aeronav/digital_products/dtpp/search'

/**
 *  A shortcut to the list() method
 */
const terminalProcedures = (module.exports = (icaos, options = {}) => {
  return terminalProcedures.list(icaos, options)
})

/**
 * Main fetching method; accepts one or more ICAO codes
 */
terminalProcedures.list = (icaos, options = {}) => {
  if (Array.isArray(icaos)) {
    return Promise.all(icaos.map(listOne))
  }
  return listOne(icaos)
}

/**
 * Fetch the current diagrams distribution cycle numbers (.e.g, 1813)
 */
const fetchCurrentCycle = (terminalProcedures.fetchCurrentCycle = async () => {
  const response = await superagent.get(BASE_URL)
  const $ = cheerio.load(response.text)
  return $('select#cycle > option:contains(Current)').val()
})

/**
 * Using the current cycle, fetch the terminal procedures for a single ICAO code
 */
const listOne = async icao => {
  const searchCycle = await fetchCurrentCycle()
  let procedures = []
  let lastPageFetched = 0
  let lastNumFetched = 1
  while (lastNumFetched > 0) {
    const page = await superagent
      .get(
        `${BASE_URL}/results/?cycle=${searchCycle}&ident=${icao}&sort=type&dir=asc&page=${lastPageFetched +
          1}`
      )
      .then(res => parse(res.text))
    if (page) {
      lastNumFetched = page.length
      lastPageFetched += 1
      procedures = procedures.concat(page)
    } else {
      break
    }
  }
  return procedures
}

/**
 * Parsing helper methods
 */
const text = ($row, columnIndex) =>
  $row
    .find(`td:nth-child(${columnIndex})`)
    .text()
    .trim()

const link = ($row, columnIndex) =>
  $row
    .find(`td:nth-child(${columnIndex})`)
    .find('a')
    .attr('href')

const extractRow = $row => {
  const type = text($row, 7)

  if (!type) {
    return null
  }

  return {
    state: text($row, 1),
    city: text($row, 2),
    airport: text($row, 3),
    ident: text($row, 4),
    vol: text($row, 5),
    flag: text($row, 6),
    type,
    procedure: {
      name: text($row, 8),
      url: link($row, 8)
    },
    compare: {
      name: text($row, 9),
      url: link($row, 9)
    }
  }
}

/**
 *  Parse the response HTML into JSON
 */
const parse = html => {
  const $ = cheerio.load(html)
  const $resultsTable = $('#resultsTable')

  if (!$resultsTable.html()) {
    console.error('Unable to parse the #resultsTable page element')
    return null
  }

  const results = $resultsTable
    .find('tr')
    .toArray()
    .map(row => extractRow($(row)))
    .filter(x => !!x)

  if (results.length > 0) {
    return results
  }
}
