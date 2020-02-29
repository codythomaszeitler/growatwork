import React, { Component } from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { LoginScreen } from "./screens/login.screen";
import { InitialScreen } from "./screens/initial.screen";
import { LoadingScreen } from './screens/loading.screen';
import { DashboardNavigation } from './screens/main.navigator';

const switchNavigator = createSwitchNavigator({
  Initial : InitialScreen,
  Login: LoginScreen,
  Loading : LoadingScreen,
  Dashboard: DashboardNavigation 
});
const AppNavigator = createAppContainer(switchNavigator);

export default class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <AppNavigator></AppNavigator>
    );
  }
}