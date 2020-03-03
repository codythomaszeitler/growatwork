import { CareerImprovementClient } from "../career.improvement.client";
import { HardWorkEntry } from "../hard.work.entry";

describe("Career Improvement Client", () => {
  let testObject;
  beforeEach(() => {
    testObject = new CareerImprovementClient();
  });

  it("should be able to track all hard work entries", () => {
    const timestamp = new Date();

    testObject.log(new HardWorkEntry("First!", timestamp));
    testObject.log(new HardWorkEntry("Second!", timestamp));
    testObject.log(new HardWorkEntry("Third!", timestamp));

    const entries = testObject.getHardWork();
    expect(entries.length).toBe(3);

    expect(entries).toContainEqual(new HardWorkEntry("First!", timestamp));
    expect(entries).toContainEqual(new HardWorkEntry("Second!", timestamp));
    expect(entries).toContainEqual(new HardWorkEntry("Third!", timestamp));
  });

  it('should return true on equals when both clients are empty', () => {
    const comparison = new CareerImprovementClient();
    expect(testObject.equals(comparison)).toBe(true);
  });

  it("should throw an exception if there is a duplicate hard work entry added", () => {
    const timestamp = new Date();
    const toDuplicate = new HardWorkEntry("Duplicate!", timestamp);

    testObject.log(toDuplicate.copy());

    let caughtException = null;
    try {
      testObject.log(toDuplicate.copy());
    } catch (e) {
      caughtException = e;
    }
    expect(caughtException.message).toBe(
      "Cannot add the same hard work entry twice"
    );
  });

  it("should throw an exception if a null hard work entry is given", () => {
    let caughtException = null;
    try {
      testObject.log(null);
    } catch (e) {
      caughtException = e;
    }
    expect(caughtException.message).toBe(
      "Cannot log without a hard work entry to a career improvement client"
    );
  });

  it("should emit an event when a hard work entry is logged", () => {
    let caughtEvent = null;
    const listener = {
      onLog: function(event) {
        caughtEvent = event;
      }
    };

    let entry = new HardWorkEntry("Entry!", new Date());
    testObject.addOnLogListener(listener);
    testObject.log(entry);

    expect(caughtEvent.logged).toEqual(entry);
  });

  it('should throw an exception if a null listener is add to on log listener', () => {

    let caughtException = null;
    try {
        testObject.addOnLogListener(null);
    } catch (e) {
        caughtException = e;
    }

    expect(caughtException.message).toBe('Cannot add a listener that does not exist');
  });
});
