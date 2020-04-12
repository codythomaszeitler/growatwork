import React, { Component } from "react";
import { View, Text, Modal, Alert } from "react-native";
import { Button, Card, Input, Icon } from "react-native-elements";
import { Completed } from "../authentication/authentication.flow";

export class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.authenticationFlow = props.navigation.state.params.authenticationFlow;

    this.state = {
      modalVisible: false,
      email: "",
      password: "",
      confirmationCode: "",
      disableConfirmationButton: false,
    };
    this.signUp = this.signUp.bind(this);
    this.enterConfirmationCode = this.enterConfirmationCode.bind(this);
    this.onConfirmationCodeChange = this.onConfirmationCodeChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);

    this.nextState = null;
  }

  async signUp() {
    if (!this.state.email) {
      Alert.alert("Sign Up", "Cannot sign up without an e-mail");
      return;
    }

    if (!this.state.password) {
      Alert.alert("Sign Up", "Cannot sign up without a password");
      return;
    }

    try {
      this.nextState = await this.authenticationFlow.signUp(
        this.state.email,
        this.state.password
      );
      this.setState({
        modalVisible: true,
      });
    } catch (e) {
      Alert.alert("Sign Up", e.message);
    }
  }

  async enterConfirmationCode() {
    if (!this.state.confirmationCode) {
      Alert.alert("No Confirmation Code", "Please enter a code");
      return;
    }

    this.setState({
      disableConfirmationButton: true,
    });

    try {
      this.nextState = await this.nextState.enterConfirmationCode(
        this.state.confirmationCode
      );
      if (this.nextState.step === Completed) {

        Alert.alert('Sign Up Successful!', null, [{
          text : 'OK', onPress: () => {
            this.setState({
              modalVisible : false,
            });
            this.props.navigation.navigate("Login");
          }
        }])
      }
        else {
        Alert.alert("Incorrect Confirmation Code", this.nextState.step);
      }
    } catch (e) {
      Alert.alert(e.message);
    }


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

  onConfirmationCodeChange(code) {
    this.setState({
      confirmationCode: code,
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
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
            <Input
              style={{
                borderColor: "gray",
                height: 50,
                borderWidth: 1,
                backgroundColor: "#bfbfbf",
              }}
              placeholder="   Code"
              onChangeText={this.onConfirmationCodeChange}
            />
          </Card>
          <Card>
            <Button
              title="Confirm Confirmation Code"
              onPress={this.enterConfirmationCode}
              type="outline"
              raised
            ></Button>
          </Card>

          <View
            style={{
              alignItems: "center",
            }}
          >
            <View></View>
            <Button
              title="Back"
              onPress={() => {
                this.props.navigation.navigate("Login");
              }}
              type="outline"
              raised
            ></Button>
          </View>
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
              justifyContent: "flex-start",
              fontFamily: "PingFangTC-Thin",
              fontSize: 30,
            }}
          >
            Sign Up
          </Text>
        </View>

        <View
          style={{
            flex: 3,
            alignItems: "stretch",
          }}
        >
          <Input
            style={{
              height: 40,
              width: 300,
              borderColor: "gray",
              borderWidth: 1,
              backgroundColor: "#bfbfbf",
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
              height: 40,
              width: 300,
              borderColor: "gray",
              borderWidth: 1,
              backgroundColor: "#bfbfbf",
            }}
            placeholder="  Password"
            secureTextEntry={true}
            onChangeText={this.onPasswordChange}
            leftIcon={<Icon name="book" size={20} color="blue" />}
          />
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text></Text>
            <Button
              title="Send confirmation code!"
              onPress={this.signUp}
              disabled={this.state.disableConfirmationButton}
              type="outline"
              raised
            ></Button>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Button
            title="Back"
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
            type="outline"
            raised
          ></Button>
        </View>
      </View>
    );
  }
}
