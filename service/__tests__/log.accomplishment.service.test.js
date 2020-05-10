import { CareerImprovementClient } from "../../pojo/career.improvement.client";
import { Timestamp } from "../../pojo/timestamp";
import { HardWorkEntry } from "../../pojo/hard.work.entry";
import { LogAccomplishmentService } from "../log.accomplishment.service";
import { MockDatabase } from "../../database/__tests__/mock.database";
import { Goal } from "../../pojo/goal";

describe("Log Accomplishment Service", () => {
  let testObject;
  let careerImprovementClient;
  let accomplishment;
  let goal;

  let database;
  beforeEach(() => {
    database = new MockDatabase();
    testObject = new LogAccomplishmentService(database);
    goal = new Goal('Test');

    careerImprovementClient = new CareerImprovementClient();
    accomplishment = new HardWorkEntry(
      "Test",
      new Timestamp(2019, "January", 1)
    );
  });

  it("should write the accomplishment to the given database when given a client", async () => {
    await testObject.log(careerImprovementClient, accomplishment);

    expect(database.contains(accomplishment)).toBe(true);
    expect(careerImprovementClient.contains(accomplishment)).toBe(true);
  });

  it("should throw an exception if the given database already contains an accomplishment matching the one given", async () => {
    await testObject.log(careerImprovementClient, accomplishment);

    let caughtException = null;
    try {
      await testObject.log(careerImprovementClient, accomplishment.copy());
    } catch (e) {
      caughtException = e;
    }

    expect(caughtException.message).toBe(
      "Accomplishment [" +
        accomplishment.getAccomplishment() +
        "] already exised in database with timestamp [" +
        accomplishment.getAccomplishedOn().toString() +
        "]"
    );
  });

  it("should throw an exception if the finder fails reading from the database", async () => {
    database.read = function () {
      throw new Error("NOCONNECTION");
    };

    let caughtException = null;
    try {
      await testObject.log(careerImprovementClient, accomplishment.copy());
    } catch (e) {
      caughtException = e;
    }

    expect(caughtException.message).toBe(
      "Could not log accomplishment because of [Could not find accomplishments from database because of [NOCONNECTION]]"
    );
  });

  it("should write the updated goal to the given database", () => {
    await testObject.log(testObject, accomplishment.copy(), goal.copy());
  });
});
