import { CareerImprovementClient } from "../career.improvement.client";
import { HardWorkEntry } from "../hard.work.entry";
import {Timestamp} from '../timestamp';

describe("Career Improvement Client", () => {
  let testObject;
  beforeEach(() => {
    testObject = new CareerImprovementClient();
  });

  it("should be able to track all hard work entries", () => {
    const timestamp = Timestamp.today();

    testObject.log(new HardWorkEntry("First!", timestamp));
    testObject.log(new HardWorkEntry("Second!", timestamp));
    testObject.log(new HardWorkEntry("Third!", timestamp));

    const entries = testObject.getHardWork();
    expect(entries.length).toBe(3);

    expect(entries).toContainEqual(new HardWorkEntry("First!", timestamp));
    expect(entries).toContainEqual(new HardWorkEntry("Second!", timestamp));
    expect(entries).toContainEqual(new HardWorkEntry("Third!", timestamp));
  });

  it('should be able to get achievements within two timestamp ranges', () => {
    const fromTimestamp = new Timestamp(2019, 'January', 1);
    const toTimestamp = new Timestamp(2019, 'January', 31);

    testObject.log(new HardWorkEntry('Test Achievement 1', new Timestamp(2019, 'January', 15)));
    testObject.log(new HardWorkEntry('Test Achievement 2', new Timestamp(2019, 'January', 16)));
    testObject.log(new HardWorkEntry('Out of range under', new Timestamp(2018, 'January', 16)));
    testObject.log(new HardWorkEntry('Out of range over', new Timestamp(2020, 'January', 16)));
    testObject.log(new HardWorkEntry('Test Achievement 3', new Timestamp(2019, 'January', 7)));

    const achievements = testObject.getAchievements(fromTimestamp, toTimestamp);
    expect(achievements.length).toBe(3);
  });

  it('should be able to get the earliest achievment', () => {
    testObject.log(new HardWorkEntry('Test Achievement 3', new Timestamp(2019, 'January', 5)));

    const earliest = new HardWorkEntry('Test Achievement 1', new Timestamp(2019, 'January', 2));
    testObject.log(earliest);

    const found = testObject.getEarliestAchievement();

    expect(found.equals(earliest)).toBe(true);
  });

  it('should return null if there are no achievements on get earliest achievement', () => {
    expect(testObject.getEarliestAchievement()).toBeNull(); 
  });

  it('should be able to get the latest achievement', () => {
    testObject.log(new HardWorkEntry('Test Achievement 3', new Timestamp(2019, 'January', 1)));
    const latest = new HardWorkEntry('Test Achievement 1', new Timestamp(2019, 'January', 2));
    testObject.log(latest);

    const found = testObject.getLatestAchievement();
    expect(found.equals(latest)).toBe(true);
  });

  it('should return null if there are no achievements on get latest', () => {
    expect(testObject.getLatestAchievement()).toBeNull();
  });

  it('should return true on equals when both clients are empty', () => {
    const comparison = new CareerImprovementClient();
    expect(testObject.equals(comparison)).toBe(true);
  });

  it("should throw an exception if there is a duplicate hard work entry added", () => {
    const timestamp = Timestamp.today();
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

    let entry = new HardWorkEntry("Entry!", Timestamp.today());
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
