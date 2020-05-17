export class DeleteAccomplishmentService {
  constructor(database) {
    this.database = database;
  }

  async delete(careerImprovementClient, accomplishment) {
    if (!careerImprovementClient.contains(accomplishment)) {
      throw new Error(
        "Could not find an accomplishment matching [" +
          accomplishment.toString() +
          "] within the database"
      );
    }

    const associatedGoal = careerImprovementClient.getAssociatedGoal(accomplishment);
    careerImprovementClient.remove(accomplishment);

    try {
      this.database.update(careerImprovementClient);
    } catch (e) {
      careerImprovementClient.log(
        accomplishment,
        associatedGoal
      );
      throw e;
    }
  }
}
