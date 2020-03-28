import { AchievementFinder } from "../database/achievement.finder";

export class LogAccomplishmentService {
  constructor(database) {
    this.database = database;
  }

  log(careerImprovementClient, accomplishment) {
    const finder = new AchievementFinder(this.database);
    const accomplishments = finder.findByAccomplishment(accomplishment);
    if (accomplishments.length >= 1) {
      throw new Error(
        "Accomplishment [" +
          accomplishment.getAccomplishment() +
          "] already exised in database with timestamp [" +
          accomplishment.getAccomplishedOn().toString() +
          "]"
      );
    }

    careerImprovementClient.log(accomplishment);
    this.database.create(accomplishment);
  }
}
