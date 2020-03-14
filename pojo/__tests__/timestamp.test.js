import { Timestamp } from "../timestamp";

describe("Timestamp", () => {

  it("should be able to create a timestamp with a month, day, and year", () => {
    const testObject = new Timestamp(2019, "January", 1);
    expect(testObject.getYear()).toBe(2019);
    expect(testObject.getMonth()).toBe("January");
    expect(testObject.getDay()).toBe(1);
  });

  it("should be able to create a timestamp with a month that is an integer", () => {
    const testObject = new Timestamp(2019, 1, 1);
    expect(testObject.getMonth()).toBe('January');
  });

  it("should throw an exception if the month integer is below 0", () => {

    let caughtException = null;
    try {
      new Timestamp(2019, 0, 1);
    } catch (e) {
      caughtException = e;
    }

    expect(caughtException.message).toBe("The given month index [0] is not within [1-12]");
  });

  it("should throw an exception if the month integer is greater than 12", () => {
    let caughtException = null;
    try {
      new Timestamp(2019, 13, 1);
    } catch (e) {
      caughtException = e;
    }

    expect(caughtException.message).toBe("The given month index [13] is not within [1-12]");
  });

  it("should be able to create a timestamp with a month, day, and year with a lowercase starting month", () => {
    const testObject = new Timestamp(2019, "january", 1);
    expect(testObject.getYear()).toBe(2019);
    expect(testObject.getMonth()).toBe("January");
    expect(testObject.getDay()).toBe(1);
  });

  it('should be able to parse a date from today', () => {
    const testObject = Timestamp.today();
    const date = new Date();

    expect(testObject.getYear()).toBe(date.getFullYear());
    expect(testObject.getDay()).toBe(date.getDate());
    expect(testObject.getDay()).toBe(date.getDate());
  });

  it('should be able to convert to a date', () => {
    const testObject = new Timestamp(2019, 'January', 1);

    const asDate = testObject.toDate();
    expect(asDate.getFullYear()).toBe(testObject.getYear());
    expect(asDate.getMonth()).toBe(0);
    expect(asDate.getDate()).toBe(testObject.getDay());
  });

  it('should return true if the two timestamps have the same year, month, and day', () => {
    const testObject = new Timestamp(2019, "January", 1);
    const copy = new Timestamp(testObject.getYear(), testObject.getMonth(), testObject.getDay());
    expect(testObject.equals(copy)).toBe(true);
  });

  it('should return false if the two timestamps have different days', () => {
    const testObject = new Timestamp(2019, "January", 1);
    const copy = new Timestamp(testObject.getYear(), testObject.getMonth(), testObject.getDay() + 1);
    expect(testObject.equals(copy)).toBe(false);
  });

  it('should return false if the two timestamps have different months', () => {
    const testObject = new Timestamp(2019, "January", 1);
    const copy = new Timestamp(testObject.getYear(), 'February', testObject.getDay());
    expect(testObject.equals(copy)).toBe(false);
  });

  it('should return false if the two timestamps have different years', () => {
    const testObject = new Timestamp(2019, "January", 1);
    const copy = new Timestamp(testObject.getYear() + 1, 'January', testObject.getDay());
    expect(testObject.equals(copy)).toBe(false);
  });

  it('should return false when compared against a null timestamp', () => {
    const testObject = new Timestamp(2019, "January", 1);
    expect(testObject.equals(null)).toBe(false);
    expect(testObject.equals()).toBe(false);
  });

  it('should return a copy that is returns true on equal', () => {
    const testObject = new Timestamp(2019, "January", 1);
    expect(testObject.equals(testObject.copy())).toBe(true);
  });

  it('should be able to create a timestamp from a date object', () => {
    const date = new Date(2019, 0, 1);

    const testObject = Timestamp.fromDate(date);

    expect(testObject.getYear()).toBe(2019);
    expect(testObject.getMonth()).toBe('January');
    expect(testObject.getDay()).toBe(1);

  });

  it('should be able to return true if this timestamp is before the given timestamp', () => {
    const testObject = new Timestamp(2019, "January", 1);
    const other = new Timestamp(2019, 'January', 3);

    expect(testObject.isBefore(other)).toBe(true);
  });

  it('should be able to return false if this timestamp is not before the given timestamp', () => {
    const testObject = new Timestamp(2019, "January", 3);
    const other = new Timestamp(2019, 'January', 1);

    expect(testObject.isBefore(other)).toBe(false);
  });

  it('should be able to return true on is before if the given timestamps are equivalent', () => {
    const testObject = new Timestamp(2019, "January", 3);
    expect(testObject.isBefore(testObject.copy())).toBe(true);
  });

  it('should be able to return true if this timestamp is after the given timestamp', () => {
    const testObject = new Timestamp(2019, "January", 3);
    const other = new Timestamp(2019, 'January', 1);

    expect(testObject.isAfter(other)).toBe(true);
  });

  it('should be able to return false if this timestamp is not after the given timestamp', () => {
    const testObject = new Timestamp(2019, "January", 1);
    const other = new Timestamp(2019, 'January', 3);

    expect(testObject.isAfter(other)).toBe(false);
  });

  it('should be able to return true if the given timestamps are equivalent on isAfter', () => {
    const testObject = new Timestamp(2019, "January", 3);
    expect(testObject.isAfter(testObject.copy())).toBe(true);
  });

  it("should throw an exception if a non 1-12 month given", () => {
    let caughtException = null;
    try {
      new Timestamp(2019, "not a month", 1);
    } catch (e) {
      caughtException = e;
    }
    expect(caughtException.message).toBe(
      "The given month [not a month] is not a real month"
    );
  });

  it("should throw an exception if the year is not given", () => {
    let caughtException = null;
    try {
      new Timestamp(null, "January", 1);
    } catch (e) {
      caughtException = e;
    }
    expect(caughtException.message).toBe(
      "Cannot create a timestamp without a year"
    );
  });

  it("should throw an exception if the month is not given", () => {
    let caughtException = null;
    try {
      new Timestamp(2019, null, 1);
    } catch (e) {
      caughtException = e;
    }
    expect(caughtException.message).toBe(
      "Cannot create a timestamp without a month"
    );
  });

  it("should throw an exception if the day is not given", () => {
    let caughtException = null;
    try {
      new Timestamp(2019, "January", null);
    } catch (e) {
      caughtException = e;
    }
    expect(caughtException.message).toBe(
      "Cannot create a timestamp without a day"
    );
  });
});
