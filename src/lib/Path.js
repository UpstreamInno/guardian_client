import { stringToEpoch, toIsoTime, toFixed } from "Lib/PathHelpers"

export class Path {

  // Assumes data is sorted by time!
  constructor(data) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  // construct a path from points
  static fromPoints(points) {
    let pathData = points.map((point) => {
      return ({ 
        lat: point[0],
        long: point[1],
        time: stringToEpoch(point[2]),
      });
    });

    return new Path(pathData)
  }

  // similar to fromPoints, but returns an imprecise path, and is formatted for sendRegionPath
  static regionPathFromPoints(points) {
    return points.map((point) => {
      return ([
        toFixed(point[0]),
        toFixed(point[1]),
        toIsoTime(point[2]),
      ]);
    });
  }

}
