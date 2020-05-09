import {
  CareerImprovementClient
} from "../../pojo/career.improvement.client";
import { CareerImprovementClientDataStore} from "../datastore";
import { HardWorkEntry } from "../../pojo/hard.work.entry";
import {Timestamp} from '../../pojo/timestamp';

describe("Data Store", () => {
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
