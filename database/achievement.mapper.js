import {Timestamp} from '../pojo/timestamp';
import {HardWorkEntry} from '../pojo/hard.work.entry';

export class AchievementMapper {
  toDatabaseModel(inMemoryModel) {
    return {
      body: {
        careerImprovementClientId: inMemoryModel.careerImprovementClientId,
        accomplishment: inMemoryModel.getAccomplishment(),
        accomplishedOn: inMemoryModel
          .getAccomplishedOn()
          .toDate()
          .toString()
      }
    };
  }

  toInMemoryModel(databaseModel) {
    const asDate = new Date(databaseModel.body.accomplishedOn);
    const asTimestamp = Timestamp.fromDate(asDate);
    const accomplishment = new HardWorkEntry(
      databaseModel.body.accomplishment,
      asTimestamp
    );
    accomplishment.careerImprovementClientId =
      databaseModel.body.careerImprovementClientId;

    return accomplishment;
  }
}
