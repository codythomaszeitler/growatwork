import {Timestamp} from '../pojo/timestamp';
import {HardWorkEntry} from '../pojo/hard.work.entry';

export class DatabaseModelMapper {

    toDatabaseModel(inMemoryModel) {
        const databaseModel = {
            careerImprovementClientId : inMemoryModel.careerImprovementClientId,
            accomplishment : inMemoryModel.getAccomplishment(),
            accomplishedOn: inMemoryModel.getAccomplishedOn().toDate().toString()
        };
        return databaseModel;
    }

    toInMemoryModel(databaseModel) {
        const asDate = new Date(databaseModel.accomplishedOn);
        const asTimestamp = Timestamp.fromDate(asDate);
        const accomplishment = new HardWorkEntry(databaseModel.accomplishment, asTimestamp);
        accomplishment.careerImprovementClientId = databaseModel.careerImprovementClientId;

        return accomplishment;
    }

}