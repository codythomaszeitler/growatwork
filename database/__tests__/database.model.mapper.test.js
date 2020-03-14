import { HardWorkEntry } from "../../pojo/hard.work.entry";
import { Timestamp } from "../../pojo/timestamp";
import { CareerImprovementClient } from "../../pojo/career.improvement.client";
import { DatabaseModelMapper } from "../database.model.mapper";

describe("Database Model Mapper for Achievement", () => {
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

    expect(databaseModel.body.careerImprovementClientId).toBe(
      inMemory.careerImprovementClientId
    );
    expect(databaseModel.body.accomplishment).toBe(
      inMemory.getAccomplishment()
    );
    expect(databaseModel.body.accomplishedOn).toBe(
      "Wed Jan 01 2020 00:00:00 GMT-0700 (Mountain Standard Time)"
    );
  });

  it("should convert from database to in memory", () => {
    const databaseModel = {
      body: {
        careerImprovementClientId: 1000,
        accomplishment: "Test Hard Work Entry",
        accomplishedOn:
          "Wed Jan 01 2020 00:00:00 GMT-0700 (Mountain Standard Time)",
        type : 'achievement'
      }
    };

    const testObject = new DatabaseModelMapper();
    const inMemoryModel = testObject.toInMemoryModel(databaseModel);

    const expected = new HardWorkEntry(
      "Test Hard Work Entry",
      new Timestamp(2020, "January", 1)
    );
    expected.careerImprovementClientId =
      databaseModel.careerImprovementClientId;

    expect(inMemoryModel.equals(expected)).toBe(true);
  });
});

describe("Database Model Mapper for Career Improvement Client", () => {

  it('converting from in memory to database', () => {
    const careerImprovementClient = new CareerImprovementClient("codyzeitler12@gmail.com", "username");

    const testObject = new DatabaseModelMapper();
    const databaseModel = testObject.toDatabaseModel(careerImprovementClient);

    const expected = {
      body : {
        username : "username", 
        email : "codyzeitler12@gmail.com",
        type : 'careerimprovementclient'
      }
    }

    expect(databaseModel.body.username).toBe(expected.body.username);
    expect(databaseModel.body.email).toBe(expected.body.email);
    expect(databaseModel.body.type).toBe(expected.body.type);
  });

  it('should convert from database to in memory', () => {
    const databaseModel = {
      body : {
        username : "username", 
        email : "codyzeitler12@gmail.com",
        type : 'careerimprovementclient'
      }
    }

    const testObject = new DatabaseModelMapper();
    const inMemoryModel = testObject.toInMemoryModel(databaseModel);

    expect(databaseModel.body.username).toEqual(inMemoryModel.getUsername());
    expect(databaseModel.body.email).toEqual(inMemoryModel.getEmail());

  });
});
