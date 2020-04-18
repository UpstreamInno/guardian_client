import { distance, fuzzyEqual } from "./PathHelpers";
import { Path } from "./Path";

export const DEFAULT_TIME_IMPRECISON = 30; // integer seconds
export const DEFAULT_LOCATION_IMPRECISON = 0.0001; // decimal degrees: 1.0° ~ 111km, 0.01° ~ 1.11km, 0.00001° ~ 1.11m

export class Paths {

  //
  // Given two Path objects, path, and otherPath, calculate intersections with the following options:
  //   - timePadding - for determining a time match, time1 == time2 ± timeImprecision
  //   - locationPadding - for determining a location match, location1 == location1 ± locationImprecision
  //
  // Returns matches of time/location in the format of:
  //   { 
  //     intersections: [
  //       { 
  //         time: 1585609900112, // time of intersection (this is always the time in Path, not otherPath)
  //         distance: 0.0031, // distance in km
  //       }
  //     ]
  //   }
  //
  // TODO: consider returning only one (closest) intersection per time along `path`, in the even there are 
  //       multiple intersections at the same time.
  static intersections(path, otherPath, options = {}) {
    let timePadding = options.timePadding || DEFAULT_TIME_IMPRECISON;
    let locationPadding = options.locationPadding || DEFAULT_LOCATION_IMPRECISON;
    let intersections = [];

    let pi = 0;
    let oi = 0;
    let search = true;
    let closestIntersection = {}

    while(search) {
      
      let p = path.data[pi];
      let o = otherPath.data[oi];
      let intersectionFound = false;

      // check time and location intersection
      if (fuzzyEqual(o.time, p.time, timePadding) &&
          fuzzyEqual(o.lat,  p.lat,  locationPadding) &&
          fuzzyEqual(o.long, p.long, locationPadding)) {
            let intersection = { 
              time: p.time,
              distance: distance(p.lat, p.long, o.lat, o.long),
            }
            intersections.push(intersection)

            // keep track of closest intersection
            if (closestIntersection.distance === undefined || closestIntersection.distance <= intersections.distance ) {
              closestIntersection = intersection;
            }

            intersectionFound = true;
          }

      // advance o when o.time < p.time - padding OR when there is an intersection
      // advance p when p.time + padding < o.time
      // stop when either p[pi] or o[oi] would go out of bounds
      if(p.time + timePadding < o.time && !intersectionFound) {
        (pi >= path.data.length - 1) ? search = false : pi++;
      } else {
        (oi >= otherPath.data.length - 1) ? search = false : oi++;
      }
    }

    return { intersections, closestIntersection };
  }

  // Same as intersctions, but accepts points instead of Path objects
  static intersectionsFromPoints(points, otherPoints, options) {
    return Paths.intersections(Path.fromPoints(points), Path.fromPoints(otherPoints), options);
  }
}
