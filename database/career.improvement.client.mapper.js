import { CareerImprovementClient } from "../pojo/career.improvement.client";
import { JS } from "aws-amplify";

export class CareerImprovementClientMapper {
  toInMemoryModel(databaseModel) {
    const clientsAsGraphQl =
      databaseModel.data.listCareerImprovementClients.items;
    if (clientsAsGraphQl.length === 0) {
      return null;
    }

    if (clientsAsGraphQl.length > 1) {
      throw new Error(
        "Retrieved [" +
          clientsAsGraphQl.length +
          "] Career Improvement Clients from the database, " +
          JSON.stringify(clientsAsGraphQl)
      );
    }

    const graphQlClient = clientsAsGraphQl[0];
    const careerImprovementClient = new CareerImprovementClient(
      graphQlClient.email,
      graphQlClient.username
    );
    careerImprovementClient.id = graphQlClient.id;

    return careerImprovementClient;
  }

  toDatabaseModel(inMemoryModel) {
    return {
      input: {
        username: inMemoryModel.getUsername(),
        email: inMemoryModel.getEmail(),
        id : inMemoryModel.id
      },
    };
  }
}
