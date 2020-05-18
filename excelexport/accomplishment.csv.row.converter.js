import { TimestampCsvConverter } from "./timestamp.csv.converter";

export class AccomplishmentCsvRowConverter {
  constructor(careerImprovementClient) {
    if (!careerImprovementClient) {
      throw new Error(
        "Cannot construct an accomplishment converter without a career improvement client"
      );
    }

    this.timestampCsvConverter = new TimestampCsvConverter();
    this.careerImprovementClient = careerImprovementClient;
  }

  convert(accomplishment) {
    const getAssociatedGoalName = (accomplishment) => {
      const goal = this.careerImprovementClient.getAssociatedGoal(
        accomplishment
      );

      let associatedGoalName = "";
      if (goal) {
        associatedGoalName = goal.get();
      }

      return associatedGoalName;
    };

    return (
      this.ignoreCommaDelimiter(accomplishment.getAccomplishment()) +
      "," +
      this.timestampCsvConverter.convert(accomplishment.getAccomplishedOn()) +
      "," +
      this.ignoreCommaDelimiter(getAssociatedGoalName(accomplishment))
    );
  }

  ignoreCommaDelimiter(format) {
    return '"' + format + '"';
  }
}
