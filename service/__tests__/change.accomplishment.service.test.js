import { LogAccomplishmentService } from "../log.accomplishment.service";
import { CareerImprovementClient } from "../../pojo/career.improvement.client";
import { HardWorkEntry } from "../../pojo/hard.work.entry";
import { Timestamp } from "../../pojo/timestamp";
import { MockDatabase, Query } from "../../database/__tests__/mock.database";
import { ChangeAccomplishmentService } from "../change.accomplishment.service";
import { CareerImprovementClientMapper } from "../../database/career.improvement.client.mapper";
import * as queries from "../../graphql/queries";

describe("Change Accomplishment Service", () => {
  let careerImprovementClient;
  let database;

  beforeEach(() => {
    careerImprovementClient = new CareerImprovementClient();
    database = new MockDatabase();

    database.create(careerImprovementClient);
  });

  it("should be able to change an accomplishment in the database", async () => {
    const testObject = new ChangeAccomplishmentService(database);

    const original = new HardWorkEntry(
      "Old Accomplishment",
      new Timestamp(2019, "January", 1)
    );

    const addLogService = new LogAccomplishmentService(database);
    await addLogService.log(careerImprovementClient, original);

    await testObject.change(
      careerImprovementClient,
      original,
      "New Accomplishment"
    );

    const expected = new HardWorkEntry(
      "New Accomplishment",
      new Timestamp(2019, "January", 1)
    );

    const mapper = new CareerImprovementClientMapper();
    const readResults = database.read(
      new Query(queries.listCareerImprovementClients)
    );
    const clientInDatabase = mapper.toInMemoryModel(readResults);

    const accomplishments = clientInDatabase.getHardWork();
    expect(accomplishments.length).toBe(1);
    expect(careerImprovementClient.contains(expected)).toBe(true);
    expect(careerImprovementClient.contains(original)).toBe(false);
  });

  it("should rollback the call if the call to update fails", async () => {
    const logAccomplishmentService = new LogAccomplishmentService(database);
    const accomplishment = new HardWorkEntry(
      "Test Accomplishment",
      new Timestamp(2019, "January", 1)
    );
    await logAccomplishmentService.log(careerImprovementClient, accomplishment);

    database.update = function () {
      throw new Error("Update Failed");
    };

    const testObject = new ChangeAccomplishmentService(database);

    try {
      await testObject.change(
        careerImprovementClient,
        accomplishment,
        "Never going to happen"
      );
      expect(true).toBeFalsy();
    } catch (e) {
      const changed = new HardWorkEntry(
        "Never going to happen",
        new Timestamp(2019, "January", 1)
      );

      expect(careerImprovementClient.contains(accomplishment)).toBe(true);
      expect(careerImprovementClient.contains(changed)).toBe(false);
    }
  });

  it("should throw an exception if the original accomplishment given does not exist within the database", async () => {
    const accomplishment = new HardWorkEntry(
      "Test Accomplishment",
      new Timestamp(2019, "January", 1)
    );
    const testObject = new ChangeAccomplishmentService(database);

    let caughtException = null;
    try {
      await testObject.change(
        careerImprovementClient,
        accomplishment,
        "New Text"
      );
    } catch (e) {
      caughtException = e;
    }

    expect(caughtException.message).toBe(
      "Could not find accomplishment [" +
        accomplishment.getAccomplishment() +
        "]"
    );
  });
});
