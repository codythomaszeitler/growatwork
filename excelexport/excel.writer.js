import * as FileSystem from 'expo-file-system';
import {ExcelSheet} from './excel.sheet';
import {AccomplishmentCsvRowConverter} from './accomplishment.csv.row.converter';

export class AccomplishmentExcelWriter {

    constructor(careerImprovementClient) {
        this.careerImprovementClient = careerImprovementClient;
    }

    async write(filePath, achievements) {
        const excelSheet = new ExcelSheet(
            ['Accomplishment', 'Accomplished On', 'Associated Goal'],
            new AccomplishmentCsvRowConverter(this.careerImprovementClient)
        );

        const csvWriter = {
            write : async function(csvContents) {
                let fileUri = FileSystem.documentDirectory + filePath;
                await FileSystem.writeAsStringAsync(fileUri, csvContents);
            }
        }

        for (let i = 0; i < achievements.length; i++) {
            const achievement = achievements[i];
            excelSheet.add(achievement);
        }

        await excelSheet.write(csvWriter);
    }
};