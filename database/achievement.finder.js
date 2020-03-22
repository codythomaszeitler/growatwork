import { AchievementMapper } from "./achievement.mapper";
import * as queries from "../graphql/queries";

export class AchievementFinder {
  constructor(database) {
    this.database = database;
    this.numRecordsPerQuery = 100000;
  }

  async findByUsername(username) {
    const databaseResult = {
      data: {
        listAchievements: {
          items: await this.readAllAchievements()
        }
      }
    };

    const mapper = new AchievementMapper();
    const achievements = mapper.toInMemoryModel(databaseResult);

    return achievements;
  }

  async readAllAchievements() {
      const achievements = [];

      let nextToken = undefined;
      do {
        let readResults = await this.database.read(queries.listAchievements, {
          limit: this.numRecordsPerQuery,
          nextToken : nextToken
        });
  
        achievements.push(
          ...readResults.data.listAchievements.items
        );
  
        nextToken = readResults.data.listAchievements.nextToken;
      } while (nextToken);

      return achievements;
  }
}
