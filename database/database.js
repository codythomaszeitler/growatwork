import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { DatabaseModelMapper } from "./database.model.mapper";
import * as mutations from '../graphql/mutations';

class Database {
  constructor() {
    this.mapper = new DatabaseModelMapper();
  }

  async read(query, filter={}) {
    const readResults = await API.graphql(graphqlOperation(query, filter));
    return readResults;
  }

  async create(inMemory) {
    const databaseModel = this.mapper.toDatabaseModel(inMemory);

    const operation = this.getCreateOperation(inMemory.type);
    try {
      await API.graphql(graphqlOperation(operation, databaseModel));
    } catch (e) {
      console.log(e);
    }
  }

  getCreateOperation(type) {
    let createGraphQlOperation = '';
    if (type === 'achievement') {
      createGraphQlOperation = mutations.createAchievement;
    } else if (type === 'careerimprovementclient') {
      createGraphQlOperation = mutations.createCareerImprovementClient;
    }
    return createGraphQlOperation;
  }

  update(inMemory) {}

  getAPIName() {
    return "database";
  }

  getDatabaseTable(type) {
    let databaseTable;
    if (type === "achievement") {
      databaseTable = "/achievements";
    } else if (type === "careerimprovementclient") {
      databaseTable = "/careerImprovementClients";
    } else {
      databaseTable = "NOT-FOUND";
    }
    return databaseTable;
  }

  async onLog(event) {
    console.log(event);
    const achievement = event.logged;
    achievement.achievementCareerImprovementClientId = event.careerImprovementClient.id;
    await this.create(event.logged);
  }
}

let databaseSingleton = null;
export function database() {
  if (!databaseSingleton) {
    databaseSingleton = new Database();
  }
  return databaseSingleton;
}
