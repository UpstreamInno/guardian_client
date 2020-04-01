import { Path } from "../Path";

describe("Path", () => {
  const pathData = [
    { time: 1585609195112, lat: 44.9680, long:  -89.1320 },
    { time: 1585609195212, lat: 33.7557, long: -116.3599 },
  ];

  const subject = () => new Path(pathData);

  describe("when instantiated", () => {
    it(`returns data`, () => {
      expect(subject().data).toEqual(pathData);
    });
  });

});

