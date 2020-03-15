import {CareerImprovementClientMapper} from './career.improvement.client.mapper';

export class CareerImprovementClientFinder {
  constructor(database) {
      this.database = database;
  }

  async findByUsername(username) {
    const readResults = await this.database.read("/careerImprovementClients/:" + username);
    const mapper = new CareerImprovementClientMapper();
    console.log(readResults);
    return mapper.toInMemoryModel(readResults);
  }
}
