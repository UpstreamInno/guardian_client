export class Path {

  // Assumes data is sorted by time!
  constructor(data) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

}
