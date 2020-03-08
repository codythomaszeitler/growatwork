export class ExcelSheet {
  constructor(columns) {
    this.columns = columns;
  }

  add(excelRowConverter) {
    // excelRowConverter.toRow(this.columns);
  }

  async write(file) {
    const first = new HardWorkEntry(
      "Test Achievement 1",
      new Timestamp(2019, "January", 1)
    );
    const second = new HardWorkEntry(
      "Test Achievement 2",
      new Timestamp(2019, "January", 2)
    );
    const third = new HardWorkEntry(
      "Test Achievement 3",
      new Timestamp(2019, "January", 3)
    );

    let contents = '';

    const converter = new AchievementCsvRowConverter();
    contents += converter.convert(first) + '\n';
    contents += converter.convert(second) + '\n';
    contents += converter.convert(third) + '\n';

    file.write(contents);
  }
}
