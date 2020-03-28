import { HardWorkEntry } from "../../pojo/hard.work.entry";
import { Timestamp } from "../../pojo/timestamp";
import { CareerImprovementClient } from "../../pojo/career.improvement.client";
import { LogAccomplishmentService } from "../log.accomplishment.service";
import { DeleteAccomplishmentService } from "../delete.accomplishment.service";
import { MockDatabase } from "../../database/__tests__/mock.database";
import { AchievementFinder } from "../../database/achievement.finder";

describe("Delete Accomplishment Service", () => {
  let careerImprovementClient;
  let database;
  beforeEach(() => {
    database = new MockDatabase();
    careerImprovementClient = new CareerImprovementClient();
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

    const accomplishmentFinder = new AchievementFinder(database);
    expect(
      await accomplishmentFinder.findByAccomplishment(accomplishment.copy())
    ).toEqual([]);
    expect(careerImprovementClient.contains(accomplishment)).toBe(false);
  });

  it("should throw an exception if the database fails on a call to delete", async () => {
    const accomplishment = new HardWorkEntry(
      "Test",
      new Timestamp(2019, "January", 1)
    );
    const logAccomplishmentService = new LogAccomplishmentService(database);
    await logAccomplishmentService.log(
      careerImprovementClient,
      accomplishment.copy()
    );

    database.delete = function() {
      throw new Error("DISCONNECTED");
    };

    const testObject = new DeleteAccomplishmentService(database);

    let caughtException = null;
    try {
      await testObject.delete(careerImprovementClient, accomplishment.copy());
    } catch (e) {
      caughtException = e;
    }

    expect(caughtException.message).toBe("Delete call to database failed");
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

    expect(caughtException.message).toBe('Could not find an accomplishment matching [' + accomplishment.toString() + '] within the database');

  });
});
