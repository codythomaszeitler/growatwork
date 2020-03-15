import React, { Component } from "react";
import { Text, View, Alert } from "react-native";
import { Authentication } from "../authentication/auth";
import { Input, Icon, Button } from "react-native-elements";

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.signUp = this.signUp.bind(this);

    this.authentication = new Authentication();

    this.state = {
      email: "",
      password: ""
    };
  }

  async signIn() {
    try {
      await this.authentication.signIn(this.state.email, this.state.password);
      this.props.navigation.navigate("Loading");
    } catch (e) {
      Alert.alert("Cannot Sign In", e.message);
    }
  }

  onEmailChange(email) {
    this.setState({
      email: email
    });
  }

  onPasswordChange(password) {
    this.setState({
      password: password
    });
  }

  async signUp() {
    this.props.navigation.navigate("SignUp");
  }

  async onForgotPassword() {
    this.props.navigation.navigate("ForgotPassword");
  }

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 0.5,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              justifyContent: "flex-start",
              fontFamily: "PingFangTC-Thin",
              fontSize: 30
            }}
          >
            Log In
          </Text>
          <Text
            style={{
              flex: 0.2
            }}
          ></Text>

          <Input
            style={{
              height: 40,
              width: 300,
              borderColor: "gray",
              borderWidth: 1,
              backgroundColor: "#bfbfbf"
            }}
            placeholder="  Username"
            autoCapitalize="none"
            keyboardType="email-address"
            autoFocus={true}
            onChangeText={this.onEmailChange}
            leftIcon={<Icon name="email" size={20} color="blue" />}
          />
          <Text
            style={{
              flex: 0.03
            }}
          ></Text>
          <Input
            style={{
              height: 40,
              width: 300,
              borderColor: "gray",
              borderWidth: 1,
              backgroundColor: "#bfbfbf"
            }}
            placeholder="  Password"
            secureTextEntry={true}
            onChangeText={this.onPasswordChange}
            leftIcon={<Icon name="book" size={20} color="blue" />}
          />
        </View>

        <View
          style={{
            flex: 0.1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button
            type="outline"
            raised
            title="Let's Go!"
            onPress={this.signIn}
          ></Button>

          <Button
            type="outline"
            raised
            title="Sign Up"
            onPress={this.signUp}
          ></Button>
          <Button
            type="outline"
            raised
            title="Forgot Password?"
            onPress={this.signUp}
          ></Button>
        </View>
      </View>
    );
  }
}
