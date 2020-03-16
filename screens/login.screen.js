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
    this.forgotPassword = this.forgotPassword.bind(this);

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
          alignItems: "stretch"
        }}
      >
        <View style ={{
          flex : .4
        }}
        
        ></View>
        <View style={{
          flex : 1
        }}>
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
            flex: 3
          }}
        >
          <Input
            style={{
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
          <Input
            style={{
              borderColor: "gray",
              borderWidth: 1,
              backgroundColor: "#bfbfbf"
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
              flex: 1
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
            flex: 1
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
