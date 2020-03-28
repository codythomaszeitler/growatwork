import {LogAccomplishmentService} from '../log.accomplishment.service';
import {CareerImprovementClient} from '../../pojo/career.improvement.client';
import {HardWorkEntry} from '../../pojo/hard.work.entry';
import {Timestamp} from '../../pojo/timestamp';
import {MockDatabase} from '../../database/__tests__/mock.database';
import {ChangeAccomplishmentService} from '../change.accomplishment.service';
import {AchievementFinder} from '../../database/achievement.finder';

describe('Change Accomplishment Service', () => {

    let careerImprovementClient;
    let database;

    beforeEach(() => {
        careerImprovementClient = new CareerImprovementClient();
        database = new MockDatabase();
    });

    it('should be able to change an accomplishment in the database', async () => {
        const testObject = new ChangeAccomplishmentService(database);

        const original = new HardWorkEntry('Old Accomplishment', new Timestamp(2019, 'January', 1));

        const addLogService = new LogAccomplishmentService(database);
        await addLogService.log(careerImprovementClient, original);

        await testObject.change(careerImprovementClient, original, 'New Accomplishment');

        const accomplishmentFinder = new AchievementFinder(database);
        const expected = new HardWorkEntry('New Accomplishment', original.getAccomplishedOn());
        const accomplishments = await accomplishmentFinder.findByAccomplishment(expected);

        expect(accomplishments.length).toBe(1);
        expect(careerImprovementClient.contains(expected)).toBe(true);
        expect(careerImprovementClient.contains(original)).toBe(false);
    });

    it('should throw an exception if the read to the database fails', async () => {
        const logAccomplishmentService = new LogAccomplishmentService(database);
        const accomplishment = new HardWorkEntry('Test Accomplishment', new Timestamp(2019, "January", 1));
        await logAccomplishmentService.log(careerImprovementClient, accomplishment);

        database.read = function() {
            throw new Error('NOTCONNECTED');
        }

        const testObject = new ChangeAccomplishmentService(database);

        let caughtException = null;
        try {
            await testObject.change(careerImprovementClient, accomplishment, 'Never going to happen');
        } catch (e) {
            caughtException = e;
        }

        expect(caughtException.message).toBe("Could not find accomplishments from database because of [NOTCONNECTED]");
    });

    it('should throw an exception if the delete call to the database fails', async () => {
        const logAccomplishmentService = new LogAccomplishmentService(database);
        const accomplishment = new HardWorkEntry('Test Accomplishment', new Timestamp(2019, "January", 1));
        await logAccomplishmentService.log(careerImprovementClient, accomplishment);

        database.delete = function() {
            throw new Error('NOTCONNECTED');
        }

        const testObject = new ChangeAccomplishmentService(database);

        let caughtException = null;
        try {
            await testObject.change(careerImprovementClient, accomplishment, 'Never going to happen');
        } catch (e) {
            caughtException = e;
        }

        expect(caughtException.message).toBe("Delete call to database failed");
    });

    it('should throw an exception if the create call to the database fails', async () => {
        const logAccomplishmentService = new LogAccomplishmentService(database);
        const accomplishment = new HardWorkEntry('Test Accomplishment', new Timestamp(2019, "January", 1));
        await logAccomplishmentService.log(careerImprovementClient, accomplishment);

        database.create = function() {
            throw new Error('NOTCONNECTED');
        }

        const testObject = new ChangeAccomplishmentService(database);

        let caughtException = null;
        try {
            await testObject.change(careerImprovementClient, accomplishment, 'Never going to happen');
        } catch (e) {
            caughtException = e;
        }

        expect(caughtException.message).toBe('Could not create accomplishment, database call failed');
    });

    it('should throw an exception if the original accomplishment given does not exist within the database', async () => {
        const accomplishment = new HardWorkEntry('Test Accomplishment', new Timestamp(2019, "January", 1));
        const testObject = new ChangeAccomplishmentService(database)

        let caughtException = null;
        try {
            await testObject.change(careerImprovementClient, accomplishment, 'New Text');
        } catch (e) {
            caughtException = e;
        }

        expect(caughtException.message).toBe('Could not find an accomplishment matching [' + accomplishment.toString() + '] within the database');
    });
});