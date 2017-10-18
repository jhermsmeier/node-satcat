var util = require( 'util' )
var options = {
  colors: process.stdout.isTTY,
  depth: null
}

module.exports = function inspect( value ) {
  return util.inspect( value, options )
}
