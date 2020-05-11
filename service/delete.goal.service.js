export class DeleteGoalService {

    constructor(database) {
        this.database = database;
    }

    async removeGoal(careerImprovementClient, goal) {
        careerImprovementClient.removeGoal(goal);
        await this.database.update(careerImprovementClient);
    }
}
