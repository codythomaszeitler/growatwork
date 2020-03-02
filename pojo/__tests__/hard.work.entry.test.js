import { HardWorkEntry } from "../hard.work.entry";

describe("Hard Work Entry", () => {
  let accomplishment;
  let accomplishedOn;
  let testObject;

  beforeEach(() => {
    accomplishment = "This is what we did today";
    accomplishedOn = new Date();

    testObject = new HardWorkEntry(accomplishment, accomplishedOn);
  });

  it("should be able to hold the hard work entry on what you accomplished", () => {
    expect(testObject.accomplished()).toBe(accomplishment);
    expect(testObject.accomplishedOn().getTime()).toBe(
      accomplishedOn.getTime()
    );
  });

  it("should be able to copy and the same hard work entry", () => {
    const copy = testObject.copy();
    expect(copy.accomplished()).toBe(accomplishment);
    expect(copy.accomplishedOn().getTime()).toBe(
      accomplishedOn.getTime()
    );
  });

  it("should be able to copy and not share any references", () => {
    const copy = testObject.copy();

    copy.accomplishment = null;
    copy.accomplishedOn = null;

    expect(testObject.accomplished()).toBe(accomplishment);
    expect(testObject.accomplishedOn().getTime()).toBe(
      accomplishedOn.getTime()
    );
  });

  it("should throw an exception if there was no accomplishment provied", () => {
    let caughtException = null;

    try {
      new HardWorkEntry(null, new Date());
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
