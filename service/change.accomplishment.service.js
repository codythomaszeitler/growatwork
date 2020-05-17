import {HardWorkEntry} from '../pojo/hard.work.entry';

export class ChangeAccomplishmentService {

    constructor(database) {
        this.database = database;
    }

    async change(careerImprovementClient, original, newAccomplishmentText) {
        careerImprovementClient.remove(original);

        const changed = new HardWorkEntry(newAccomplishmentText, original.getAccomplishedOn());
        careerImprovementClient.log(changed);

        try {
            this.database.update(careerImprovementClient);
        } catch (e) {
            careerImprovementClient.remove(changed);
            careerImprovementClient.log(original);
            throw e;
        }
    }
}
