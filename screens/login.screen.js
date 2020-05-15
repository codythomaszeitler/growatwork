import React, { Component } from "react";
import { Text, View, Alert, Modal } from "react-native";
import { Authentication, UserNotConfirmedCode } from "../authentication/auth";
import { Input, Icon, Button } from "react-native-elements";
import { LoadingScreen } from "./loading.screen";
import { PasswordChangeScreen } from "./password.change.screen";
import {
  Completed,
  ResetPassword,
  EnterConfirmationCode,
} from "../authentication/authentication.flow";
import { AuthenticationFlow } from "../authentication/authentication.flow";
import { ConfirmationCodeEntryScreen } from "./confirmation.code.entry.screen";
import { CareerImprovementClientFinder } from "../database/career.improvement.client.finder";
import { database } from "../database/database";
import { datastore } from "../datastore/datastore";
import { CareerImprovementClient } from "../pojo/career.improvement.client";

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.showLoadingScreen = this.showLoadingScreen.bind(this);
    this.hideLoadingScreen = this.hideLoadingScreen.bind(this);
    this.onPasswordChangePress = this.onPasswordChangePress.bind(this);
    this.onConfirmationCodePress = this.onConfirmationCodePress.bind(this);

    this.authentication = new Authentication();
    this.authenticationFlow = new AuthenticationFlow(this.authentication);

    this.nextStep = null;

    this.state = {
      email: "",
      password: "",
      isLoadingScreenVisible: false,
      isPasswordChangeScreenVisible: false,
      isConfirmationCodeVisible: false,
      isModalVisible: false,
    };
  }

  async onPasswordChangePress(event) {
    try {
      this.nextStep = await this.nextStep.resetPassword(event.password);
      if (this.nextStep.step === EnterConfirmationCode) {
        this.showConfirmationCodeScreen();
      }
    } catch (e) {
      Alert.alert(e.message);
    }
  }

  onPasswordChangeMismatchedEvent() {
    Alert.alert('Passwords Did Not Match');
  }

  onPasswordViolatingPolicyEvent(event) {
    Alert.alert(event.message);
  }

  async onConfirmationCodePress(event) {
    try {
      this.nextStep = await this.nextStep.enterConfirmationCode(event.code);

      Alert.alert(
        "Password Changed Successfully!",
        "Please login with the new credentials",
        [
          {
            text: "OK",
            onPress: () => {
              this.hideConfirmationCodeScreen();
            },
          },
        ]
      );
    } catch (e) {
      Alert.alert(e.message);
    }
  }

  onNoConfirmationCodeEnteredEvent(event) {
    Alert.alert(event.message);
  }

  async signIn() {
    try {
      this.showLoadingScreen();
      this.nextStep = await this.authenticationFlow.signIn(
        this.state.email,
        this.state.password
      );

      if (this.nextStep.step === Completed) {
        await this.load();
        this.hideLoadingScreen();
        this.props.navigation.navigate("Dashboard");
      } else if (this.nextStep.step === ResetPassword) {
        this.showPasswordChangeScreen();
      } else if (this.nextStep.step === EnterConfirmationCode) {
        this.showConfirmationCodeScreen();
      } else {
        throw new Error("Unexpected error occurred");
      }
    } catch (e) {
      let message = e.message ? e.message : e;

      Alert.alert("Cannot Sign In", message, [
        {
          text: "OK",
          onPress: () => {
            this.hideLoadingScreen();
          },
        },
      ]);
    }
  }

  async onSuccessfulSignUp() {
    await this.signIn();
  }

  showLoadingScreen() {
    this.setState({
      isLoadingScreenVisible: true,
      isModalVisible: true,
    });
  }

  hideLoadingScreen() {
    this.setState({
      isLoadingScreenVisible: false,
      isModalVisible: false,
    });
  }

  showPasswordChangeScreen() {
    this.setState({
      isModalVisible: true,
      isPasswordChangeScreenVisible: true,
      isLoadingScreenVisible: false,
      isConfirmationCodeVisible: false,
    });
  }

  hidePasswordChangeScreen() {
    this.setState({
      isModalVisible: false,
      isPasswordChangeScreenVisible: false,
    });
  }

  hideModal() {
    this.setState({
      isModalVisible: false,
      isPasswordChangeScreenVisible: false,
      isConfirmationCodeVisible: false,
      isLoadingScreenVisible: false,
    });
  }

  showConfirmationCodeScreen() {
    this.setState({
      isModalVisible: true,
      isConfirmationCodeVisible: true,
      isPasswordChangeScreenVisible: false,
      isLoadingScreenVisible: false,
    });
  }

  hideConfirmationCodeScreen() {
    this.setState({
      isModalVisible: false,
      isConfirmationCodeVisible: false,
    });
  }

  async load() {
    const careerImprovementClientFinder = new CareerImprovementClientFinder(
      database()
    );
    const username = await this.authentication.getCurrentUsername();
    let careerImprovementClient = await careerImprovementClientFinder.findByUsername(
      username
    );

    if (!careerImprovementClient) {
      careerImprovementClient = new CareerImprovementClient(this.state.email, username);
      careerImprovementClient = await database().create(careerImprovementClient);
    }

    // const achievementFinder = new AchievementFinder(database());
    // const achievements = await achievementFinder.findByUsername(username);

    // for (let i = 0; i < achievements.length; i++) {
    //   careerImprovementClient.log(achievements[i]);
    // }
    datastore().set(careerImprovementClient);
  }

  onEmailChange(email) {
    this.setState({
      email: email,
    });
  }

  onPasswordChange(password) {
    this.setState({
      password: password,
    });
  }

  async signUp() {
    this.props.navigation.navigate("SignUp", {
      authenticationFlow: this.authenticationFlow
    });
  }

  async forgotPassword() {
    this.props.navigation.navigate("ForgotPassword");
  }

  async onForgotPassword() {
    this.props.navigation.navigate("ForgotPassword");
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "stretch",
        }}
      >
        <Modal animationType="fade" visible={this.state.isModalVisible}>
          {this.state.isLoadingScreenVisible && <LoadingScreen></LoadingScreen>}
          {this.state.isPasswordChangeScreenVisible && (
            <PasswordChangeScreen listener={this}></PasswordChangeScreen>
          )}
          {this.state.isConfirmationCodeVisible && (
            <ConfirmationCodeEntryScreen
              listener={this}
            ></ConfirmationCodeEntryScreen>
          )}
        </Modal>
        <View
          style={{
            flex: 0.4,
          }}
        ></View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "PingFangTC-Thin",
              fontSize: 30,
            }}
          >
            Log In
          </Text>
        </View>
        <View
          style={{
            flex: 3,
          }}
        >
          <Input
            style={{
              borderColor: "gray",
              borderWidth: 1,
              backgroundColor: "#bfbfbf",
            }}
            placeholder="  Username"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={this.onEmailChange}
            leftIcon={<Icon name="email" size={20} color="blue" />}
          />
          <Input
            style={{
              borderColor: "gray",
              borderWidth: 1,
              backgroundColor: "#bfbfbf",
            }}
            placeholder="  Password"
            secureTextEntry={true}
            onChangeText={this.onPasswordChange}
            leftIcon={<Icon name="book" size={20} color="blue" />}
          />
          <Text></Text>
          <View
            style={{
              alignItems: "center",
              flex: 1,
            }}
          >
            <Button
              type="outline"
              raised
              title="Let's Go!"
              onPress={this.signIn}
            ></Button>
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            flex: 1,
          }}
        >
          <Button
            type="outline"
            raised
            title="Sign Up"
            onPress={this.signUp}
          ></Button>
          <Text></Text>
          <Button
            type="outline"
            raised
            title="Forgot Password?"
            onPress={this.forgotPassword}
          ></Button>
        </View>
      </View>
    );
  }
}
