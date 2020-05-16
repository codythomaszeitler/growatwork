import { API, graphqlOperation } from "aws-amplify";
import { DatabaseModelMapper } from "./database.model.mapper";
import * as mutations from "../graphql/mutations";
import {HardWorkEntry} from '../pojo/hard.work.entry';
import {CareerImprovementClient} from '../pojo/career.improvement.client';
import { MapperFactory } from "./mapper.factory";
import {InFileDatabase} from './in.file.database';

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

  async update(inMemory) {
    const operation = mutations.updateCareerImprovementClient;
    const params = this.mapper.toDatabaseModel(inMemory);
    await API.graphql(graphqlOperation(operation, params));
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
    if (type === HardWorkEntry.getType()) {
      deleteGraphQlOperation = mutations.deleteAchievement;
    } else if (type === CareerImprovementClient.getType()) {
      deleteGraphQlOperation = mutations.deleteCareerImprovementClient;
    }
    return deleteGraphQlOperation;
  }

  async create(inMemory) {
    const databaseModel = this.mapper.toDatabaseModel(inMemory);

    const operation = this.getCreateOperation(inMemory.type);

    const mapperFactory = new MapperFactory();
    const mapper = mapperFactory.create(inMemory.type);

    const createDatabaseResult = await API.graphql(graphqlOperation(operation, databaseModel));
    return mapper.toInMemoryModel(createDatabaseResult);
  }

  getCreateOperation(type) {
    let createGraphQlOperation = "";
    if (type === HardWorkEntry.getType()) {
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
}

export function configureAWSDatabase() {
  databaseSingleton = new Database();
}

export function configureFlatDatabase() {
  databaseSingleton = new InFileDatabase('growandthrive');
}


let databaseSingleton = null;
export function database() {
  if (!databaseSingleton) {
    databaseSingleton = new Database();
  }
  return databaseSingleton;
}


