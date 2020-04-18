import moment from "moment";

// return true if a = b ± padding
export function fuzzyEqual(a, b, padding) {
  return Math.abs(a-b) <= Math.abs(padding);
}

// return distance in km between lat/long points
// credit to https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
export function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

export function stringToEpoch(string) {
  return moment(string).format('X');
};

export function epochToDisplayString(number) {
  return moment.unix(number).format(('dddd, MMMM Do, YYYY hh:mm'));
}

// TODO: localize, and support non-metric
export function distanceToDisplay(distance) {

  if (distance > 1000) {
    return `${round(distance, 1)} km`
  }

  // need to find out how accurate GPS actually is
  // https://www.gps.gov/systems/gps/performance/accuracy/
  if (distance <= 0.010) {
    return `10 meters (or less)`
  }

  return `${round(distance / 1000, 0)} meters`
}

export function round(n, decimalPrecision = 2) {
  return Math.round((n + Number.EPSILON) * Math.pow(10, decimalPrecision)) / Math.pow(10, decimalPrecision)
}
