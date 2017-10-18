var Stream = require( 'stream' )
var inherit = require( 'bloodline' )

/**
 * Satcat constructor
 * @extends {stream.Transform}
 * @param {Object} [options]
 */
function Satcat( options ) {

  if( !(this instanceof Satcat) )
    return new Satcat( options )

  options = options || {}
  options.encoding = null
  options.readableObjectMode = true

  this._stringBuffer = ''

  Stream.Transform.call( this, options )

}

Satcat.Parser = Satcat
Satcat.Satellite = require( './satellite' )

/**
 * Satcat prototype
 * @type {Object}
 * @ignore
 */
Satcat.prototype = {

  constructor: Satcat,

  _transform: function( chunk, _, next ) {

    var lines = ( this._stringBuffer + chunk )
      .split( /\r?\n/g )

    while( lines.length > 1 ) {
      this._parse( lines.shift() )
    }

    this._stringBuffer = lines.shift() || ''

    process.nextTick( next )

  },

  _parse: function( line ) {
    this.push( Satcat.Satellite.parse( line ) )
  }

}

// Inherit from Emitter
inherit( Satcat, Stream.Transform )

// Exports
module.exports = Satcat
