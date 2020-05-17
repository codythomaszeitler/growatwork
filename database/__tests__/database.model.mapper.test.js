import { CareerImprovementClient } from "../../pojo/career.improvement.client";
import { DatabaseModelMapper } from "../database.model.mapper";

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
