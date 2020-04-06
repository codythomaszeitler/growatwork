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
        listAchievements: {
          items: []
        },
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
    if (inMemory.type === HardWorkEntry.getType()) {
      this.database.data.listAchievements.items.push(
        ...this.toDatabaseItem(inMemory)
      );
    }
    if (inMemory.type === CareerImprovementClient.getType()) {
      this.database.data.listCareerImprovementClients.items.push(
        ...this.toDatabaseItem(inMemory)
      );
    }
  }

  toDatabaseItem(inMemoryObjects) {
    let converted = null;
    if (!Array.isArray(inMemoryObjects)) {
      if (HardWorkEntry.getType() === inMemoryObjects.type) {
        const mapper = new AccomplishmentDatabaseReturnMapper();
        converted = [mapper.toListAccomplishments(inMemoryObjects)];
      }
      if (CareerImprovementClient.getType() === inMemoryObjects.type) {
        const mapper = new CareerImprovementClientDatabaseReturnMapper();
        converted = [mapper.toListCareerImprovementClients(inMemoryObjects)];
      }
    }

    return converted;
  }

  read(query) {
    let readResults = null;
    if (query.graphQl === queries.listAchievements) {
      const listAchievements = this.database.data.listAchievements;
      readResults = {
        data: {
          listAchievements: JSON.parse(JSON.stringify(listAchievements))
        }
      };
    }
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

  contains(inMemory) {
    let contains = false;
    for (let i = 0; i < this.created.length; i++) {
      if (inMemory.equals(this.created[i])) {
        contains = true;
        break;
      }
    }
    return contains;
  }

  delete(inMemoryObjects) {
    if (!Array.isArray(inMemoryObjects)) {
      this.deleteInMemoryObject(inMemoryObjects);
    }

    for (let i = 0; i < inMemoryObjects.length; i++) {
      const inMemory = inMemoryObjects[i];
      this.deleteInMemoryObject(inMemory);
    }
  }

  deleteInMemoryObject(inMemory) {
    if (inMemory.type === HardWorkEntry.getType()) {
      this.database.data.listAchievements.items = this.database.data.listAchievements.items.filter(
        function(accomplishment) {
          return accomplishment.id !== inMemory.id;
        }
      );
    }
  }
}

class CareerImprovementClientDatabaseReturnMapper {

  toListCareerImprovementClients(clients) {
    if (!Array.isArray(clients)) {
      return this.toCareerImprovementClientDatabaseReturn(clients);
    }
    const converted = [];
    for (let i = 0; i < client.length; i++) {
      converted.push(this.toCareerImprovementClientDatabaseReturn(clients[i]));
    } 
    return converted;
  }

  toCareerImprovementClientDatabaseReturn(client) {

    return {
      id : client.id,
      username : client.getUsername(),
      email : client.getEmail(),
      achievements : client.getHardWork()
    }
  }
}

class AccomplishmentDatabaseReturnMapper {
  toListAccomplishments(accomplishments) {
    if (!Array.isArray(accomplishments)) {
      return this.toAccomplishmentDatabaseReturn(accomplishments);
    }

    const converted = [];
    for (let i = 0; i < accomplishments; i++) {
      converted.push(this.toAccomplishmentDatabaseReturn(accomplishments[i]));
    }
    return converted;
  }

  toAccomplishmentDatabaseReturn(accomplishment) {
    const timestampMapper = new TimestampMapper();
    const timestampAsDatabase = timestampMapper.toDatabaseModel(
      accomplishment.getAccomplishedOn()
    );

    return {
      accomplishedOn: timestampAsDatabase,
      achievement: accomplishment.getAccomplishment(),
      id: accomplishment.id
    };
  }
}
