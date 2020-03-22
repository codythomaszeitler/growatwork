import {DateTime} from 'luxon';
import {Timestamp} from '../pojo/timestamp';

export class TimestampMapper {
  toDatabaseModel(timestamp) {
    const datetime = DateTime.fromJSDate(timestamp.toDate());

    const databaseModel = {
        utc : datetime.toISO(),
        timezone : datetime.zoneName
    }
    return databaseModel;
  }

  toInMemoryModel(databaseModel) {
    const datetime = DateTime.fromISO(databaseModel.utc, {
      zone : databaseModel.timezone
    });

    const timestamp = new Timestamp(datetime.year, datetime.month, datetime.day, datetime.hour, datetime.minute, datetime.second);
    return timestamp;
  }
}
