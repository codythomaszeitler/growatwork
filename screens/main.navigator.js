// import { createBottomTabNavigator } from "react-navigation-tabs";
import { DashboardScreen } from "./dashboard.screen";
import { ExcelExportScreen } from "./excel.export.screen";
import { InputHardWorkEntryScreen } from "./input.hard.work.entry.screen";
import { View } from "react-native";
import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { Header } from "react-native-elements";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { ExcelExportDestinationScreen } from "./excel.export.destination.screen";

const MainStack = createStackNavigator();

function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

const Tab = createBottomTabNavigator();
function DashboardTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Accomplishments",
          tabBarIcon: ({ tintColor }) => (
            <View>
              <Icon
                style={[{ color: tintColor }]}
                size={25}
                name={"ios-checkmark"}
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
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

export class DashboardNavigation extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <NavigationContainer>
        <Header
          centerComponent={{
            text: "Grow and Thrive at Work",
            style: { color: "#4d7bd1", fontSize: 18 }
          }}
          rightComponent={{ 
            icon: "menu",
            color: "#4d7bd1",
            onPress: () => {
              console.log("we presssed the header button");
            }
          }}
          backgroundColor={"#ffffff"}
        />
        <DashboardTabs></DashboardTabs>
      </NavigationContainer>
    );
  }
}
