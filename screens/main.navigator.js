// import { createBottomTabNavigator } from "react-navigation-tabs";
import { DashboardScreen } from "./dashboard.screen";
import { ExcelExportScreen } from "./excel.export.screen";
import { InputHardWorkEntryScreen } from "./input.hard.work.entry.screen";
import { View } from "react-native";
import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
function DashboardTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ tintColor }) => (
            <View>
              <Icon
                style={[{ color: tintColor }]}
                size={25}
                name={"ios-home"}
              />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Add"
        component={InputHardWorkEntryScreen}
        options={{
          tabBarLabel: "Add",
          tabBarIcon: ({ tintColor }) => (
            <View>
              <Icon
                style={[{ color: tintColor }]}
                size={25}
                name={"ios-add-circle-outline"}
              />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="ExcelExport"
        component={ExcelExportScreen}
        options={{
          tabBarLabel: "Excel Export",
          tabBarIcon: ({ tintColor }) => (
            <View>
              <Icon
                style={[{ color: tintColor }]}
                size={25}
                name={"ios-arrow-dropdown-circle"}
              />
            </View>
          )
        }}
      />
    </Tab.Navigator>
  );
}

export class DashboardNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <DashboardTabs></DashboardTabs>
      </NavigationContainer>
    );
  }
}
