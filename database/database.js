import Amplify, { API, graphqlOperation } from "aws-amplify";
import { DatabaseModelMapper } from "./database.model.mapper";
import * as mutations from "../graphql/mutations";

export class Query {
  constructor(graphQl, params) {
      this.graphQl = graphQl;
      this.params = params;
  }

  toString() {
      return this.graphQl + JSON.stringify(this.params);
  }
}

class Database {
  constructor() {
    this.mapper = new DatabaseModelMapper();
  }

  async read(query) {
    const readResults = await API.graphql(graphqlOperation(query.graphQl, query.params));
    return readResults;
  }

  async delete(inMemory) {
    const operation = this.getDeleteOperation(inMemory.type);
    const params = {
      input: {
        id: inMemory.id
      }
    };
    await API.graphql(graphqlOperation(operation, params));
  }

  getDeleteOperation(type) {
    let deleteGraphQlOperation = "";
    if (type === "achievement") {
      deleteGraphQlOperation = mutations.deleteAchievement;
    } else if (type === "careerimprovementclient") {
      deleteGraphQlOperation = mutations.deleteCareerImprovementClient;
    }
    return deleteGraphQlOperation;
  }

  async create(inMemory) {
    const databaseModel = this.mapper.toDatabaseModel(inMemory);

    const operation = this.getCreateOperation(inMemory.type);
    await API.graphql(graphqlOperation(operation, databaseModel));
  }

  getCreateOperation(type) {
    let createGraphQlOperation = "";
    if (type === "achievement") {
      createGraphQlOperation = mutations.createAchievement;
    } else if (type === "careerimprovementclient") {
      createGraphQlOperation = mutations.createCareerImprovementClient;
    }
    return createGraphQlOperation;
  }

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
    const achievement = event.logged;
    achievement.achievementCareerImprovementClientId =
      event.careerImprovementClient.id;
    await this.create(event.logged);
  }

  async onLogRemoved(event) {
    await this.delete(event.removed);
  }
}

let databaseSingleton = null;
export function database() {
  if (!databaseSingleton) {
    databaseSingleton = new Database();
  }
  return databaseSingleton;
}
