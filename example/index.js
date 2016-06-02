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
