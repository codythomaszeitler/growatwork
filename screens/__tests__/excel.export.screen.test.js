import React from "react";
import { ExcelExportScreen } from "../excel.export.screen";
import { CareerImprovementClient } from "../../pojo/career.improvement.client";
import { HardWorkEntry } from "../../pojo/hard.work.entry";
import { Timestamp } from "../../pojo/timestamp";
import { fireEvent, render, NativeTestEvent } from '@testing-library/react-native'
import {CareerImprovementClientControllerLoader} from '../../datastore/career.improvement.client.controller.loader';

describe("Excel Export Screen", () => {

    let startingTo;
    let startingFrom;

    beforeEach(() => {
        startingTo = new Timestamp(2019, 'January', 1);
        startingFrom = new Timestamp(2019, 'January', 10);
    });

  it("should excel export all items between the two selected dates", () => {
    const careerImprovementClient = new CareerImprovementClient();
    careerImprovementClient.log(
      new HardWorkEntry("Test Accomplishment", new Timestamp(2019, 'January', 5))
    );
    
    const loader = new CareerImprovementClientControllerLoader();
    loader.fromInMemory(careerImprovementClient);

    let writtenAchievements;  
    const excelWriter = {
        write : function(achievements) {
            writtenAchievements = achievements;
        }
    };

    const {getByTestId} = render(<ExcelExportScreen onExcelWriter={excelWriter} startingTo={startingTo} startingFrom={startingFrom}></ExcelExportScreen>);

    fireEvent(getByTestId('fromDateTimePicker'), createOnChangeDatePickerEvent(startingFrom));
    fireEvent(getByTestId('toDateTimePicker'), createOnChangeDatePickerEvent(startingTo));

    fireEvent.press(getByTestId('Export'));
    fireEvent.press(getByTestId('ExportViaExcel'));

    expect(writtenAchievements.length).toBe(1);
  });

  it("should excel export all items between the two selected dates", () => {
    const careerImprovementClient = new CareerImprovementClient();
    careerImprovementClient.log(
      new HardWorkEntry("Test Accomplishment", new Timestamp(2019, 'January', 5))
    );
    
    const loader = new CareerImprovementClientControllerLoader();
    loader.fromInMemory(careerImprovementClient);

    let destinationEmail;
    let writtenAchievements;  
    const emailWriter = {
        write : function(email, achievements) {
            writtenAchievements = achievements;
            destinationEmail = email;
        }
    };

    const {getByTestId} = render(<ExcelExportScreen onEmailWriter={emailWriter} startingTo={startingTo} startingFrom={startingFrom}></ExcelExportScreen>);

    fireEvent(getByTestId('fromDateTimePicker'), createOnChangeDatePickerEvent(startingFrom));
    fireEvent(getByTestId('toDateTimePicker'), createOnChangeDatePickerEvent(startingTo));

    fireEvent.press(getByTestId('Export'));
    fireEvent.changeText(getByTestId('DestinationEmailInput'), 'codyzeitler12@gmail.com');
    fireEvent.press(getByTestId('ExportViaEmail'));

    expect(destinationEmail).toBe('codyzeitler12@gmail.com');
    expect(writtenAchievements.length).toBe(1);
  });


  function createOnChangeDatePickerEvent(timestamp) {

    const asDate = timestamp.toDate();

    return new NativeTestEvent('Change',  {
        nativeEvent : {
            timestamp : asDate.getTime()
        }
    })};
});
