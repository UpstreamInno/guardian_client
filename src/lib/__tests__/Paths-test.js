import { Paths } from "../Paths";
import { Path } from "../Path"
import { distance } from "../PathHelpers"

describe("Paths", () => {
  let path1;
  let path2;

  describe("intersections", () => {
    
    it(`returns no intersections when no time overlap`, () => {
      path1 = new Path([
        { time: 800, lat: 44.0000, long:  -93.0000 },
        { time: 700, lat: 44.0000, long:  -91.0000 },
      ]);
      path2 = new Path([
        { time: 200, lat: 44.0000, long:  -93.0000 },
        { time: 900, lat: 44.0000, long:  -91.0000 },
      ]);
      expect(Paths.intersections(path1, path2)).toEqual({intersections: []});
    });

    it(`returns intersections for exact location/time matches`, () => {
      path1 = new Path([
        { time: 200, lat: 44.0000, long:  -93.0000 },
        { time: 300, lat: 44.0000, long:  -97.0000 },
        { time: 400, lat: 44.0000, long:  -93.0000 },
        { time: 500, lat: 44.0000, long:  -97.0000 },
      ]);
      path2 = new Path([
        { time: 300, lat: 44.0000, long:  -97.0000 },
        { time: 400, lat: 44.0000, long:  -93.0000 },
      ]);
      expect(Paths.intersections(path1, path2)).toEqual({intersections: [
        { time: 300, distance: 0 },
        { time: 400, distance: 0 },
      ]});
    });

    it(`returns intersections for fuzzy time and locaztion matches`, () => {
      path1 = new Path([
        { time: 10, lat: 44.0000, long:  -97.0000 },
        { time: 25, lat: 44.0000, long:  -97.0000 },
        { time: 29, lat: 44.0000, long:  -97.0000 }, // wrong time
      ]);
      path2 = new Path([
        { time: 4,  lat: 44.0000, long: -97.0000 },  // wrong time
        { time: 5,  lat: 44.0000, long: -97.0000 },
        { time: 6,  lat: 41.0000, long: -100.0000 },
        { time: 7,  lat: 44.0000, long: -93.9999 }, // wrong long
        { time: 10, lat: 44.0000, long: -97.0000 },
        { time: 19, lat: 44.0000, long: -97.0000 }, // wrong time
        { time: 21, lat: 44.0000, long: -97.0000 },
      ]);
      expect(Paths.intersections(path1, path2, {timePadding: 5, locationPadding: 3})).toEqual({intersections: [
        { time: 10, distance: 0 },
        { time: 10, distance: distance(path1.data[0].lat, path1.data[0].long, path2.data[2].lat, path2.data[2].long) },
        { time: 10, distance: 0 },
        { time: 25, distance: 0 },
      ]});
    });
    
  });

});

