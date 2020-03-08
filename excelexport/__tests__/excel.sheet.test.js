import { HardWorkEntry } from "../../pojo/hard.work.entry";
import { Timestamp } from "../../pojo/timestamp";
import * as FileSystem from "expo-file-system";
import { ExcelSheet } from "../excel.sheet";
import { AchievementColumns } from "../achievement.columns";

describe("Excel Sheet", () => {
  it("should be able to write multiple achievements", async () => {
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


    let written = null;
    const file = {
        path : 'test.csv',
        write : function(contents) {
            this.written = contents;
        }
    };

    const testObject = new ExcelSheet(
      new AchievementColumns("Achievement", "Accomplished On")
    );

    testObject.add(first);
    testObject.add(second);
    testObject.add(third);

    testObject.write(file);

    const lines = written.split("\n");
    expect(lines.length).toBe(4);
  });
});
