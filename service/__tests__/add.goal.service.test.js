import { AddGoalService } from "../add.goal.service";
import { CareerImprovementClient } from "../../pojo/career.improvement.client";
import { Goal } from "../../pojo/goal";
import { MockDatabase, Query } from "../../database/__tests__/mock.database";
import * as queries from "../../graphql/queries";
import { CareerImprovementClientMapper } from "../../database/career.improvement.client.mapper";

describe("Add Goal Service", () => {
  let testObject;

  let client;
  let goal;
  let database;

  beforeEach(() => {
    client = new CareerImprovementClient("codyzeitler12@gmail.com", "Guest");
    goal = new Goal("Test");
    database = new MockDatabase();

    database.create(client);

    testObject = new AddGoalService(database);
  });

  it("should add a goal to the database when given an associated client", () => {
    testObject.addGoal(client, goal);

    const goals = client.getGoals();
    expect(goals.length).toBe(1);

    expect(goals[0].equals(new Goal("Test"))).toBeTruthy();

    const mapper = new CareerImprovementClientMapper();
    const clientInDatabase = mapper.toInMemoryModel(
      database.read(new Query(queries.listCareerImprovementClients))
    );
    expect(clientInDatabase.getGoals().length).toBe(1);
    expect(
      clientInDatabase.getGoals()[0].equals(new Goal("Test"))
    ).toBeTruthy();
  });

  it("should rollback the goal addition when the database update call failed", () => {
    database.update = function () {
      throw new Error("Update failed");
    };

    try {
      testObject.addGoal(client, goal);
      expect(false).toBeTruthy();
    } catch (e) {
      const mapper = new CareerImprovementClientMapper();
      const clientInDatabase = mapper.toInMemoryModel(
        database.read(new Query(queries.listCareerImprovementClients))
      );

      expect(clientInDatabase.getGoals().length).toBe(0);
    }
  });
});
