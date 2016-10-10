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
airportDiagrams.list(['PANC', 'PADK']).then(results => {
  console.log(JSON.stringify(results, null, 2))
})
```

### Output

```
[
  [
    {
      "state": "AK",
      "city": "ANCHORAGE",
      "airport": "TED STEVENS ANCHORAGE INTL",
      "ident": "ANC (PANC)",
      "vol": "N/A",
      "flag": "",
      "type": "AHS",
      "procedure": {
        "name": "A/FD HOT SPOT (PDF)",
        "url": "http://aeronav.faa.gov/afd/15Sep2016/ak_hotspot.pdf"
      },
      "compare": {
        "name": "N/A"
      }
    },
    {
      "state": "AK",
      "city": "ANCHORAGE",
      "airport": "TED STEVENS ANCHORAGE INTL",
      "ident": "ANC (PANC)",
      "vol": "AK-1",
      "flag": "",
      "type": "APD",
      "procedure": {
        "name": "AIRPORT DIAGRAM (PDF)",
        "url": "http://aeronav.faa.gov/d-tpp/1610/01500ad.pdf#search=PANC"
      },
      "compare": {
        "name": "N/A"
      }
    },
    ...
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
