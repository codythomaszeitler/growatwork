import { AchievementFinder } from "../database/achievement.finder";
import {LogAccomplishmentService} from "./log.accomplishment.service";
import {HardWorkEntry} from '../pojo/hard.work.entry';
import {DeleteAccomplishmentService} from './delete.accomplishment.service';

export class ChangeAccomplishmentService {

    constructor(database) {
        this.database = database;
    }

    async change(careerImprovementClient, original, newAccomplishmentText) {
        const deleteAccomplishmentService = new DeleteAccomplishmentService(this.database);
        await deleteAccomplishmentService.delete(careerImprovementClient, original.copy());

        const logAccomplishmentService = new LogAccomplishmentService(this.database);
        const changed = new HardWorkEntry(newAccomplishmentText, original.getAccomplishedOn().copy());

        try {
            await logAccomplishmentService.log(careerImprovementClient, changed);
        } catch (e) {
            throw new Error('Could not create accomplishment, database call failed');
        }
    }
}
