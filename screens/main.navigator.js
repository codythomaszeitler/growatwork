import { createBottomTabNavigator } from "react-navigation-tabs";
import { DashboardScreen } from "./dashboard.screen";
import { ExcelExportScreen } from "./excel.export.screen";
import { InputHardWorkEntryScreen } from "./input.hard.work.entry.screen";
import { View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

export const DashboardNavigation = createBottomTabNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      tabBarLabel: "Dashboard",
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={25} name={"ios-home"} />
        </View>
      )
    }
  },
  Add: {
    screen: InputHardWorkEntryScreen,
    navigationOptions: {
      tabBarLabel: "Add",
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={25} name={"ios-add-circle-outline"} />
        </View>
      )
    }
  },
  ExcelExport: {
    screen: ExcelExportScreen,
    navigationOptions: {
      tabBarLabel: "Excel Export",
      tabBarIcon: ({ tintColor }) => (
        <View>
          <Icon style={[{ color: tintColor }]} size={25} name={"ios-arrow-dropdown-circle"} />
        </View>
      )
    }
  }
});
