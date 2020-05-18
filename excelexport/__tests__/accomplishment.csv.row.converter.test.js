import { AccomplishmentCsvRowConverter } from "../accomplishment.csv.row.converter";
import { HardWorkEntry } from "../../pojo/hard.work.entry";
import { Timestamp } from "../../pojo/timestamp";
import {Goal} from "../../pojo/goal";
import { CareerImprovementClient } from "../../pojo/career.improvement.client";

describe("Accomplishment Csv Row Converter", () => {
  it("should be able to convert a normal accomplishment into a row", () => {
    const careerImprovementClient = new CareerImprovementClient(
      "codyzeitler12@gmail.com",
      "Guest"
    );
    const goal = new Goal("Test Goal");
    careerImprovementClient.addGoal(goal);
    const accomplishment = new HardWorkEntry(
      "Test",
      new Timestamp(2018, "January", 3)
    );

    careerImprovementClient.log(accomplishment, goal);

    const testObject = new AccomplishmentCsvRowConverter(careerImprovementClient);
    expect(testObject.convert(accomplishment)).toBe('"Test","January 3, 2018","Test Goal"');
  });
});
