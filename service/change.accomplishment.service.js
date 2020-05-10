import {HardWorkEntry} from '../pojo/hard.work.entry';

export class ChangeAccomplishmentService {

    constructor(database) {
        this.database = database;
    }

    async change(careerImprovementClient, original, newAccomplishmentText) {
        careerImprovementClient.remove(original);
        careerImprovementClient.log(new HardWorkEntry(newAccomplishmentText, original.getAccomplishedOn()));

        this.database.update(careerImprovementClient);
    }
}
