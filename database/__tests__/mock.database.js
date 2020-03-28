import * as queries from "../../graphql/queries";
import { DatabaseModelMapper } from "../database.model.mapper";

import { Query } from "../../database/database";
export {Query};
export class MockDatabase {
  constructor() {
    this.created = [];
    this.readResults = {};
  }

  create(inMemory) {
    this.created.push(inMemory);

    const mapper = new DatabaseModelMapper();

    if (inMemory.type === "achievement") {
      const query = new Query(queries.listAchievements);
      this.readResults[query.toString()] = mapper.toDatabaseModel(inMemory);
    }
  }

  read(query) {
    return this.readResults[query.toString()];
  }

  setReadReturn(query, inMemoryReturnValue) {
    const mapper = new DatabaseModelMapper();
    const databaseRepresentation = mapper.toDatabaseModel(inMemoryReturnValue);

    this.readResults[query.toString()] = databaseRepresentation;
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
}
