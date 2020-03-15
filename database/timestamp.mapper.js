import {DateTime} from 'luxon';
import {Timestamp} from '../pojo/timestamp';

export class TimestampMapper {
  toDatabaseModel(timestamp) {
    const datetime = DateTime.fromJSDate(timestamp.toDate());

    const databaseModel = {
        utc : datetime.toISODate(),
        timezone : datetime.zoneName
    }
    return databaseModel;
  }

  toInMemoryModel(databaseModel) {
    const datetime = DateTime.fromISO(databaseModel.utc, {
      zone : databaseModel.timezone
    });

    const timestamp = new Timestamp(datetime.year, datetime.month, datetime.day);
    return timestamp;
  }
}
