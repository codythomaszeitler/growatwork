import { HardWorkEntry } from "../hard.work.entry";
import { Timestamp } from "../timestamp";

describe("Hard Work Entry", () => {
  let accomplishment;
  let accomplishedOn;
  let testObject;

  beforeEach(() => {
    accomplishment = "This is what we did today";
    accomplishedOn = Timestamp.today();

    testObject = new HardWorkEntry(accomplishment, accomplishedOn);
  });

  it("should be able to hold the hard work entry on what you accomplished", () => {
    expect(testObject.getAccomplishment()).toBe(accomplishment);
    expect(testObject.getAccomplishedOn().equals(accomplishedOn)).toBe(true);
  });

  it("should be able to copy and the same hard work entry", () => {
    const copy = testObject.copy();
    expect(copy.getAccomplishment()).toBe(accomplishment);
    expect(copy.getAccomplishedOn().equals(accomplishedOn)).toBe(true);
  });

  it("should return true on equals if achievement and timestamp are the same", () => {
    const copy = testObject.copy();
    expect(testObject.equals(copy)).toBe(true);
  });

  it("should return false on equals if achievement is different", () => {
    const comparison = new HardWorkEntry("Im different!", accomplishedOn);
    expect(testObject.equals(comparison)).toBe(false);
  });

  it("should return false on equals if timestamp is different", () => {
    const comparison = new HardWorkEntry(accomplishment, new Timestamp(1000, 'January', 1));
    expect(testObject.equals(comparison)).toBe(false);
  });

  it("should return false if timestamp and achievement are both different", () => {
    const comparison = new HardWorkEntry("Im different!", new Timestamp(1000, 'January', 1));
    expect(testObject.equals(comparison)).toBe(false);
  });

  it("should return false on equals if given object is null", () => {
    expect(testObject.equals(null)).toBe(false);
  });

  it("should return false on equals if given object is undefined", () => {
    expect(testObject.equals()).toBe(false);
  });

  it("should return false on equals if given object does not have a getAccomplishment method", () => {
    const comparison = {

      getAccomplishedOn: function() {return Timestamp.today()}
    };

    expect(testObject.equals(comparison)).toBe(false);
  });

  it("should return false on equals if given object does not have a getAccomplishedOn method", () => {
    const comparison = {
      getAccomplishment: function() {return 'accomplishent'}
    };

    expect(testObject.equals(comparison)).toBe(false);
  });

  it("should be able to copy and not share any references", () => {
    const copy = testObject.copy();

    copy.accomplishment = null;
    copy.accomplishedOn = null;

    expect(testObject.getAccomplishment()).toBe(accomplishment);
    expect(testObject.getAccomplishedOn().equals(accomplishedOn)).toBe(true);
  });

  it("should throw an exception if there was no accomplishment provied", () => {
    let caughtException = null;

    try {
      new HardWorkEntry(null, Timestamp.today());
    } catch (e) {
      caughtException = e;
    }

    expect(caughtException.message).toBe(
      "Cannot create a hard work entry without an accomplishment"
    );
  });

  it("should throw an exception if there was no date given with the accomplishment", () => {
    let caughtException = null;

    try {
      new HardWorkEntry("Hey, we did something today!", null);
    } catch (e) {
      caughtException = e;
    }

    expect(caughtException.message).toBe(
      "Cannot create a hard work entry without an accomplishment date"
    );
  });
});
