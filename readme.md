# terminal-procedures

Fetch the latest terminal procedures information from https://www.faa.gov/

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage][coveralls-image]][coveralls-url]
[![Maintainability][code-climate-image]][code-climate-url]

## Installation

```
$ npm install --save terminal-procedures
```

## Usage

```js
const terminalProcedures = require('./')

terminalProcedures.list('KBRO').then(results => {
  console.log(JSON.stringify(results, null, 2))
})
```

### Output

```json
{
  "documents": {
    "terminalProcedures": [
      [
        {
          "name": "AIRPORT DIAGRAM (PDF)",
          "type": "APD",
          "url": "http://aeronav.faa.gov/d-tpp/1707/00061ad.pdf#nameddest=(BRO)"
        },
        {
          "name": "ILS OR LOC RWY 13 (PDF)",
          "type": "IAP",
          "url": "http://aeronav.faa.gov/d-tpp/1707/00061il13.pdf#nameddest=(BRO)"
        },
        {
          "name": "RNAV (GPS) RWY 13 (PDF)",
          "type": "IAP",
          "url": "http://aeronav.faa.gov/d-tpp/1707/00061r13.pdf#nameddest=(BRO)"
        },
        {
          "name": "RNAV (GPS) RWY 18 (PDF)",
          "type": "IAP",
          "url": "http://aeronav.faa.gov/d-tpp/1707/00061r18.pdf#nameddest=(BRO)"
        },
        {
          "name": "LOC BC RWY 31 (PDF)",
          "type": "IAP",
          "url": "http://aeronav.faa.gov/d-tpp/1707/00061lbc31.pdf#nameddest=(BRO)"
        },
        {
          "name": "VOR OR TACAN-A (PDF)",
          "type": "IAP",
          "url": "http://aeronav.faa.gov/d-tpp/1707/00061vta.pdf#nameddest=(BRO)"
        },
        {
          "name": "LAHSO (PDF)",
          "type": "LAH",
          "url": "http://aeronav.faa.gov/d-tpp/1707/sc3lahso.pdf#nameddest=(BRO)"
        },
        {
          "name": "TAKEOFF MINIMUMS (PDF)",
          "type": "MIN",
          "url": "http://aeronav.faa.gov/d-tpp/1707/sc3to.pdf#nameddest=(BRO)"
        },
        {
          "name": "ALTERNATE MINIMUMS (PDF)",
          "type": "MIN",
          "url": "http://aeronav.faa.gov/d-tpp/1707/sc3alt.pdf#nameddest=(BRO)"
        }
      ]
    ]
  }
}
```

## API

### `terminalProcedures(icaos)`

### `terminalProcedures.list(icaos)`

#### `icaos`

Type: `string` or `array`

One of the following:

- a single ICAO code
- an array of ICAO codes

### `terminalProcedures.fetchCurrentCycle()`

Fetch the current diagrams distribution cycle numbers (.e.g, 1813)

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[npm-url]: https://www.npmjs.com/package/terminal-procedures
[npm-image]: https://img.shields.io/npm/v/terminal-procedures.svg?style=flat
[travis-url]: https://travis-ci.org/fdesjardins/terminal-procedures
[travis-image]: https://img.shields.io/travis/fdesjardins/terminal-procedures.svg?style=flat
[coveralls-url]: https://coveralls.io/r/fdesjardins/terminal-procedures
[coveralls-image]: https://img.shields.io/coveralls/fdesjardins/terminal-procedures.svg?style=flat
[code-climate-url]: https://codeclimate.com/github/fdesjardins/terminal-procedures/maintainability
[code-climate-image]: https://api.codeclimate.com/v1/badges/62235bf632b6f023b461/maintainability
