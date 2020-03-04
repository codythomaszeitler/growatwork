import { Timestamp } from "../timestamp";

describe("Timestamp", () => {
  it("should be able to create a timestamp with a month, day, and year", () => {
    const testObject = new Timestamp(2019, "January", 1);
    expect(testObject.getYear()).toBe(2019);
    expect(testObject.getMonth()).toBe("January");
    expect(testObject.getDay()).toBe(1);
  });

  it("should be able to create a timestamp with a month, day, and year with a lowercase starting month", () => {
    const testObject = new Timestamp(2019, "january", 1);
    expect(testObject.getYear()).toBe(2019);
    expect(testObject.getMonth()).toBe("January");
    expect(testObject.getDay()).toBe(1);
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
