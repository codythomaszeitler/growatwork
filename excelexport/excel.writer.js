import * as FileSystem from 'expo-file-system';
import {ExcelSheet} from './excel.sheet';
import {AchievementCsvRowConverter} from './achievement.csv.row.converter';

export class AchievementExcelWriter {
    async write(filePath, achievements) {
        const excelSheet = new ExcelSheet(
            ['Achievement', 'Accomplished On'],
            new AchievementCsvRowConverter()
        );

        const csvWriter = {
            write : async function(csvContents) {
                let fileUri = FileSystem.documentDirectory + filePath;
                console.log(csvContents);
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