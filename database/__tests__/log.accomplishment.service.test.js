import { CareerImprovementClient } from "../../pojo/career.improvement.client";
import { Timestamp } from "../../pojo/timestamp";
import { HardWorkEntry } from "../../pojo/hard.work.entry";
import { LogAccomplishmentService } from "../log.accomplishment.service";
import {MockDatabase} from './mock.database';

describe("Log Accomplishment Service", () => {
  let testObject;
  let careerImprovementClient;
  let accomplishment;

  let database;
  beforeEach(() => {
    database = new MockDatabase();
    testObject = new LogAccomplishmentService(database);

    careerImprovementClient = new CareerImprovementClient();
    accomplishment = new HardWorkEntry(
      "Test",
      new Timestamp(2019, "January", 1)
    );
  });

  it("should write the accomplishment to the given database when given a client", () => {
    testObject.log(careerImprovementClient, accomplishment);

    expect(database.contains(accomplishment)).toBe(true);
    expect(careerImprovementClient.contains(accomplishment)).toBe(true);
  });

  it("should throw an exception if the given database already contains an accomplishment matching the one given", () => {
    const copy = accomplishment.copy();

    testObject.log(careerImprovementClient, accomplishment);

    let caughtException = null;
    try {
      testObject.log(careerImprovementClient, copy);
    } catch (e) {
      caughtException = e;
    }

    expect(caughtException.message).toBe(
      "Accomplishment [" +
        copy.getAccomplishment() +
        "] already exised in database with timestamp [" +
        accomplishment.getAccomplishedOn().toString() +
        "]"
    );
  });
});
