// import { createBottomTabNavigator } from "react-navigation-tabs";
import { DashboardScreen } from "./dashboard.screen";
import { InputHardWorkEntryScreen } from "./input.hard.work.entry.screen";
import { View, Modal } from "react-native";
import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { Header } from "react-native-elements";
import { SettingsScreen } from "./settings.screen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GoalsScreen } from "./goals.screen";
import {AddGoalScreen} from './add.goal.screen';

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
        name="Goals"
        component={AddGoalScreen}
        options={{
          tabBarLabel: "Goals",
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
    </Tab.Navigator>
  );
}

export class DashboardNavigation extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      modalVisible: false,
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <SettingsScreen
            onCloseCall={() => {
              this.setState({
                modalVisible: false,
              });
            }}
            onLogOutCall={() => {
              this.setState({
                modalVisible: false,
              });
              this.props.navigation.navigate("Login");
            }}
          ></SettingsScreen>
        </Modal>
        <Header
          centerComponent={{
            text: "Grow and Thrive at Work",
            style: { color: "#4d7bd1", fontSize: 18 },
          }}
          rightComponent={{
            icon: "menu",
            color: "#4d7bd1",
            onPress: () => {
              this.setState({
                modalVisible: true,
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
