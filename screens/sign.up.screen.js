import React, { Component } from "react";
import { View, Text, TextInput, Modal, Alert } from "react-native";
import { Button, Card } from "react-native-elements";
import { Authentication } from "../authentication/auth";

export class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      email: "",
      password: "",
      confirmationCode: ""
    };
    this.signUp = this.signUp.bind(this);
    this.enterConfirmationCode = this.enterConfirmationCode.bind(this);
    this.onConfirmationCodeChange = this.onConfirmationCodeChange.bind(this);

    this.authentication = new Authentication();
  }

  async signUp() {
    this.setState({
      modalVisible: true
    });
    try {
      await this.authentication.signUp(this.state.email, this.state.password);
    } catch (e) {
      console.log("within the sign up  function " + e);
    }
  }

  async enterConfirmationCode() {
    if (!this.state.confirmationCode) {
      Alert.alert("No Confirmation Code", "Please enter a code");
      return;
    }

    const responseMessage = await this.authentication.confirmSignUp(
      this.state.email,
      this.state.confirmationCode
    );

    if (responseMessage === "SUCCESS") {
      this.setState({
        modalVisible: false
      });
      this.props.navigation.navigate("Loading");
    } else {
      Alert.alert("Incorrect Confirmation Code", "Please try again");
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

  onConfirmationCodeChange(code) {
    this.setState({
      confirmationCode: code
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Card title="Enter Confirmation Code">
            <TextInput
              style={{
                borderColor: "gray",
                height: 50,
                borderWidth: 1,
                backgroundColor: "#bfbfbf"
              }}
              placeholder="   Code"
              onChangeText={this.onConfirmationCodeChange}
            />
          </Card>
          <Card>
            <Button
              title="Confirm Confirmation Code"
              onPress={this.enterConfirmationCode}
            ></Button>
          </Card>
        </Modal>
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
            Sign Up
          </Text>
          <Text
            style={{
              flex: 0.2
            }}
          ></Text>

          <TextInput
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
          />
          <Text
            style={{
              flex: 0.03
            }}
          ></Text>
          <TextInput
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
          />

          <Text
            style={{
              flex: 0.03
            }}
          ></Text>
          <Button
            title="Send confirmation code!"
            onPress={this.signUp}
          ></Button>
          <Text
            style={{
              flex: 0.03
            }}
          ></Text>
        </View>
      </View>
    );
  }
}
