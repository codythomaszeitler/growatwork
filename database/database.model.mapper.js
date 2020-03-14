import {MapperFactory} from './mapper.factory';

export class DatabaseModelMapper {
  toDatabaseModel(inMemoryModel) {
      const factory = new MapperFactory();
      const mapper = factory.create(inMemoryModel.type);
      return mapper.toDatabaseModel(inMemoryModel);
  }

  toInMemoryModel(databaseModel) {
    const factory = new MapperFactory();
    const mapper = factory.create(databaseModel.body.type);
    return mapper.toInMemoryModel(databaseModel);
  }
}
