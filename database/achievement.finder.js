import { AchievementMapper } from "./achievement.mapper";
import { Query } from "../database/database";
import * as queries from "../graphql/queries";

export class AchievementFinder {
  constructor(database) {
    this.database = database;
    this.numRecordsPerQuery = 100000;
  }

  async findByAccomplishment(toFind) {
    let readResults;
    try {
      readResults = {
        data : {
          listAchievements : {
            items : await this.readAllAchievements()
          } 
        }
      }
    } catch (e) {
      throw new Error(
        "Could not find accomplishments from database because of [" +
          e.message +
          "]"
      );
    }
    if (!readResults) {
      throw new Error('Database read with query [queries.listAchievements] returned nothing');
    }
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
      const query = new Query(queries.listAchievements, {
        limit : this.numRecordsPerQuery,
        nextToken : nextToken
      });
      let readResults = await this.database.read(query);

      achievements.push(...readResults.data.listAchievements.items);

      nextToken = readResults.data.listAchievements.nextToken;
    } while (nextToken);

    return achievements;
  }
}
