import Storage from 'Lib/Storage';
import moment from 'moment';

export default class Location {

  static get NAMESPACE() { return Storage.encryptedModelName("location"); }

  // returns location, an object with keys:
  //   history: time sorted array of points in the form [lat, long, time]
  static async read(options = {}) {
    const limit = options.limit || 0;
    
    let result = await Storage.load(Location.NAMESPACE);

    if (limit > 0) {
      const start = result.history.length - limit;
      result.history = result.history.slice(start > 0 ? start : 0)
    }

    return result;
  }

  // insert a newLocation into the history
  static async insert(newLocation) {
    let locationData = await Location.read();
    locationData = locationData || {};
    let history = locationData.history ? locationData.history : [];
    history.push(newLocation);

    // sort history before write
    history = await sortLocationByTime(history);
    locationData.history = history;

    return Storage.write(Location.NAMESPACE, locationData);
  }

  static async destroy() { 
    return Storage.remove(Location.NAMESPACE);
  }

}

function sortLocationByTime(locations) {
  return locations.sort((a, b) => moment(a[2]).format("x") - moment(b[2]).format("x"));
}


