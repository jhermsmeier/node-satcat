var stream = require( 'stream' )

class SatCat extends stream.Transform {

  /**
   * SatCat constructor
   * @extends {stream.Transform}
   * @param {Object} [options]
   */
  constructor( options ) {
    options = options || {}
    options.readableObjectMode = true
    super( options )
    this._stringBuffer = ''
  }

  _transform( chunk, _, next ) {

    var lines = ( this._stringBuffer + chunk )
      .split( /\r?\n/g )

    while( lines.length > 1 ) {
      this.push( SatCat.Satellite.parse( lines.shift() ) )
    }

    this._stringBuffer = lines.shift() || ''

    process.nextTick( next )

  }

}

SatCat.Parser = SatCat
SatCat.Satellite = require( './satellite' )

// Exports
module.exports = SatCat
