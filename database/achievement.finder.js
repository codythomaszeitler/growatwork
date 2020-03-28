import { AchievementMapper } from "./achievement.mapper";
import {Query} from '../database/database';
import * as queries from "../graphql/queries";

export class AchievementFinder {
  constructor(database) {
    this.database = database;
    this.numRecordsPerQuery = 100000;
  }

  async findByAccomplishment(toFind) {
    const query = new Query(queries.listAchievements);
    const readResults = await this.database.read(query);

    const mapper = new AchievementMapper();
    const accomplishments = mapper.toInMemoryModel(readResults); 

    return accomplishments.filter(function(accomplishment) {
      return accomplishment.equals(toFind);
    });
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
