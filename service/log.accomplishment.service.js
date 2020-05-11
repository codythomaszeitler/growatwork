import { AchievementFinder } from "../database/achievement.finder";

export class LogAccomplishmentService {
  constructor(database) {
    this.database = database;
  }

  async log(careerImprovementClient, accomplishment, goal) {
    careerImprovementClient.log(accomplishment, goal);
    await this.database.update(careerImprovementClient);
  }
}
