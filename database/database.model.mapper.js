import {MapperFactory} from './mapper.factory';
import { CareerImprovementClient } from '../pojo/career.improvement.client';

export class DatabaseModelMapper {
  toDatabaseModel(inMemoryModel) {
      const factory = new MapperFactory();
      const mapper = factory.create(inMemoryModel.type);
      return mapper.toDatabaseModel(inMemoryModel);
  }

  toInMemoryModel(databaseModel) {
    const getType = () => {
      let type = null;
      if (databaseModel.data.listCareerImprovementClients) {
        type = CareerImprovementClient.getType();
      }
      return type;
    };

    const factory = new MapperFactory();
    const mapper = factory.create(getType());
    return mapper.toInMemoryModel(databaseModel);
  }
}
