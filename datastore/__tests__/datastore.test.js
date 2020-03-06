import {
  CareerImprovementClient
} from "../../pojo/career.improvement.client";
import { CareerImprovementClientDataStore} from "../datastore";
import { HardWorkEntry } from "../../pojo/hard.work.entry";
import {Timestamp} from '../../pojo/timestamp';

describe("Data Store", () => {
  it("should get the CareerImprovementClient loaded in the datastore", () => {
    const testObject = new CareerImprovementClientDataStore();

    const beforeGet = new CareerImprovementClient();
    testObject.set(beforeGet);

    const afterGet = testObject.get();
    expect(beforeGet.equals(afterGet)).toBe(true);
  });

  it("should get the CareerImprovmentClient loaded in the DataStore when it has entries", () => {
    const testObject = new CareerImprovementClientDataStore();

    const beforeGet = new CareerImprovementClient();
    for (let i = 0; i < 10; i++) {
      beforeGet.log(new HardWorkEntry(i.toString(), Timestamp.today()));
    }
    testObject.set(beforeGet);

    const afterGet = testObject.get();
    expect(beforeGet.equals(afterGet)).toBe(true);
  });

  it('should throw an exception if trying to add a null object to datastore', () => {
    const testObject = new CareerImprovementClientDataStore(); 

    let caughtException = null;
    try {
      testObject.set(null);
    } catch (e) {
      caughtException = e;
    }
    expect(caughtException.message).toBe(
      'Cannot set career improvement client to null'
    );
  });

  it("should get null if the given CareerImprovementClient does not exist within the DataStore", () => {
    const testObject = new CareerImprovementClientDataStore();

    const retrieved = testObject.get();
    expect(retrieved).toBeFalsy();
  });
});
