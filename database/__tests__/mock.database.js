import { TimestampMapper } from "../timestamp.mapper";
import { HardWorkEntry } from "../../pojo/hard.work.entry";
import * as queries from "../../graphql/queries";
import { Query } from "../../database/database";
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
        }
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
  }

  toDatabaseItem(inMemoryObjects) {
    let converted = null;
    if (!Array.isArray(inMemoryObjects)) {
      if ("achievement" === inMemoryObjects.type) {
        const mapper = new AccomplishmentDatabaseReturnMapper();
        converted = [mapper.toListAccomplishments(inMemoryObjects)];
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
    return readResults;
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
    for (let i = 0; i < inMemoryObjects.length; i++) {
      const inMemory = inMemoryObjects[i];
      if (inMemory.type === HardWorkEntry.getType()) {
        this.database.data.listAchievements.items = this.database.data.listAchievements.items.filter(
          function(accomplishment) {
            return accomplishment.id !== inMemory.id;
          }
        );
      }
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
