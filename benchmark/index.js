var Satcat = require( '..' )
var fs = require( 'fs' )
var path = require( 'path' )
var os = require( 'os' )

var records = 0
var time = null

var filename = path.join( __dirname, '..', 'test', 'data', 'satcat.txt' )
var parser = new Satcat.Parser()

fs.createReadStream( filename )
  .pipe( parser )
  .once( 'data', function() {
    time = process.hrtime()
  })
  .on( 'data', function() {
    records++
  })
  .on( 'end', function() {
    time = process.hrtime( time )
    var ms = ( time[0] * 1e3 ) + ( time[1] * 1e-9 )
    process.stdout.write( os.EOL )
    process.stdout.write( `Parsed ${records} records in ${ms.toFixed(3)} ms` )
    process.stdout.write( os.EOL )
  })
