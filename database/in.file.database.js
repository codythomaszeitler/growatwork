import * as FileSystem from "expo-file-system";
import { CareerImprovementClient } from "../pojo/career.improvement.client";
import { AccomplishmentMapper } from "./accomplishment.mapper";
import { GoalMapper } from "./goal.mapper";

export class InFileCareerImprovementClientMapper {
  toInMemoryModel(databaseModel) {
    const careerImprovementClient = new CareerImprovementClient(
      databaseModel.email,
      databaseModel.username
    );

    for (let i = 0; i < databaseModel.accomplishments.length; i++) {
      const accomplishmentMapper = new AccomplishmentMapper();
      const accomplishment = accomplishmentMapper.toInMemoryModel(
        databaseModel.accomplishments[i]
      );

      careerImprovementClient.log(accomplishment[0] );
    }

    for (let i = 0; i < databaseModel.goals.length; i++) {
      const goalMapper = new GoalMapper();

      const goal = goalMapper.toInMemoryModel(databaseModel.goals[i]);

      careerImprovementClient.addGoal(goal);
    }

    return careerImprovementClient;
  }

  toDatabaseModel(inMemory) {
    const toAccomplishmentsDatabase = () => {
      const accomplishments = inMemory.getHardWork();

      const accomplishmentMapper = new AccomplishmentMapper();
      return accomplishmentMapper.toDatabaseModel(accomplishments);
    };

    const toGoalsDatabase = () => {
      const goals = inMemory.getGoals();

      const goalMapper = new GoalMapper();
      return goalMapper.toDatabaseModel(goals);
    };

    const databaseModel = {
      accomplishments: toAccomplishmentsDatabase(),
      goals: toGoalsDatabase(),
      type: inMemory.type,
      email: inMemory.email,
      username: inMemory.username,
      id: inMemory.id,
    };

    return databaseModel;
  }
}

export class InFileDatabase {
  constructor(databaseFilepath) {
    this.currentId = 0;
    this.databaseFilepath = databaseFilepath;

    this.mapper = new InFileCareerImprovementClientMapper();
  }

  async createFileIfDNE() {
    let fileUri = FileSystem.documentDirectory + this.databaseFilepath;
    const existsCheck = await FileSystem.getInfoAsync(fileUri);

    if (!existsCheck.exists) {
      await FileSystem.writeAsStringAsync(fileUri, "");
    }
  }

  async create(inMemory) {
    await this.createFileIfDNE();

    inMemory.id = this.currentId;
    this.currentId++;

    let fileUri = FileSystem.documentDirectory + this.databaseFilepath;
    await FileSystem.writeAsStringAsync(
      fileUri,
      JSON.stringify(this.mapper.toDatabaseModel(inMemory))
    );

    return inMemory;
  }

  async read(query) {
    await this.createFileIfDNE();

    let fileUri = FileSystem.documentDirectory + this.databaseFilepath;
    const contents = await FileSystem.readAsStringAsync(fileUri);

    let asJson = {};
    if (contents) {
      asJson = JSON.parse(contents);
    }

    return asJson;
  }

  async update(inMemory) {
    await this.createFileIfDNE();

    let fileUri = FileSystem.documentDirectory + this.databaseFilepath;
    await FileSystem.writeAsStringAsync(
      fileUri,
      JSON.stringify(this.mapper.toDatabaseModel(inMemory))
    );
  }
}
