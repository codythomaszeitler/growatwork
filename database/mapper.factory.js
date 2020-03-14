import { AchievementMapper } from "./achievement.mapper";
import { CareerImprovementClientMapper } from "./career.improvement.client.mapper";

export class MapperFactory {
  create(type) {
    let factory = null;
    if (type === "achievement") {
      factory = new AchievementMapper();
    } else if (type === "careerimprovementclient") {
      factory = new CareerImprovementClientMapper();
    }
    return factory;
  }
}
