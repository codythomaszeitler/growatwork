export class HardWorkEntry {
  constructor(accomplishment, timestamp) {
    if (!accomplishment) {
      throw new Error(
        "Cannot create a hard work entry without an accomplishment"
      );
    }
    if (!timestamp) {
      throw new Error(
        "Cannot create a hard work entry without an accomplishment date"
      );
    }

    this.accomplishment = accomplishment;
    this.timestamp = timestamp;
  }

  equals(object) {
    if (!object || !object.getAccomplishment || !object.getAccomplishedOn) {
      return false;
    }

    const equalAccomplishment = object.getAccomplishment() === this.getAccomplishment();
    const equalTimestamp = object.getAccomplishedOn().getTime() === this.getAccomplishedOn().getTime();

    return equalAccomplishment && equalTimestamp;
  }

  copy() {
    return new HardWorkEntry(this.getAccomplishment(), this.getAccomplishedOn());
  }

  getAccomplishment() {
    return this.accomplishment;
  }

  getAccomplishedOn() {
    return new Date(this.timestamp);
  }
}
