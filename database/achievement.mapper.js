import { Timestamp } from "../pojo/timestamp";
import { HardWorkEntry } from "../pojo/hard.work.entry";
import { TimestampMapper } from "./timestamp.mapper";

export class AchievementMapper {
  toDatabaseModel(inMemoryModel) {
    const timestampMapper = new TimestampMapper();
    const timestampDatabaseModel = timestampMapper.toDatabaseModel(
      inMemoryModel.getAccomplishedOn()
    );

    return {
      input: {
        achievementCareerImprovementClientId:
          inMemoryModel.careerImprovementClientId,
        achievement: inMemoryModel.getAccomplishment(),
        accomplishedOn: timestampDatabaseModel
      }
    };
  }

  toInMemoryModel(databaseModel) {
    let contents;

    if (databaseModel.data.createAchievement) {
      contents = [databaseModel.data.createAchievement];
    }

    if (databaseModel.data.listAchievements) {
      contents = databaseModel.data.listAchievements.items;
    }

    const accomplishments = [];

    if (contents.length) {
      for (let i = 0; i < contents.length; i++) {
        const content = contents[i];

        const timestampMapper = new TimestampMapper();
        const timestamp = timestampMapper.toInMemoryModel(content.accomplishedOn);

        const accomplishment = new HardWorkEntry(content.achievement, timestamp);
        accomplishment.username = content.username;
        accomplishment.id = content.id;

        accomplishments.push(accomplishment);
      }
    }
    
    return accomplishments;
  }
}
