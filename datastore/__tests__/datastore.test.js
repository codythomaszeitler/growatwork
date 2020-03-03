import {
  CareerImprovementClient,
  type
} from "../../pojo/career.improvement.client";
import { DataStore} from "../datastore";
import { HardWorkEntry } from "../../pojo/hard.work.entry";

describe("Data Store", () => {
  it("should get the CareerImprovementClient loaded in the datastore", () => {
    const testObject = new DataStore();

    const beforeGet = new CareerImprovementClient();
    testObject.setCareerImprovementClient(beforeGet);

    const afterGet = testObject.getCareerImprovementClient();
    expect(beforeGet.equals(afterGet)).toBe(true);
  });

  it("should get the CareerImprovmentClient loaded in the DataStore when it has entries", () => {
    const testObject = new DataStore();

    const beforeGet = new CareerImprovementClient();
    for (let i = 0; i < 10; i++) {
      beforeGet.log(new HardWorkEntry(i.toString(), new Date()));
    }
    testObject.setCareerImprovementClient(beforeGet);

    const afterGet = testObject.getCareerImprovementClient();
    expect(beforeGet.equals(afterGet)).toBe(true);
  });

  it('should throw an exception if trying to add a null object to datastore', () => {
    const testObject = new DataStore(); 

    let caughtException = null;
    try {
      testObject.setCareerImprovementClient(null);
    } catch (e) {
      caughtException = e;
    }
    expect(caughtException.message).toBe(
      'Cannot set career improvement client to null'
    );
  });

  it("should get null if the given CareerImprovementClient does not exist within the DataStore", () => {
    const testObject = new DataStore();

    const retrieved = testObject.getCareerImprovementClient();
    expect(retrieved).toBeFalsy();
  });
});
