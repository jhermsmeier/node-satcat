/**
 * Satellite constructor
 * @param {Object} data
 */
function Satellite( data ) {
  
  if( !(this instanceof Satellite) )
    return new Satellite( data )
  
  // International Designator
  // [ launchYear, launchNumber, launchPart ]
  this.id = 'yyyy-nnnaaa'
  // NORAD Catalog Number
  this.catalogNumber = ''
  // Multiple Name Flag
  this.multipleNames = false
  // Payload Flag
  this.payload = false
  // Operational Status Code
  this.status = '?'
  // Satellite Name(s)
  this.name = ''
  // Source or Ownership
  this.source = ''
  // Launch Date [year-month-day]
  this.launchDate = new Date()
  // Launch Site
  this.launchSite = ''
  // Decay Date, if applicable
  this.decayDate = new Date()
  // Orbital period (minutes)
  this.orbitalPeriod = 0
  // Inclination (degrees)
  this.inclination = 0
  // Apogee Altitude (kilometers)
  this.apogeeAltitude = 0
  // Perigee Altitude (kilometers)
  this.perigeeAltitude = 0
  // Radar Cross Section (square meters)
  this.radarCrossSection = 0
  // Orbital Status Code
  this.orbitalStatus = ''
  
}

function extract( line, from, to ) {
  return line.substring( from, to )
    .replace( /^\s+|\s+$/g, '' )
}

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
