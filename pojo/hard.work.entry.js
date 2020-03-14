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
    this.databaseType = 'achievement';
  }

  isBefore(comparison) {
    return this.getAccomplishedOn().isBefore(comparison.getAccomplishedOn());
  }

  isAfter(comparison) {
    return this.getAccomplishedOn().isAfter(comparison.getAccomplishedOn());
  }

  equals(object) {
    if (!object || !object.getAccomplishment || !object.getAccomplishedOn) {
      return false;
    }

    const equalAccomplishment = object.getAccomplishment() === this.getAccomplishment();
    const equalTimestamp = object.getAccomplishedOn().equals(this.timestamp);

    return equalAccomplishment && equalTimestamp;
  }

  copy() {
    return new HardWorkEntry(this.getAccomplishment(), this.getAccomplishedOn());
  }

  getAccomplishment() {
    return this.accomplishment;
  }

  getAccomplishedOn() {
    return this.timestamp.copy();
  }
}
