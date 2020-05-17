
export class LogAccomplishmentService {
  constructor(database) {
    this.database = database;
  }

  async log(careerImprovementClient, accomplishment, goal) {
    careerImprovementClient.log(accomplishment, goal);

    try {
      await this.database.update(careerImprovementClient);
    } catch (e) {
      careerImprovementClient.remove(accomplishment);
      throw e;
    }
  }
}
