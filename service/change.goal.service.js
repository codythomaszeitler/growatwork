import { Goal } from "../pojo/goal";

export class ChangeGoalService {
  constructor(database) {
    this.database = database;
  }

  async changeGoalName(careerImprovementClient, goal, newName) {
    const accomplishments = careerImprovementClient.getGoal(goal).getAssociatedAccomplishments();
    const deepClean = (goal) => {
      careerImprovementClient.removeGoal(goal);
      for (let i = 0; i < accomplishments.length; i++) {
        careerImprovementClient.remove(accomplishments[i]);
      }
    };

    const deepAdd = (goal) => {
      careerImprovementClient.addGoal(goal);
      for (let i = 0; i < accomplishments.length; i++) {
        careerImprovementClient.log(accomplishments[i], goal);
      }
    };

    deepClean(goal);

    const changedGoal = new Goal(newName);
    deepAdd(changedGoal);

    try {
      this.database.update(careerImprovementClient);
    } catch (e) {
      deepClean(changedGoal);
      deepAdd(goal);

      throw e;
    }
    return changedGoal;
  }
}
