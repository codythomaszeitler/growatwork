import { CareerImprovementClient } from "../../pojo/career.improvement.client";
import { InFileCareerImprovementClientMapper } from "../in.file.database";
import { HardWorkEntry } from "../../pojo/hard.work.entry";
import { Goal } from "../../pojo/goal";
import { Timestamp } from "../../pojo/timestamp";
import { AccomplishmentMapper } from "../accomplishment.mapper";
import { GoalMapper } from "../goal.mapper";

describe("In File Database", () => {
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
      goals: [],
      id: null,
      type: CareerImprovementClient.getType(),
    };

    expect(testObject.toDatabaseModel(client)).toEqual(expected);
  });

  it("should be able to transform into file format when there are goals and accomplishments", () => {
    const goal = new Goal("Test");
    client.addGoal(goal);
    const goalMapper = new GoalMapper();

    const accomplishment = new HardWorkEntry("Test", new Timestamp(2010, 1, 1));
    client.log(accomplishment, goal);
    const accomplishmentMapper = new AccomplishmentMapper();

    const expected = {
      email: client.getEmail(),
      username: client.getUsername(),
      accomplishments: [accomplishmentMapper.toDatabaseModel(accomplishment)],
      goals: [goalMapper.toDatabaseModel(client.getGoal(goal))],
      id: null,
      type: CareerImprovementClient.getType(),
    };

    expect(testObject.toDatabaseModel(client)).toEqual(expected);
  });

  it("should be able to convert from in memory to database into in memory", () => {
    const goal = new Goal("Test");
    client.addGoal(goal);

    for (let i = 0; i < 10; i++) {
      const accomplishment = new HardWorkEntry(
        "Test " + i,
        new Timestamp(2010, 1, 1)
      );
      client.log(accomplishment, goal);
    }

    const secondGoal = new Goal("Second Goal");
    client.addGoal(secondGoal);

    for (let i = 0; i < 10; i++) {
      const accomplishment = new HardWorkEntry(
        "Second " + i,
        new Timestamp(2010, 1, 1)
      );
      client.log(accomplishment, secondGoal);
    }

    const databaseModel = testObject.toDatabaseModel(client);
    const inMemory = testObject.toInMemoryModel(databaseModel);

    expect(client.getGoals()).toEqual(inMemory.getGoals());
    expect(client.getHardWork()).toEqual(inMemory.getHardWork());
  });
});
