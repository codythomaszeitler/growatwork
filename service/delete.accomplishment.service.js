import { AchievementFinder } from "../database/achievement.finder";

export class DeleteAccomplishmentService {
  constructor(database) {
    this.database = database;
  }

  async delete(careerImprovementClient, accomplishment) {
    if (!careerImprovementClient.contains(accomplishment)) {
      if (accomplishments.length === 0) {
        throw new Error(
          "Could not find an accomplishment matching [" +
            accomplishment.toString() +
            "] within the database"
        );
      }
    }

    careerImprovementClient.remove(accomplishment);
    this.database.update(careerImprovementClient);
  }
}
