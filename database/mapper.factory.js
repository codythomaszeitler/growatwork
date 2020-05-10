import { AccomplishmentMapper } from "./accomplishment.mapper";
import { CareerImprovementClientMapper } from "./career.improvement.client.mapper";

export class MapperFactory {
  create(type) {
    let factory = null;
    if (type === "achievement") {
      factory = new AccomplishmentMapper();
    } else if (type === "careerimprovementclient") {
      factory = new CareerImprovementClientMapper();
    }
    return factory;
  }
}
