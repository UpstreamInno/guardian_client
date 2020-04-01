import { fuzzyEqual, distance } from "../PathHelpers";

describe("fuzzyEqual", () => {
  it(`returns true when equal`, () => {
    expect(fuzzyEqual(5, 5, 0)).toBe(true);
  });

  it(`returns false outside of padding`, () => {
    expect(fuzzyEqual(5, 7, 1)).toBe(false);
  });

  it(`returns true with negative value`, () => {
    expect(fuzzyEqual(-1, 1, 2)).toBe(true);
  });

  it(`returns true with negative padding`, () => {
    expect(fuzzyEqual(-1, 1, -2)).toBe(true);
  });
});

describe("distance", () => {
  let seattle = { lat: 47.609755, long: -122.337793 }
  let helsinki = { lat: 60.169840, long: 24.938330 }

  it(`returns 0 for same location`, () => {
    expect(distance(seattle.lat, seattle.long, seattle.lat, seattle.long)).toEqual(0);
  });
  
  it(`returns for close distances`, () => {
    expect(distance(seattle.lat + 0.00001, seattle.long - 0.00001, seattle.lat, seattle.long)).toEqual(0.0013401301088928606);
  });
  
  it(`returns for distant locations`, () => {
    expect(distance(seattle.lat, seattle.long, helsinki.lat, helsinki.long)).toEqual(7670.988740099061);
  });
});
