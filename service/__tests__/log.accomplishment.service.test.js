import { CareerImprovementClient } from "../../pojo/career.improvement.client";
import { Timestamp } from "../../pojo/timestamp";
import { HardWorkEntry } from "../../pojo/hard.work.entry";
import { LogAccomplishmentService } from "../log.accomplishment.service";
import { MockDatabase, Query } from "../../database/__tests__/mock.database";
import { Goal } from "../../pojo/goal";
import { CareerImprovementClientMapper } from "../../database/career.improvement.client.mapper";
import * as queries from '../../graphql/queries';

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

    database.create(careerImprovementClient);
  });

  it("should write the accomplishment to the given database when given a client", async () => {
    await testObject.log(careerImprovementClient, accomplishment);

    const careerImprovementClientMapper = new CareerImprovementClientMapper();

    const queryClients = new Query(queries.listCareerImprovementClients);
    const readResults = database.read(queryClients);
    const client = careerImprovementClientMapper.toInMemoryModel(readResults);

    expect(client.getHardWork().length).toBe(1);
    expect(client.getHardWork()[0].equals(accomplishment));
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
      "Cannot add the same hard work entry twice"
    );
  });

  it('should rollback the clients log if the database update call failed', async () => {
    database.update = function() {
      throw new Error('Update failure');
    }

    try {
      await testObject.log(careerImprovementClient, accomplishment);
      expect(false).toBeTruthy();
    } catch (e) {
      const accomplishments = careerImprovementClient.getHardWork();
      expect(accomplishments.length).toBe(0);
    }
  });

  it("should write the updated goal to the given database", async () => {
    await testObject.log(testObject, accomplishment.copy(), goal.copy());
  });
});
