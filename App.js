import React, { Component } from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { LoginScreen } from "./screens/login.screen";
import { InitialScreen } from "./screens/initial.screen";
import { LoadingScreen } from './screens/loading.screen';
import { DashboardNavigation } from './screens/main.navigator';
import {SignUpScreen} from './screens/sign.up.screen';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
console.log(awsconfig);
Amplify.configure(awsconfig);

const switchNavigator = createSwitchNavigator({
  Initial : InitialScreen,
  Login: LoginScreen,
  Loading : LoadingScreen,
  Dashboard: DashboardNavigation,
  SignUp : SignUpScreen
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