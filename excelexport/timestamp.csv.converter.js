export class TimestampCsvConverter {
  convert(timestamp) {
    return this.ignoreCommaDelimiter(
      timestamp.getMonth() +
        " " +
        timestamp.getDay() +
        ", " +
        timestamp.getYear()
    );
  }

  ignoreCommaDelimiter(format) {
    return '"' + format + '"';
  }
}
