import {AccomplishmentMapper} from './accomplishment.mapper';
import { Goal } from '../pojo/goal';

export class GoalMapper {

    toInMemoryModel(databaseModel) {
        const accomplishmentMapper = new AccomplishmentMapper();
        const accomplishments = accomplishmentMapper.toInMemoryModel(databaseModel.accomplishments);

        const goal = new Goal(databaseModel.goal);
        for (let i = 0; i < accomplishments.length; i++) {
            goal.associate(accomplishments[i]);
        }
        return goal;
    }

    toDatabaseModel(inMemoryModel) {
        const convert = (goal) => {
            const accomplishments = goal.getAssociatedAccomplishments();
            const accomplishmentMapper = new AccomplishmentMapper();
            return {
                goal : goal.get(),
                accomplishments : accomplishmentMapper.toDatabaseModel(accomplishments)
            }
        }

        if (!Array.isArray(inMemoryModel)) {
            inMemoryModel = [inMemoryModel];
        }

        const converted = [];
        for (let i = 0; i < inMemoryModel.length; i++) {
            converted.push(convert(inMemoryModel[i]));
        }
        return converted;
    }
}