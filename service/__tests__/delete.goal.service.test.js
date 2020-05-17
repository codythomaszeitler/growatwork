import {AddGoalService} from '../../service/add.goal.service';
import {DeleteGoalService} from '../../service/delete.goal.service';
import {LogAccomplishmentService} from '../../service/log.accomplishment.service';
import {CareerImprovementClient} from '../../pojo/career.improvement.client';
import {Goal} from '../../pojo/goal';
import {Timestamp} from '../../pojo/timestamp';
import {MockDatabase} from '../../database/__tests__/mock.database';
import { HardWorkEntry } from '../../pojo/hard.work.entry';

describe('Delete Goal Service', () => {

    let testObject;

    let database;
    let client;
    let goal;

    beforeEach(async () => {
        database = new MockDatabase();
        client = new CareerImprovementClient('codyzeitler12@gmail.com', 'Guest');
        goal = new Goal('Test');

        database.create(client);

        const addGoalService = new AddGoalService(database);
        await addGoalService.addGoal(client, goal);

        testObject = new DeleteGoalService(database);
    });

    it('should remove goal without associated accomplishments', async () => {
        await testObject.removeGoal(client, goal);
        expect(client.getGoals().length).toBe(0);
    });

    it('should remove goal with associated accomplishments, should deassociate accomplishment', async () => {

        const accomplishments = [];
        for (let i = 0; i < 10; i++) {
            const accomplishment = new HardWorkEntry('Test ' + i, new Timestamp(2010, 1, 1));

            const logAccomplishmentService = new LogAccomplishmentService(database);

            if (i % 2 == 0) {
                await logAccomplishmentService.log(client, accomplishment, goal);
            } else {
                await logAccomplishmentService.log(client, accomplishment);
            }

            accomplishments.push(accomplishment);
        }

        await testObject.removeGoal(client, goal);

        for (let i = 0; i < accomplishments.length; i++) {
            expect(client.getAssociatedGoal(accomplishments[i])).toBeNull();
        }
    });
});