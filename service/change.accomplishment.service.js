import { AchievementFinder } from "../database/achievement.finder";
import {LogAccomplishmentService} from "./log.accomplishment.service";
import {HardWorkEntry} from '../pojo/hard.work.entry';

export class ChangeAccomplishmentService {

    constructor(database) {
        this.database = database;
    }

    async change(careerImprovementClient, original, newAccomplishmentText) {
        const accomplishmentFinder = new AchievementFinder(this.database);
        let accomplishments;
        try {
            accomplishments = await accomplishmentFinder.findByAccomplishment(original);
        } catch (e) {
            throw new Error('Could not read accomplishments from database');
        }
        if (accomplishments.length === 0) {
            throw new Error('Could not find accomplishment [' + original.toString() + '] within the database')
        }

        careerImprovementClient.remove(original);

        try {
            await this.database.delete(accomplishments);
        } catch (e) {
            throw new Error('Could not delete accomplishment from database');
        }

        const logAccomplishmentService = new LogAccomplishmentService(this.database);
        const changed = new HardWorkEntry(newAccomplishmentText, original.getAccomplishedOn().copy());

        try {
            await logAccomplishmentService.log(careerImprovementClient, changed);
        } catch (e) {
            throw new Error('Could not create accomplishment, database call failed');
        }
    }
}
