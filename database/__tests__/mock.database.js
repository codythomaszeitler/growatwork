import { TimestampMapper } from "../timestamp.mapper";
import { HardWorkEntry } from "../../pojo/hard.work.entry";
import * as queries from "../../graphql/queries";
import { Query } from "../../database/database";
import { CareerImprovementClient } from "../../pojo/career.improvement.client";
import { CareerImprovementClientMapper } from "../career.improvement.client.mapper";
export { Query };

export class MockDatabase {
  constructor() {
    this.created = [];
    this.readResults = {};
    this.nextCreatedId = 0;

    this.database = {
      data: {
        listCareerImprovementClients : {
          items: []
        },
      }
    };
  }

  create(inMemory) {
    inMemory.id = this.nextCreatedId;
    this.nextCreatedId++;
    this.created.push(inMemory);
    if (inMemory.type === CareerImprovementClient.getType()) {
      this.database.data.listCareerImprovementClients.items.push(
        ...this.toDatabaseItem(inMemory)
      );
    }
  }

  toDatabaseItem(inMemoryObjects) {
    let converted = null;
    if (!Array.isArray(inMemoryObjects)) {
      if (CareerImprovementClient.getType() === inMemoryObjects.type) {
        const mapper = new CareerImprovementClientDatabaseReturnMapper();
        converted = [mapper.toListCareerImprovementClients(inMemoryObjects)];
      }
    }

    return converted;
  }

  read(query) {
    let readResults = null;
    if (query.graphQl === queries.listCareerImprovementClients) {
      const listCareerImprovementClients = this.database.data.listCareerImprovementClients;
      readResults = {
        data : {
          listCareerImprovementClients: JSON.parse(JSON.stringify(listCareerImprovementClients))
        }
      }
    }

    return readResults;
  }

  count(query) {
    let count = 0;
    if (query.graphQl === queries.listCareerImprovementClients) {
      const readResults = this.read(query);
      count = readResults.data.listCareerImprovementClients.items.length;
    }
    return count;
  }

  setReadReturn(query, inMemoryReturnValue) {
    if (inMemoryReturnValue.type === "achievement") {
      if (!this.readResults[query.toString()]) {
        this.readResults[query.toString()] = [];
      }

      this.readResults[query.toString()].push(
        ...this.toListDatabaseReturn(inMemoryReturnValue)
      );
    }
  }

  update(inMemory) {

    const getClientIndex = (id) => {
      let index = -1;

      const clients = this.database.data.listCareerImprovementClients.items;
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].id === id) {
          index = i;
          break;
        }
      }
      return index;
    }

    if (inMemory.type === CareerImprovementClient.getType()) {  
      const clientIndex = getClientIndex(inMemory.id);
      if (clientIndex === -1) {
        throw new Error('Could not find client with id [' + inMemory.id + ']');
      }

      const clients = this.database.data.listCareerImprovementClients.items;
      const mapper = new CareerImprovementClientMapper();
      clients[clientIndex] = mapper.toDatabaseModel(inMemory).input;
    }
  }
}

class CareerImprovementClientDatabaseReturnMapper {

  toListCareerImprovementClients(clients) {
    if (!Array.isArray(clients)) {
      return this.toCareerImprovementClientDatabaseReturn(clients);
    }
    const converted = [];
    for (let i = 0; i < clients.length; i++) {
      converted.push(this.toCareerImprovementClientDatabaseReturn(clients[i]));
    } 
    return converted;
  }

  toCareerImprovementClientDatabaseReturn(client) {
    const careerImprovementClientMapper = new CareerImprovementClientMapper();
    return careerImprovementClientMapper.toDatabaseModel(client).input;
  }
}
