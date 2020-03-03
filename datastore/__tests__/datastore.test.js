import {
  CareerImprovementClient,
  type
} from "../../pojo/career.improvement.client";
import { DataStore, getInstance } from "../datastore";
import { GetCommand } from "../get.command";
import { HardWorkEntry } from "../../pojo/hard.work.entry";

describe("Data Store", () => {
  it("should get the CareerImprovementClient loaded in the datastore", () => {
    const testObject = new DataStore();

    const beforeGet = new CareerImprovementClient();
    beforeGet.id = "1000";
    testObject.add(beforeGet);

    const afterGet = testObject.get(new GetCommand(type, beforeGet.id));
    expect(beforeGet.equals(afterGet)).toBe(true);
  });

  it("should get the CareerImprovmentClient loaded in the DataStore when it has entries", () => {
    const testObject = new DataStore();

    const beforeGet = new CareerImprovementClient();
    beforeGet.id = "1000";
    for (let i = 0; i < 10; i++) {
      beforeGet.log(new HardWorkEntry(i.toString(), new Date()));
    }
    testObject.add(beforeGet);

    const afterGet = testObject.get(new GetCommand(type, beforeGet.id));
    expect(beforeGet.equals(afterGet)).toBe(true);
  });

  it("should throw an exception if trying to add an object with a type attribute", () => {
    const testObject = new DataStore();
    const withoutType = {};

    let caughtException = null;
    try {
      testObject.add(withoutType);
    } catch (e) {
      caughtException = e;
    }
    expect(caughtException.message).toBe(
      'Cannot add an object to datastore without a "type" attribute'
    );
  });

  it('should throw an exception if trying to add a null object to datastore', () => {
    const testObject = new DataStore(); 

    let caughtException = null;
    try {
      testObject.add(null);
    } catch (e) {
      caughtException = e;
    }
    expect(caughtException.message).toBe(
      'Cannot add a null object to datastore'
    );

  });

  it('should throw an exception if the get command is null', () => {
    const testObject = new DataStore(); 

    let caughtException = null;
    try {
      testObject.get(null);
    } catch (e) {
      caughtException = e;
    }
    expect(caughtException.message).toBe(
      'Cannot get using a null command'
    );
  });

  it("should get null if the given CareerImprovementClient does not exist within the DataStore", () => {
    const testObject = new DataStore();

    const retrieved = testObject.get(new GetCommand(type, "15000"));
    expect(retrieved).toBe(null);
  });

  it('should be able to lazy initialize when calling get() for the first time', () => {
    expect(getInstance()).not.toBe(null);
  });
});
