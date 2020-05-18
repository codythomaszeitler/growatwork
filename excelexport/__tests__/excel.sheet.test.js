import { HardWorkEntry } from "../../pojo/hard.work.entry";
import { Timestamp } from "../../pojo/timestamp";
import {CareerImprovementClient} from "../../pojo/career.improvement.client";
import { ExcelSheet } from "../excel.sheet";
import { AccomplishmentCsvRowConverter } from "../accomplishment.csv.row.converter";

describe("Excel Sheet", () => {
  it("should be able to write multiple achievements", () => {
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

    const careerImprovementClient = new CareerImprovementClient(
      "codyzeitler12@gmail.com",
      "Guest"
    );
    careerImprovementClient.log(first);
    careerImprovementClient.log(second);
    careerImprovementClient.log(third);

    let written = null;
    const file = {
      path: "test.csv",
      write: function (contents) {
        written = contents;
      },
    };

    const testObject = new ExcelSheet(
      ["Achievement", "Accomplished On", "Associated Goal"],
      new AccomplishmentCsvRowConverter(careerImprovementClient)
    );

    testObject.add(first);
    testObject.add(second);
    testObject.add(third);

    testObject.write(file);

    const lines = written.split("\n");
    expect(lines[0]).toBe("Achievement,Accomplished On,Associated Goal");
    expect(lines[1]).toBe('"Test Achievement 1","January 1, 2019",""');
    expect(lines[2]).toBe('"Test Achievement 2","January 2, 2019",""');
    expect(lines[3]).toBe('"Test Achievement 3","January 3, 2019",""');
    expect(lines.length).toBe(4);
  });
});
