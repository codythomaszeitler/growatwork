import { CareerImprovementClient } from "../pojo/career.improvement.client";
import { AccomplishmentMapper } from "./accomplishment.mapper";
import { GoalMapper } from "./goal.mapper";

export class CareerImprovementClientMapper {
  toInMemoryModel(databaseModel) {

    let clientsAsGraphQl = null;
    if (databaseModel.data.createCareerImprovementClient) {
      clientsAsGraphQl = [databaseModel.data.createCareerImprovementClient];
    } else if (databaseModel.data.listCareerImprovementClients.items) {
      clientsAsGraphQl = databaseModel.data.listCareerImprovementClients.items;
    }

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

    const graphQlResponse = clientsAsGraphQl[0];
    const careerImprovementClient = new CareerImprovementClient(
      graphQlResponse.email,
      graphQlResponse.username
    );
    careerImprovementClient.id = graphQlResponse.id;

    const accomplishmentsAsDatabase = graphQlResponse.accomplishments;
    for (let i = 0; i < accomplishmentsAsDatabase.length; i++) {
      const accomplishmentMapper = new AccomplishmentMapper();
      const accomplishments = accomplishmentMapper.toInMemoryModel(
        accomplishmentsAsDatabase[i]
      );
      careerImprovementClient.log(accomplishments[0]);
    }

    const goalsAsDatabase = graphQlResponse.goals;
    for (let i = 0; i < goalsAsDatabase.length; i++) {
      const goalMapper = new GoalMapper();

      const goal = goalMapper.toInMemoryModel(goalsAsDatabase[i]);
      careerImprovementClient.addGoal(goal);
    }

    return careerImprovementClient;
  }

  toDatabaseModel(inMemoryModel) {
    const accomplishmentMapper = new AccomplishmentMapper();
    const accomplishmentsAsDatabase = accomplishmentMapper.toDatabaseModel(
      inMemoryModel.getHardWork()
    );

    const goalMapper = new GoalMapper();
    const goalsAsDatabase = goalMapper.toDatabaseModel(
      inMemoryModel.getGoals()
    );

    return {
      input: {
        username: inMemoryModel.getUsername(),
        email: inMemoryModel.getEmail(),
        id: inMemoryModel.id,
        accomplishments: accomplishmentsAsDatabase,
        goals: goalsAsDatabase,
      },
    };
  }
}
