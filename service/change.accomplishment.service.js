import {HardWorkEntry} from '../pojo/hard.work.entry';

export class ChangeAccomplishmentService {

    constructor(database) {
        this.database = database;
    }

    async change(careerImprovementClient, original, newAccomplishmentText) {

        const associatedGoal = careerImprovementClient.getAssociatedGoal(original);
        careerImprovementClient.remove(original);

        const changed = new HardWorkEntry(newAccomplishmentText, original.getAccomplishedOn());
        careerImprovementClient.log(changed, associatedGoal);

        try {
            this.database.update(careerImprovementClient);
        } catch (e) {
            careerImprovementClient.remove(changed);
            careerImprovementClient.log(original, associatedGoal);
            throw e;
        }
    }
}
