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
        database.create(new HardWorkEntry('Not the same', new Timestamp(2019, 'January', 1)));

        const testObject = new AchievementFinder(database);
        const accomplishments = await testObject.findByAccomplishment(accomplishment.copy()); 

        expect(accomplishments.length).toBe(1);
    });

    it('should return empty if there are no accomplishments in the database', async () => {
        const testObject = new AchievementFinder(database);
        const accomplishments = await testObject.findByAccomplishment(new HardWorkEntry('Test', new Timestamp(2019, 'January', 1)));

        expect(accomplishments.length).toBe(0);
    });

    it('should throw an exception if there is no connection to the database', async () => {
        let caughtException = null;

        database.read = function() {
            throw new Error("DISCONNECTED");
        }

        const testObject = new AchievementFinder(database);
        try {
            await testObject.findByAccomplishment(new HardWorkEntry('Test', new Timestamp(2019, 'January', 1)));
        } catch (e) {
            caughtException = e;
        }
        
        expect(caughtException.message).toBe('Could not find accomplishments from database because of [' + 'DISCONNECTED' + ']')
    });

    it('should throw an exception if the result returns falsy', async () => {
        database.read = function() {
            return null;
        }

        let caughtException = null;
        const testObject = new AchievementFinder(database);
        try {
            await testObject.findByAccomplishment(new HardWorkEntry('Test', new Timestamp(2019, 'January', 1)));
        } catch (e) {
            caughtException = e;
        }

        expect(caughtException.message).toBe("Could not find accomplishments from database because of [Cannot read property 'data' of null]");
    });
});