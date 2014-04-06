var Satcat = require( '../' )
var HTTP = require( 'http' )
var inpsect = require( 'util' ).inspect

function log( label, value ) {
  console.log(
    label, inspect( value, {
      colors: true, depth: null
    })
  )
}

var parser = new Satcat.Parser()
  .on( 'data', function( sat ) {
    log( '[SATELLITE]', sat )
  })

HTTP.get(
  'http://www.celestrak.com/pub/satcat.txt',
  function( response ) {
    if( response.statusCode === 200 ) {
      response.pipe( parser )
    } else {
      console.log( '[ERROR]', response.statusCode, response.status )
      process.exit( response.statusCode )
    }
  }
).on( 'error', function( error ) {
  console.log( '[ERROR]', error.message )
  process.exit( 1 )
})
