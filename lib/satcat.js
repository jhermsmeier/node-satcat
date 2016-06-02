var Stream = require( 'stream' )
var inherit = require( 'util' ).inherits

/**
 * Satcat constructor
 * @param {Object} options
 */
function Satcat( options ) {

  if( !(this instanceof Satcat) )
    return new Satcat( options )

  options = options || {}
  options.encoding = null
  options.objectMode = true

  Stream.Transform.call( this, options )

}

/**
 * [Parser description]
 * @type {Satcat}
 */
Satcat.Parser = Satcat
Satcat.Satellite = require( './satellite' )

/**
 * Satcat prototype
 * @type {Object}
 */
Satcat.prototype = {

  constructor: Satcat,

  _transform: function( chunk, _, next ) {

    var line, lines = ( this._buffer + chunk )
      .split( /\r?\n/g )

    while( lines.length > 1 ) {
      this._parse( lines.shift() )
    }

    this._buffer = lines.shift() || ''
    next()

  },

  _parse: function( line ) {
    this.push( Satcat.Satellite.parse( line ) )
  }

}

// Inherit from Emitter
inherit( Satcat, Stream.Transform )

// Exports
module.exports = Satcat
