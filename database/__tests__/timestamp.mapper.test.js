import {TimestampMapper} from '../timestamp.mapper';
import {Timestamp} from '../../pojo/timestamp';

describe('Timestamp Mapper Test', () => {

    it('should convert from timestamp to database string', () => {
        const timestamp = new Timestamp(2020, 'January', 1, 1, 10, 10);
        const testObject = new TimestampMapper();

        expect('2020-01-01T01:10:10.000-07:00').toBe(testObject.toDatabaseModel(timestamp).utc);
        expect(testObject.toDatabaseModel(timestamp).timezone).toBeTruthy();
    });

    it('should convert from database model to timestamp', () => {
        const databaseModel = {
            utc : '2020-01-01T01:01:10.000-07:00',
            timezone: 'America/Phoenix'
        };

        const testObject = new TimestampMapper();
        const timestamp = testObject.toInMemoryModel(databaseModel);

        const expected = new Timestamp(2020, 'January', 1, 1, 1, 10);
        expect(expected.equals(timestamp)).toBe(true);
    });
});