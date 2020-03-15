import {AchievementMapper} from './achievement.mapper';
import * as queries from '../graphql/queries';

export class AchievementFinder {
    constructor(database) {
        this.database = database;
    }

    async findByUsername(username) {
        const readResults = await this.database.read(queries.listAchievements);

        const mapper = new AchievementMapper();
        const achievements = mapper.toInMemoryModel(readResults);

        return achievements;
    }
}