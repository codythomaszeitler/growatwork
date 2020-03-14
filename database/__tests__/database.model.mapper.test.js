import { HardWorkEntry } from "../../pojo/hard.work.entry";
import { Timestamp } from "../../pojo/timestamp";
import { CareerImprovementClient } from "../../pojo/career.improvement.client";
import { DatabaseModelMapper } from "../database.model.mapper";

describe("Database Model Mapper", () => {
  it("converting from in memory to database", () => {
    const careerImprovementClient = new CareerImprovementClient();
    careerImprovementClient.Id = 1000;

    const inMemory = new HardWorkEntry(
      "Test Hard Work Entry",
      new Timestamp(2020, "January", 1)
    );
    inMemory.careerImprovementClientId = careerImprovementClient.Id;

    const testObject = new DatabaseModelMapper();
    const databaseModel = testObject.toDatabaseModel(inMemory);

    expect(databaseModel.careerImprovementClientId).toBe(
      inMemory.careerImprovementClientId
    );
    expect(databaseModel.accomplishment).toBe(inMemory.getAccomplishment());
    expect(databaseModel.accomplishedOn).toBe("Wed Jan 01 2020 00:00:00 GMT-0700 (Mountain Standard Time)");
  });

  it("should convert from database to in memory", () => {
    const databaseModel = {
      careerImprovementClientId: 1000,
      accomplishment: "Test Hard Work Entry",
      accomplishedOn: "Wed Jan 01 2020 00:00:00 GMT-0700 (Mountain Standard Time)"
    };

    const testObject = new DatabaseModelMapper();
    const inMemoryModel = testObject.toInMemoryModel(databaseModel);

    const expected = new HardWorkEntry(
      "Test Hard Work Entry",
      new Timestamp(2020, "January", 1)
    );
    expected.careerImprovementClientId = databaseModel.careerImprovementClientId;

    expect(inMemoryModel.equals(expected)).toBe(true);
  });
});
