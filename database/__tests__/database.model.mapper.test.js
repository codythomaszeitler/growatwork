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

    expect(databaseModel.input.achievementCareerImprovementClientId).toBe(
      inMemory.careerImprovementClientId
    );
    expect(databaseModel.input.achievement).toBe(inMemory.getAccomplishment());
    expect(databaseModel.input.accomplishedOn.utc).toBe(
      "2020-01-01T00:00:00.000-07:00"
    );
  });

  it("should convert from database to in memory", () => {
    const databaseModel = {
      data: {
        createAchievement: {
          careerImprovementClientId: 1000,
          achievement: "Test Hard Work Entry",
          accomplishedOn: {
            utc: "2020-01-01T00:00:00.000-07:00",
            zone: "America/Phoenix"
          },
          type: "achievement"
        }
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

    expect(inMemoryModel[0].equals(expected)).toBe(true);
  });
});

describe("Database Model Mapper for Career Improvement Client", () => {
  it("converting from in memory to database", () => {
    const careerImprovementClient = new CareerImprovementClient(
      "codyzeitler12@gmail.com",
      "username"
    );

    const testObject = new DatabaseModelMapper();
    const databaseModel = testObject.toDatabaseModel(careerImprovementClient);

    const expected = {
      input: {
        username: "username",
        email: "codyzeitler12@gmail.com",
        type: "careerimprovementclient"
      }
    };

    expect(databaseModel.input.username).toBe(expected.input.username);
    expect(databaseModel.input.email).toBe(expected.input.email);
  });

  it("should convert from database to in memory", () => {
    const databaseModel = {
      data: {
        listCareerImprovementClients: {
          items: [
            {
              username: "username",
              email: "codyzeitler12@gmail.com",
              type: "careerimprovementclient"
            }
          ]
        }
      }
    };

    const testObject = new DatabaseModelMapper();
    const inMemoryModel = testObject.toInMemoryModel(databaseModel);

    expect("username").toEqual(inMemoryModel.getUsername());
    expect("codyzeitler12@gmail.com").toEqual(inMemoryModel.getEmail());
  });
});
