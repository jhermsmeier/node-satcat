var Satcat = require( '..' )
var http = require( 'http' )
var inspect = require( './inspect' )
var path = require( 'path' )
var os = require( 'os' )

var parser = new Satcat.Parser()
  .on( 'data', function( satellite ) {
    process.stdout.write( inspect( satellite ) )
    process.stdout.write( os.EOL + os.EOL )
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
