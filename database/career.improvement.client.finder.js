import { CareerImprovementClientMapper } from "./career.improvement.client.mapper";
import {Query} from "./database";
import * as queries from '../graphql/queries';

export class CareerImprovementClientFinder {
  constructor(database) {
    this.database = database;
  }

  async findByUsername(username) {
    const query = new Query(queries.listCareerImprovementClients);

    let readResults = await this.database.read(query);
    console.log(readResults); 
    const mapper = new CareerImprovementClientMapper();
    return mapper.toInMemoryModel(readResults);
  }
}
