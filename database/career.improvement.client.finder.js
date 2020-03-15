import { CareerImprovementClientMapper } from "./career.improvement.client.mapper";
import * as queries from '../graphql/queries';

export class CareerImprovementClientFinder {
  constructor(database) {
    this.database = database;
  }

  async findByUsername(username) {
    let readResults;
    try {
      readResults = await this.database.read(queries.listCareerImprovementClients);
    } catch (e) {
      console.log(e);
    }
    const mapper = new CareerImprovementClientMapper();
    return mapper.toInMemoryModel(readResults);
  }
}
