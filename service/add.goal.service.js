export class AddGoalService {

    constructor(database) {
        this.database = database;
    }

    async addGoal(careerImprovementClient, goal) {
        careerImprovementClient.addGoal(goal);

        try {
            await this.database.update(careerImprovementClient);
        } catch (e) {
            careerImprovementClient.removeGoal(goal);
            throw e;
        }
    }
}
