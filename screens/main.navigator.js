import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { LoginScreen } from './login.screen';

const appNavigator = createStackNavigator(
  {
    Login : LoginScreen
  },
);
export const MainNavigator = createAppContainer(appNavigator);
