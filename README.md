# SATCAT (Satellite Catalogue)
[![npm](https://img.shields.io/npm/v/satcat.svg?style=flat-square)](https://npmjs.com/package/satcat)
[![npm license](https://img.shields.io/npm/l/satcat.svg?style=flat-square)](https://npmjs.com/package/satcat)
[![npm downloads](https://img.shields.io/npm/dm/satcat.svg?style=flat-square)](https://npmjs.com/package/satcat)
[![build status](https://img.shields.io/travis/jhermsmeier/node-satcat/master.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-satcat)

- Format definition: http://www.celestrak.com/satcat/satcat-format.asp
- Raw data (approx. 5MB): http://www.celestrak.com/pub/satcat.txt

## Install via [npm](https://npmjs.com/package/satcat)

```sh
$ npm install --save satcat
```

## Usage

```js
var Satcat = require( 'satcat' )
```

### Parsing a Stream

```js
var parser = new Satcat.Parser()
```

```js
http.get( 'http://www.celestrak.com/pub/satcat.txt', function( response ) {
  response.pipe( parser )
})
```

```js
parser.on( 'readable', function() {
  var satellite = null
  while( satellite = this.read() ) {
    // ...
  }
})
```

### Parsing a Record

```js
var record = '1957-001B    00002  *D SPUTNIK 1                 CIS    1957-10-04  TYMSC  1958-01-03     96.1   65.0     945     227     N/A       '
var satellite = Satcat.Satellite.parse( record )
```

```
Satellite {
  id: '1957-001B',
  catalogNumber: '00002',
  multipleNames: false,
  payload: true,
  status: 'D',
  name: 'SPUTNIK 1',
  source: 'CIS',
  launchDate: 1957-10-04T00:00:00.000Z,
  launchSite: 'TYMSC',
  decayDate: 1958-01-03T00:00:00.000Z,
  orbitalPeriod: 96.1,
  inclination: 65,
  apogeeAltitude: 945,
  perigeeAltitude: 227,
  radarCrossSection: NaN,
  orbitalStatus: ''
}
```

## Benchmarks

```
npm run benchmark
```

## Examples

- `node example/http` - Streaming the Celestrak Satellite Catalogue
- `node example/file` - Parsing & outputting the test data
