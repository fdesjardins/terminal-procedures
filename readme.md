# terminal-procedures

[![Build Status][travis-image]][travis-url]
[![NPM Version][npm-image]][npm-url]
[![Coverage][coveralls-image]][coveralls-url]

Fetch the latest terminal procedures information from https://www.faa.gov/

## Installation

```
$ npm install --save terminal-procedures
```

## Usage

```js
const terminalProcedures = require('./')

terminalProcedures.list('KLOL').then(results => {
  console.log(JSON.stringify(results, null, 2))
})
```

### Output

```json
[
  {
    "state": "NV",
    "city": "LOVELOCK",
    "airport": "DERBY FIELD",
    "ident": "LOL (KLOL)",
    "vol": "SW-4",
    "flag": "",
    "type": "IAP",
    "procedure": {
      "name": "GPS RWY 02 (PDF)",
      "url": "http://aeronav.faa.gov/d-tpp/1701/00941g2.pdf#search=KLOL"
    },
    "compare": {
      "name": "N/A"
    }
  },
  {
    "state": "NV",
    "city": "LOVELOCK",
    "airport": "DERBY FIELD",
    "ident": "LOL (KLOL)",
    "vol": "SW-4",
    "flag": "",
    "type": "IAP",
    "procedure": {
      "name": "VOR/DME OR GPS-A (PDF)",
      "url": "http://aeronav.faa.gov/d-tpp/1701/00941vdga.pdf#search=KLOL"
    },
    "compare": {
      "name": "N/A"
    }
  },
  {
    "state": "NV",
    "city": "LOVELOCK",
    "airport": "DERBY FIELD",
    "ident": "LOL (KLOL)",
    "vol": "SW-4",
    "flag": "",
    "type": "MIN",
    "procedure": {
      "name": "TAKEOFF MINIMUMS (PDF)",
      "url": "http://aeronav.faa.gov/d-tpp/1701/sw4to.pdf#search=KLOL"
    },
    "compare": {
      "name": "N/A"
    }
  },
  {
    "state": "NV",
    "city": "LOVELOCK",
    "airport": "DERBY FIELD",
    "ident": "LOL (KLOL)",
    "vol": "SW-4",
    "flag": "",
    "type": "MIN",
    "procedure": {
      "name": "ALTERNATE MINIMUMS (PDF)",
      "url": "http://aeronav.faa.gov/d-tpp/1701/sw4alt.pdf#search=KLOL"
    },
    "compare": {
      "name": "N/A"
    }
  }
]
```

## API

### `terminalProcedures(icaos)`
### `terminalProcedures.list(icaos)`

#### `icaos`

Type: `string` or `array`

One of the following:
- a single ICAO code
- an array of ICAO codes

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[npm-url]: https://www.npmjs.com/package/terminal-procedures
[npm-image]: https://img.shields.io/npm/v/terminal-procedures.svg?style=flat
[travis-url]: https://travis-ci.org/fdesjardins/terminal-procedures
[travis-image]: https://img.shields.io/travis/fdesjardins/terminal-procedures.svg?style=flat
[coveralls-url]: https://coveralls.io/r/fdesjardins/terminal-procedures
[coveralls-image]: https://img.shields.io/coveralls/fdesjardins/terminal-procedures.svg?style=flat
