import {AchievementCsvRowConverter} from '../achievement.csv.row.converter';
import {HardWorkEntry} from '../../pojo/hard.work.entry';
import {Timestamp} from '../../pojo/timestamp';

describe('Achievement Csv Row Converter', () => {
    it('should be able to convert an normal achievement into a row', () => {
        const testObject = new AchievementCsvRowConverter();
        const achievement = new HardWorkEntry('Test', new Timestamp(2018, 'January', 3));

        expect(testObject.convert(achievement)).toBe('"Test","January 3, 2018"');
    });
});