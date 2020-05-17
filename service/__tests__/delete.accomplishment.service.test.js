import { HardWorkEntry } from "../../pojo/hard.work.entry";
import { Timestamp } from "../../pojo/timestamp";
import { Goal } from "../../pojo/goal";
import { CareerImprovementClient } from "../../pojo/career.improvement.client";
import {AddGoalService} from '../add.goal.service';
import { LogAccomplishmentService } from "../log.accomplishment.service";
import { DeleteAccomplishmentService } from "../delete.accomplishment.service";
import { MockDatabase } from "../../database/__tests__/mock.database";

describe("Delete Accomplishment Service", () => {
  let careerImprovementClient;
  let database;
  beforeEach(() => {
    database = new MockDatabase();
    careerImprovementClient = new CareerImprovementClient();

    database.create(careerImprovementClient);
  });

  it("should delete an accomplishment that exists within the database", async () => {
    const accomplishment = new HardWorkEntry(
      "Test",
      new Timestamp(2019, "January", 1)
    );
    const logAccomplishmentService = new LogAccomplishmentService(database);
    await logAccomplishmentService.log(
      careerImprovementClient,
      accomplishment.copy()
    );

    const testObject = new DeleteAccomplishmentService(database);
    await testObject.delete(careerImprovementClient, accomplishment.copy());

    expect(careerImprovementClient.contains(accomplishment)).toBe(false);
  });

  it("should rollback the accomplishment delete if the update call fails", async () => {
    const accomplishment = new HardWorkEntry(
      "Test",
      new Timestamp(2019, "January", 1)
    );
    const logAccomplishmentService = new LogAccomplishmentService(database);
    await logAccomplishmentService.log(
      careerImprovementClient,
      accomplishment.copy()
    );
    expect(careerImprovementClient.getHardWork().length).toBe(1);

    database.update = function () {
      throw new Error("Update failed");
    };

    const testObject = new DeleteAccomplishmentService(database);
    try {
      await testObject.delete(careerImprovementClient, accomplishment.copy());
      expect(false).toBeTruthy();
    } catch (e) {
      const accomplishments = careerImprovementClient.getHardWork();
      expect(accomplishments.length).toBe(1);
    }
  });

  it("should rollback the accomplishment delete if the update call fails, when there is an associated goal", async () => {
    const accomplishment = new HardWorkEntry(
      "Test",
      new Timestamp(2019, "January", 1)
    );
    const goal = new Goal("Associated");

    const addGoalService = new AddGoalService(database);
    await addGoalService.addGoal(careerImprovementClient, goal);

    const logAccomplishmentService = new LogAccomplishmentService(database);
    await logAccomplishmentService.log(
      careerImprovementClient,
      accomplishment.copy(),
      goal
    );
    expect(careerImprovementClient.getHardWork().length).toBe(1);

    database.update = function () {
      throw new Error("Update failed");
    };

    const testObject = new DeleteAccomplishmentService(database);
    try {
      await testObject.delete(careerImprovementClient, accomplishment.copy());
      expect(false).toBeTruthy();
    } catch (e) {
      const accomplishments = careerImprovementClient.getHardWork();
      expect(accomplishments.length).toBe(1);

      const goals = careerImprovementClient.getGoals();
      let hasAssociation = false;
      for (let i = 0; i < goals.length; i++) {
        if (goals[i].hasAccomplishment(accomplishments[0])) {
          hasAssociation = true;
          break;
        }
      }
      expect(hasAssociation).toBe(true);
    }
  });

  it("should throw an exception if there are no accomplishments matching the given accomplishment", async () => {
    const accomplishment = new HardWorkEntry(
      "Test",
      new Timestamp(2019, "January", 1)
    );
    const testObject = new DeleteAccomplishmentService(database);

    let caughtException = null;
    try {
      await testObject.delete(careerImprovementClient, accomplishment.copy());
    } catch (e) {
      caughtException = e;
    }

    expect(caughtException.message).toBe(
      "Could not find an accomplishment matching [" +
        accomplishment.toString() +
        "] within the database"
    );
  });
});
