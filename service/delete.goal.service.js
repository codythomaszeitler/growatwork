export class DeleteGoalService {

    constructor(database) {
        this.database = database;
    }

    async removeGoal(careerImprovementClient, goal) {
        const accomplishments = careerImprovementClient.getGoal(goal).getAssociatedAccomplishments();
        careerImprovementClient.removeGoal(goal);

        try {
            await this.database.update(careerImprovementClient);
        } catch (e) {
            for (let i = 0; i < accomplishments.length; i++) {
                careerImprovementClient.remove(accomplishments[i]);
            }

            careerImprovementClient.addGoal(goal);
            for (let i = 0; i < accomplishments.length; i++) {
                careerImprovementClient.log(accomplishments[i], goal);
            }

            throw e;
        }
    }
}
