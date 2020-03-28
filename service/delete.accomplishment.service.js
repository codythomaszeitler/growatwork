import {AchievementFinder} from '../database/achievement.finder';

export class DeleteAccomplishmentService {
    constructor(database) {
        this.database = database;
    }

    async delete(careerImprovementClient, accomplishment) {
        const accomplishmentFinder = new AchievementFinder(this.database);
        const accomplishments = await accomplishmentFinder.findByAccomplishment(accomplishment.copy());
        if (accomplishments.length === 0) {
            throw new Error('Could not find an accomplishment matching [' + accomplishment.toString() + '] within the database');
        }

        const match = accomplishments[0];

        try {
            this.database.delete(match.copy());
        } catch (e) {
            throw new Error("Delete call to database failed");
        }
        careerImprovementClient.remove(match.copy());
    }
}