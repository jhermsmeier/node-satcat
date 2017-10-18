/**
 * Satellite
 * @constructor
 * @returns {Satellite}
 */
function Satellite() {

  if( !(this instanceof Satellite) )
    return new Satellite()

  /** @type {String} International Designator [ launchYear, launchNumber, launchPart ] */
  this.id = 'yyyy-nnnaaa'
  /** @type {String} NORAD Catalog Number */
  this.catalogNumber = ''
  /** @type {String} Multiple Name Flag */
  this.multipleNames = false
  /** @type {String} Payload Flag */
  this.payload = false
  /** @type {String} Operational Status Code */
  this.status = '?'
  /** @type {String} Satellite Name(s) */
  this.name = ''
  /** @type {String} Source or Ownership */
  this.source = ''
  /** @type {Date} Launch Date [year-month-day] */
  this.launchDate = new Date()
  /** @type {String} Launch Site */
  this.launchSite = ''
  /** @type {Date} Decay Date, if applicable */
  this.decayDate = new Date()
  /** @type {Number} Orbital period (minutes) */
  this.orbitalPeriod = 0
  /** @type {Number} Inclination (degrees) */
  this.inclination = 0
  /** @type {Number} Apogee Altitude (kilometers) */
  this.apogeeAltitude = 0
  /** @type {Number} Perigee Altitude (kilometers) */
  this.perigeeAltitude = 0
  /** @type {Number} Radar Cross Section (square meters) */
  this.radarCrossSection = 0
  /** @type {String} Orbital Status Code */
  this.orbitalStatus = ''

}

/**
 * Extract a given range from a line
 * @internal
 * @param {String} line
 * @param {Number} from
 * @param {Number} to
 * @returns {String}
 */
function extract( line, from, to ) {
  return line.substring( from, to )
    .replace( /^\s+|\s+$/g, '' )
}

/**
 * Parse a Satcat line into a Satellite object
 * @param {String} line
 * @param {Satellite} [sat]
 * @returns {Satellite}
 */
Satellite.parse = function( line, sat ) {

  sat = sat || new Satellite()

  sat.id                = extract( line, 0, 11 )
  sat.catalogNumber     = extract( line, 13, 18 )
  sat.multipleNames     = extract( line, 19, 20 ) === 'M'
  sat.payload           = extract( line, 20, 21 ) === '*'
  sat.status            = extract( line, 21, 22 )
  sat.name              = extract( line, 23, 47 )
  sat.source            = extract( line, 49, 54 )
  sat.launchDate        = new Date( extract( line, 56, 66 ) )
  sat.launchSite        = extract( line, 68, 73 )
  sat.decayDate         = new Date( extract( line, 75, 85 ) )
  sat.orbitalPeriod     = parseFloat( extract( line, 87, 94 ) )
  sat.inclination       = parseFloat( extract( line, 96, 101 ) )
  sat.apogeeAltitude    = parseFloat( extract( line, 103, 109 ) )
  sat.perigeeAltitude   = parseFloat( extract( line, 111, 117 ) )
  sat.radarCrossSection = parseFloat( extract( line, 119, 127 ) )
  sat.orbitalStatus     = extract( line, 129, 132 )

  return sat

}

// Exports
module.exports = Satellite
