import { createStackNavigator } from "react-navigation-stack";
import { DashboardScreen } from "./dashboard.screen";
import {ExcelExportScreen} from './excel.export.screen';
import { TodaysGoalsScreen } from "./todays.goals.screen";

export const DashboardNavigation = createStackNavigator(
  {
    Dashboard : DashboardScreen,
    ExcelExport: ExcelExportScreen,
    TodaysGoals: TodaysGoalsScreen
  },
);
