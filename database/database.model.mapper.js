import {MapperFactory} from './mapper.factory';

export class DatabaseModelMapper {
  toDatabaseModel(inMemoryModel) {
      const factory = new MapperFactory();
      const mapper = factory.create(inMemoryModel.type);
      return mapper.toDatabaseModel(inMemoryModel);
  }

  toInMemoryModel(databaseModel) {
    const getType = () => {
      let type = null;
      if (databaseModel.data.createAchievement) {
        type = "achievement";
      } else if (databaseModel.data.listCareerImprovementClients) {
        type = "careerimprovementclient";
      }
      return type;
    };

    const factory = new MapperFactory();
    const mapper = factory.create(getType());
    return mapper.toInMemoryModel(databaseModel);
  }
}
