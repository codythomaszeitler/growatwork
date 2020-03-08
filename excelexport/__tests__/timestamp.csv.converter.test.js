import { Timestamp } from "../../pojo/timestamp";
import {TimestampCsvConverter} from "../timestamp.csv.converter";

describe('Timestamp Csv Converter', () => {
    it('should convert a timestamp into the csv representation', () => {
        const testObject = new TimestampCsvConverter();
        const timestamp = new Timestamp(2019, 'January', 3);

        expect(testObject.convert(timestamp)).toBe('"January 3, 2019"');
    });
});