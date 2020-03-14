import { CareerImprovementClient } from "../pojo/career.improvement.client";

export class CareerImprovementClientMapper {
  toInMemoryModel(databaseModel) {
      const careerImprovementClient = new CareerImprovementClient(databaseModel.body.email, databaseModel.body.username);
      return careerImprovementClient;
  }

  toDatabaseModel(inMemoryModel) {
    return {
      body: {
        username : inMemoryModel.getUsername(),
        email : inMemoryModel.getEmail(),
        type : inMemoryModel.type
      }
    };
  }
}
