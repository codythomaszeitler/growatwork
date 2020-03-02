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

  copy() {
    return new HardWorkEntry(this.accomplished(), this.accomplishedOn());
  }

  accomplished() {
    return this.accomplishment;
  }

  accomplishedOn() {
    return new Date(this.timestamp);
  }
}
