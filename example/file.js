var Satcat = require( '..' )
var fs = require( 'fs' )
var inspect = require( './inspect' )
var path = require( 'path' )
var os = require( 'os' )

var parser = new Satcat.Parser()
  .on( 'data', function( satellite ) {
    process.stdout.write( inspect( satellite ) )
    process.stdout.write( os.EOL + os.EOL )
  })

var filename = path.join( __dirname, '..', 'test', 'data', 'satcat.txt' )

fs.createReadStream( filename )
  .pipe( parser )
  .on( 'error', function( error ) {
    console.log( error.stack )
    process.exit( 1 )
  })
