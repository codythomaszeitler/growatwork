import {Goal} from '../pojo/goal';

export class ChangeGoalService {

    constructor(database) {
        this.database = database;
    }

    async changeGoalName(careerImprovementClient, goal, newName) {
        careerImprovementClient.removeGoal(goal);
        const accomplishments = goal.getAssociatedAccomplishments();
        for (let i = 0; i < accomplishments.length; i++) {
            careerImprovementClient.remove(accomplishments[i]);
        }

        const changedGoal = new Goal(newName);
        careerImprovementClient.addGoal(changedGoal);
        for (let i = 0; i < accomplishments.length; i++) {
            careerImprovementClient.log(accomplishments[i], changedGoal);
        }

        this.database.update(careerImprovementClient);
        return changedGoal;
    }
}
