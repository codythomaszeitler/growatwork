import { CareerImprovementClient } from "../pojo/career.improvement.client";

export class CareerImprovementClientMapper {
  toInMemoryModel(databaseModel) {
    const contents = databaseModel.data.listCareerImprovementClients.items[0];

    const careerImprovementClient = new CareerImprovementClient(
      contents.email,
      contents.username
    );
    careerImprovementClient.id = contents.id;
    return careerImprovementClient;
  }

  toDatabaseModel(inMemoryModel) {
    return {
      input: {
        username: inMemoryModel.getUsername(),
        email: inMemoryModel.getEmail()
      }
    };
  }
}
