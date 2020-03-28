import {AchievementFinder} from '../achievement.finder';
import {MockDatabase} from './mock.database';
import {HardWorkEntry} from '../../pojo/hard.work.entry';
import {Timestamp} from '../../pojo/timestamp';

describe('Achievement Finder', () => {

    let database;
    beforeEach(() => {
        database = new MockDatabase();
    });

    it('should be able to find all accomplishments matching the given accomplishment', async () => {
        const accomplishment = new HardWorkEntry('Test', new Timestamp(2019, 'January', 1));
        database.create(accomplishment);

        const testObject = new AchievementFinder(database);
        const accomplishments = await testObject.findByAccomplishment(accomplishment.copy()); 

        expect(accomplishments.length).toBe(1);
    });
});