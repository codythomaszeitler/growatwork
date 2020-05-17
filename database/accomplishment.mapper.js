import { HardWorkEntry } from "../pojo/hard.work.entry";
import { TimestampMapper } from "./timestamp.mapper";

export class AccomplishmentMapper {
  toDatabaseModel(inMemoryModel) {
    const convert = (accomplishment) => {
      const timestampMapper = new TimestampMapper();
      const timestampDatabaseModel = timestampMapper.toDatabaseModel(
        accomplishment.getAccomplishedOn()
      );

      return {
        accomplishment: accomplishment.getAccomplishment(),
        accomplishedOn: timestampDatabaseModel,
      };
    };

    let converted;
    if (Array.isArray(inMemoryModel)) {
      converted = [];
      for (let i = 0; i < inMemoryModel.length; i++) {
        converted.push(convert(inMemoryModel[i]));
      }
    } else {
      converted = convert(inMemoryModel);
    }

    return converted;
  }

  toInMemoryModel(databaseModel) {
    if (Array.isArray(databaseModel)) {
      if (databaseModel.length === 0) {
        return [];
      }
    }

    if (!Array.isArray(databaseModel)) {
      databaseModel = [databaseModel];
    }

    const accomplishments = [];

    if (databaseModel.length) {
      for (let i = 0; i < databaseModel.length; i++) {
        const content = databaseModel[i];

        const timestampMapper = new TimestampMapper();
        const timestamp = timestampMapper.toInMemoryModel(
          content.accomplishedOn
        );

        const accomplishment = new HardWorkEntry(
          content.accomplishment,
          timestamp
        );
        accomplishment.username = content.username;
        accomplishment.id = content.id;

        accomplishments.push(accomplishment);
      }
    }

    return accomplishments;
  }
}
