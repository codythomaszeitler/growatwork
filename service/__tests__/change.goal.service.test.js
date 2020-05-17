import { Goal } from "../../pojo/goal";
import { CareerImprovementClient } from "../../pojo/career.improvement.client";
import { ChangeGoalService } from "../change.goal.service";
import { AddGoalService } from "../add.goal.service";
import { MockDatabase } from "../../database/__tests__/mock.database";
import { HardWorkEntry } from "../../pojo/hard.work.entry";
import { Timestamp } from "../../pojo/timestamp";

describe("Change Goal Service", () => {
  let testObject;

  let database;

  let client;
  let goal;

  beforeEach(() => {
    goal = new Goal("Before");
    client = new CareerImprovementClient("codyzeitler12@gmail.com", "Guest");

    database = new MockDatabase();
    database.create(client);

    const addGoalService = new AddGoalService(database);
    addGoalService.addGoal(client, goal);

    testObject = new ChangeGoalService(database);
  });

  it("should be able to change the name of a goal", () => {
    expect(client.getGoal(goal)).toBeTruthy();
    testObject.changeGoalName(client, goal, "After");
    expect(client.getGoal(goal)).toBeFalsy();

    expect(client.getGoal(new Goal("After"))).toBeTruthy();
    expect(client.getGoals().length).toBe(1);
  });

  it("should be able to change the name of a goal with accomplishments", () => {
    for (let i = 0; i < 10; i++) {
      client.log(
        new HardWorkEntry("Test " + i, new Timestamp(2010, 1, 1)),
        goal
      );
    }

    testObject.changeGoalName(client, goal, "After");

    let accomplishments = client
      .getGoal("After")
      .getAssociatedAccomplishments();
    expect(accomplishments.length).toBe(10);
    expect(client.getGoal("Before")).toBeNull();
  });

  it("should undo the change if the call to update failed", () => {
    database.update = function () {
      throw new Error("Update failed");
    };

    try {
      testObject.changeGoalName(client, goal, "After");
      expect(true).toBeFalsy();
    } catch (e) {
      expect(client.getGoal(goal)).toBeTruthy();
      expect(client.getGoal(new Goal("After"))).toBeFalsy();
    }
  });
});
