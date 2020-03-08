import { TimestampCsvConverter } from "./timestamp.csv.converter";

export class AchievementCsvRowConverter {
  constructor() {
    this.timestampCsvConverter = new TimestampCsvConverter();
  }

  convert(achievement) {
    return (
      this.ignoreCommaDelimiter(achievement.getAccomplishment()) +
      "," +
      this.timestampCsvConverter.convert(achievement.getAccomplishedOn())
    );
  }

  ignoreCommaDelimiter(format) {
    return '"' + format + '"';
  }
}
