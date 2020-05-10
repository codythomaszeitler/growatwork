export class AddGoalService {

    constructor(database) {
        this.database = database;
    }

    async addGoal(careerImprovementClient, goal) {
        careerImprovementClient.addGoal(goal);
        this.database.update(careerImprovementClient);
    }
}
