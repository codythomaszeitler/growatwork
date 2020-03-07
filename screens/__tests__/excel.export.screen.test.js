import React from "react";
import { ExcelExportScreen } from "../excel.export.screen";
import { CareerImprovementClient } from "../../pojo/career.improvement.client";
import { HardWorkEntry } from "../../pojo/hard.work.entry";
import { Timestamp } from "../../pojo/timestamp";
import DateTimePicker from "@react-native-community/datetimepicker";
import { fireEvent, render, wait } from '@testing-library/react-native'

describe("Excel Export Screen", () => {

    let startingTo;
    let startingFrom;

    beforeEach(() => {
        startingTo = new Timestamp(2019, 'January', 1);
        startingFrom = new Timestamp(2019, 'January', 10);
    });

  it("should export all items between the two selected dates", () => {
    // const careerImprovementClient = new CareerImprovementClient();
    // careerImprovementClient.log(
    //   new HardWorkEntry("Test Accomplishment", Timestamp.today())
    // );

    // const database = new Database();
    // database.setNextReadReturn(careerImprovementClient);

    // const loader = new CareerImprovementClientControllerLoader(database);
    // loader.run();

    const {getByTestId} = render(<ExcelExportScreen startingTo={startingTo} startingFrom={startingFrom}></ExcelExportScreen>);
    // fireEvent(getByTestId('fromDateTimePicker', createOnChangeDatePickerEvent(Timestamp.today())));

    console.log(getByTestId('fromDateTimePicker'));
  });


  function createOnChangeDatePickerEvent(timestamp) {

    const asDate = timestamp.toDate();

    return {
        nativeEvent : {
            timestamp : asDate.getTime()
        }
    }
  }
});
