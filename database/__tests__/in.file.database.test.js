import { CareerImprovementClient } from "../../pojo/career.improvement.client";
import { InFileCareerImprovementClientMapper } from "../in.file.database";
import { HardWorkEntry } from "../../pojo/hard.work.entry";
import { Timestamp } from "../../pojo/timestamp";
import { AccomplishmentMapper } from "../accomplishment.mapper";

describe("", () => {
  let testObject;
  let client;

  beforeEach(() => {
    client = new CareerImprovementClient("codyzeitler12@gmail.com", "Guest");
    testObject = new InFileCareerImprovementClientMapper();
  });

  it("should be able to transform into file format when there are no accomplishments or goals", () => {
    const expected = {
      email: client.getEmail(),
      username: client.getUsername(),
      accomplishments: [],
      goals: [],
      id: null,
      type: CareerImprovementClient.getType(),
    };
    expect(testObject.toDatabaseModel(client)).toEqual(expected);
  });

  it("should be able to transform into file format when there are accomplishments", () => {
    const accomplishment = new HardWorkEntry("Test", new Timestamp(2010, 1, 1));
    client.log(accomplishment);

    const accomplishmentMapper = new AccomplishmentMapper();

    const expected = {
      email: client.getEmail(),
      username: client.getUsername(),
      accomplishments: [accomplishmentMapper.toDatabaseModel(accomplishment)],
      goals : [],
      id : null,
      type : CareerImprovementClient.getType()
    };

    expect(testObject.toDatabaseModel(client)).toEqual(expected);
  });
});
