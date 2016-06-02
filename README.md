# satcat
[![npm](https://img.shields.io/npm/v/satcat.svg?style=flat-square)](https://npmjs.com/package/satcat)
[![npm license](https://img.shields.io/npm/l/satcat.svg?style=flat-square)](https://npmjs.com/package/satcat)
[![npm downloads](https://img.shields.io/npm/dm/satcat.svg?style=flat-square)](https://npmjs.com/package/satcat)

SATCAT (Satellite Catalogue) Format Parser

- Format definition: http://www.celestrak.com/satcat/satcat-format.asp
- Raw data (approx. 5MB): http://www.celestrak.com/pub/satcat.txt

## Install via [npm](https://npmjs.com/package/satcat)

```sh
$ npm install --save satcat
```

## Example

```
$ node example/index.js
```

```js
var Satcat = require( '..' )
var http = require( 'http' )

var parser = new Satcat.Parser()
  .on( 'data', function( satellite ) {
    console.log( satellite )
    console.log( '' )
  })

http.get( 'http://www.celestrak.com/pub/satcat.txt', function( response ) {
  if( response.statusCode === 200 ) {
    response.pipe( parser )
  } else {
    console.log( 'HTTP', response.statusCode )
    process.exit( 1 )
  }
}).on( 'error', function( error ) {
  console.log( error.stack )
  process.exit( 1 )
})
```

Output:

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
  orbitalStatus: '' }

Satellite {
  id: '1957-002A',
  catalogNumber: '00003',
  multipleNames: false,
  payload: true,
  status: 'D',
  name: 'SPUTNIK 2',
  source: 'CIS',
  launchDate: 1957-11-03T00:00:00.000Z,
  launchSite: 'TYMSC',
  decayDate: 1958-04-14T00:00:00.000Z,
  orbitalPeriod: 103.7,
  inclination: 65.3,
  apogeeAltitude: 1659,
  perigeeAltitude: 211,
  radarCrossSection: 0.08,
  orbitalStatus: '' }
```
