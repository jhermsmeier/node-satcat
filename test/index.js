var Satcat = require( '..' )
var fs = require( 'fs' )
var inspect = require( '../example/inspect' )
var path = require( 'path' )
var os = require( 'os' )
var assert = require( 'assert' )

var recordCount = 0
var expectedRecordCount = 42972

function assertSatellite( satellite ) {
  assert.ok( satellite )
  assert.ok( /\d{4}-\d{3}[a-z]{1,3}/i.test( satellite.id ), `Invalid satellite.id pattern "${satellite.id}"` )
  assert.ok( typeof satellite.catalogNumber === 'string', `Satellite catalogNumber should be a string, but is "${satellite.catalogNumber}"` )
  assert.ok( typeof satellite.multipleNames === 'boolean', `Satellite multipleNames should be a boolean, but is "${satellite.multipleNames}"` )
  assert.ok( typeof satellite.payload === 'boolean', `Satellite payload should be a boolean, but is "${satellite.payload}"` )
  assert.ok( typeof satellite.status === 'string', `Satellite status should be a string, but is "${satellite.status}"` )
  assert.ok( typeof satellite.name === 'string', `Satellite name should be a string, but is "${satellite.name}"` )
  assert.ok( typeof satellite.source === 'string', `Satellite source should be a string, but is "${satellite.source}"` )
  assert.ok( satellite.launchDate instanceof Date, `Satellite source should be a date, but is "${satellite.launchDate}` )
  assert.ok( typeof satellite.launchSite === 'string', `Satellite launchSite should be a string, but is "${satellite.launchSite}"` )
  assert.ok( satellite.decayDate instanceof Date, `Satellite source should be a date, but is "${satellite.decayDate}` )
  assert.ok( isFinite( satellite.orbitalPeriod ) || isNaN( satellite.orbitalPeriod ), `Satellite source should be a number, but is ${satellite.orbitalPeriod}` )
  assert.ok( isFinite( satellite.inclination ) || isNaN( satellite.inclination ), `Satellite source should be a number, but is ${satellite.inclination}` )
  assert.ok( isFinite( satellite.apogeeAltitude ) || isNaN( satellite.apogeeAltitude ), `Satellite source should be a number, but is ${satellite.apogeeAltitude}` )
  assert.ok( isFinite( satellite.perigeeAltitude ) || isNaN( satellite.perigeeAltitude ), `Satellite source should be a number, but is ${satellite.perigeeAltitude}` )
  assert.ok( isFinite( satellite.radarCrossSection ) || isNaN( satellite.radarCrossSection ), `Satellite source should be a number, but is ${satellite.radarCrossSection}` )
  assert.ok( typeof satellite.orbitalStatus === 'string', `Satellite orbitalStatus should be a string, but is "${satellite.orbitalStatus}"` )
}

var filename = path.join( __dirname, 'data', 'satcat.txt' )
var parser = new Satcat.Parser()
var time = process.hrtime()

fs.createReadStream( filename )
  .pipe( parser )
  .on( 'data', function( satellite ) {
    recordCount++
    try {
      assertSatellite( satellite )
    } catch( error ) {
      process.stdout.write( os.EOL + `Record ${recordCount} / ${expectedRecordCount}` + os.EOL )
      process.stdout.write( inspect( satellite ) )
      process.stdout.write( os.EOL + os.EOL )
      throw error
    }
  })
  .on( 'end', function() {
    assert.ok(
      recordCount === expectedRecordCount,
      `Expected ${expectedRecordCount}, got ${recordCount}`
    )
    time = process.hrtime( time )
    var ms = ( time[0] * 1e3 ) + ( time[1] * 1e-9 )
    process.stdout.write( os.EOL + `[OK] ${recordCount} records, ${ms.toFixed(3)} ms` + os.EOL )
  })
