const cheerio = require('cheerio')
const superagent = require('superagent')

const BASE_URL =
  'https://www.faa.gov/air_traffic/flight_info/aeronav/digital_products/dtpp/search'

// For some reason the server takes forever to respond without this request header
const ACCEPT = 'text/html'

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
  const response = await superagent
    .get(BASE_URL)
    .set('Accept', ACCEPT)

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
      .set('Accept', ACCEPT)
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

/**
 * Extract the relevant information from the dom node and return
 * an object with the data mapped by the appropriate named key
 * @param {HTMLNode} $row - The dom node that contains the tabular data
 * @param {String} effectiveStartDate - The start date the terminal procedure is effective for 
 * @param {HTMLNode} effectiveEndDate - The end date the terminal procedure is effective for
 */
const extractRow = ($row, effectiveStartDate, effectiveEndDate) => {
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
    },
    effectiveStartDate,
    effectiveEndDate
  }
}

/**
 * Scrape the Effective date range from the dom
 * @param {Object} $ - The Cheerio object that contains the serialized dom
 * @returns {Object} - An object containing the effective start and end date
 */
const extractEffectiveDates = $ => {
  const baseEffectiveDateString = $('.resultsSummary .join').html()
  .split(':')[1]
  .split('<')[0]
  .trim()

  const [ startMonthDay, remainder ] = baseEffectiveDateString.split('-')
  const [ endMonthDay, yearAndCycle ] = remainder.split(',')
  const [ year, _ ] = yearAndCycle.split('[')
  return {
    effectiveStartDate: new Date(`${startMonthDay.trim()} ${year}`),
    effectiveEndDate: new Date(`${endMonthDay.trim()} ${year}`)
  }
}

/**
 * Parse the response HTML into JSON
 * @param {string} html 
 * @returns {Array[Object]}
 */
const parse = html => {
  const $ = cheerio.load(html)
  const $resultsTable = $('#resultsTable')

  if (!$resultsTable.html()) {
    console.error('Unable to parse the #resultsTable page element')
    return null
  }

  const { effectiveStartDate, effectiveEndDate } = extractEffectiveDates($)

  const results = $resultsTable
    .find('tr')
    .toArray()
    .map(row => extractRow($(row), effectiveStartDate, effectiveEndDate))
    .filter(x => !!x)

  if (results.length > 0) {
    return results
  }
}
