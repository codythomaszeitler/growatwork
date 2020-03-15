import { API, Auth } from "aws-amplify";
import { DatabaseModelMapper } from "./database.model.mapper";

class Database {
  constructor() {
    this.mapper = new DatabaseModelMapper();
  }

  async read(fromTable) {
    let readResults = null;
    console.log(fromTable);
    try {
      readResults = await API.get(this.getAPIName(), fromTable);
      console.log('Read result: ' + readResults);
    } catch (e) {
      console.log('Exception: ' + e);
    }
    return readResults;
  }

  async create(inMemory) {
    const databaseModel = this.mapper.toDatabaseModel(inMemory);
    try {
      await API.post(
        this.getAPIName(),
        this.getDatabaseTable(inMemory.type),
        databaseModel
      );
    } catch (e) {
        console.log(e);
    }
  }

  update(inMemory) {}

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

let databaseSingleton = null;
export function database() {
  console.log('database function was called');
  if (!databaseSingleton) {
    databaseSingleton = new Database();
  }
  return databaseSingleton;
}
