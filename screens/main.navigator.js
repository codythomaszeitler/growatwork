import { DashboardScreen } from "./dashboard.screen";
import { InputHardWorkEntryScreen } from "./input.hard.work.entry.screen";
import { View, Modal } from "react-native";
import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { Header, Button } from "react-native-elements";
import { SettingsScreen } from "./settings.screen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GoalsScreen } from "./goals.screen";
import { ExcelExportScreen } from "./excel.export.screen";
import { HelpScreen } from "./help.screen";

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
          ),
        }}
      />
      <Tab.Screen
        name="Long Term"
        component={GoalsScreen}
        options={{
          tabBarLabel: "Weekly Progress",
          tabBarIcon: ({ tintColor }) => (
            <View>
              <Icon
                style={[{ color: tintColor }]}
                size={25}
                name={"ios-checkmark"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={InputHardWorkEntryScreen}
        options={{
          tabBarLabel: "Log",
          tabBarIcon: ({ tintColor }) => (
            <View>
              <Icon
                style={[{ color: tintColor }]}
                size={25}
                name={"ios-add-circle-outline"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ExcelExport"
        component={ExcelExportScreen}
        options={{
          tabBarLabel: "Export",
          tabBarIcon: ({ tintColor }) => (
            <View>
              <Icon
                style={[{ color: tintColor }]}
                size={25}
                name={"ios-arrow-dropdown-circle"}
              />
            </View>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

export class DashboardNavigation extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      settingsScreenVisible: false,
      helpScreenVisible: false,
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.settingsScreenVisible}
        >
          <SettingsScreen
            onCloseCall={() => {
              this.setState({
                settingsScreenVisible: false,
              });
            }}
            onLogOutCall={() => {
              this.setState({
                settingsScreenVisible: false,
              });
              this.props.navigation.navigate("Login");
            }}
          ></SettingsScreen>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.helpScreenVisible}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <View style={{
              flex : 6
            }}>
              <HelpScreen></HelpScreen>
            </View>
            <View style={{
              flex : 3,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Button
              title='Back'
                onPress={() => {
                  this.setState({
                    helpScreenVisible: false,
                  });
                }}
              ></Button>
            </View>
          </View>
        </Modal>
        <Header
          leftComponent={{
            icon: "help",
            color: "#4d7bd1",
            onPress: () => {
              this.setState({
                helpScreenVisible: true,
              });
            },
          }}
          centerComponent={{
            text: "Grow and Thrive at Work",
            style: { color: "#4d7bd1", fontSize: 18 },
          }}
          rightComponent={{
            icon: "menu",
            color: "#4d7bd1",
            onPress: () => {
              this.setState({
                settingsScreenVisible: true,
              });
            },
          }}
          backgroundColor={"#ffffff"}
        />
        <DashboardTabs></DashboardTabs>
      </NavigationContainer>
    );
  }
}
