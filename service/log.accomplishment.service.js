import { AchievementFinder } from "../database/achievement.finder";

export class LogAccomplishmentService {
  constructor(database) {
    this.database = database;
  }

  async log(careerImprovementClient, accomplishment, goal) {
    console.log(careerImprovementClient.id);
    // const finder = new AchievementFinder(this.database);
    // let accomplishments;
    // try {
    //   accomplishments = await finder.findByAccomplishment(accomplishment);
    // } catch (e) {
    //   throw new Error('Could not log accomplishment because of [' + e.message + ']');
    // }

    // if (accomplishments.length >= 1) {
    //   throw new Error(
    //     "Accomplishment [" +
    //       accomplishment.getAccomplishment() +
    //       "] already exised in database with timestamp [" +
    //       accomplishment.getAccomplishedOn().toString() +
    //       "]"
    //   );
    // }

    careerImprovementClient.log(accomplishment, goal);
    console.log(careerImprovementClient);
    await this.database.update(careerImprovementClient);
    // this.database.create(accomplishment);
  }
}
