export class ExcelSheet {
  constructor(columns, converter) {
    this.columns = columns;
    this.converter = converter;
    this.elements = [];
  }

  add(element) {
    this.elements.push(element);
  }

  write(file) {
    let contents = this.convertColumnsToExcelRow() + "\n";

    for (let i = 0; i < this.elements.length; i++) {
      const element = this.elements[i];

      if (this.isLastIndex(i, this.elements)) {
        contents += this.converter.convert(element);
      } else {
        contents += this.converter.convert(element) + "\n";
      }
    }

    file.write(contents);
  }

  convertColumnsToExcelRow() {
    let columnExcelRow = "";

    for (let i = 0; i < this.columns.length; i++) {
      const column = this.columns[i];

      if (this.isLastIndex(i, this.columns)) {
        columnExcelRow += column;
      } else {
        columnExcelRow += column + ",";
      }
    }

    return columnExcelRow;
  }

  isLastIndex(i, array) {
    return i === (array.length - 1);
  }
}
