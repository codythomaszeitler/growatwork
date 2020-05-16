import { CareerImprovementClientMapper } from "./career.improvement.client.mapper";
import { InFileCareerImprovementClientMapper } from "./in.file.database";
import { Query } from "./database";
import * as queries from "../graphql/queries";

export class CareerImprovementClientFinder {
  constructor(database) {
    this.database = database;
  }

  async findByUsername(username) {
    const query = new Query(queries.listCareerImprovementClients);

    let readResults = await this.database.read(query);

    let found;
    if (readResults.data) {
      const mapper = new CareerImprovementClientMapper();
      found = mapper.toInMemoryModel(readResults);
    } else if (readResults.username) {
      const mapper = new InFileCareerImprovementClientMapper();
      found = mapper.toInMemoryModel(readResults);
    } else {
      found = null;
    }

    return found;
  }
}
