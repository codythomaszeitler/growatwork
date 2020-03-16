import React, { Component } from "react";
import { View, Modal, Alert } from "react-native";
import { Text, Button, Input, Icon } from "react-native-elements";
import { Authentication } from "../authentication/auth";

export class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.authentication = new Authentication();

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onSendPasswordReset = this.onSendPasswordReset.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
    this.onReenterNewPasswordChange = this.onReenterNewPasswordChange.bind(
      this
    );
    this.onConfirmationCodeChange = this.onConfirmationCodeChange.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      modalVisible: false,
      newPassword: "",
      copyNewPassword: "",
      confirmationCode: ""
    };
  }

  onEmailChange(email) {
    this.setState({
      email: email
    });
  }

  onNewPasswordChange(newPassword) {
    this.setState({
      newPassword: newPassword
    });
  }

  onReenterNewPasswordChange(copyNewPassword) {
    this.setState({
      copyNewPassword: copyNewPassword
    });
  }

  onConfirmationCodeChange(code) {
    this.setState({
      confirmationCode: code
    });
  }

  async onChangePassword() {

    if(!this.state.confirmationCode) {
        Alert.alert('Enter a confirmation code');
        return; 
    }

    if (!this.state.newPassword || !this.state.copyNewPassword) {
        Alert.alert('Ensure both password fields are filled out');
        return;
    }

    if (this.state.newPassword !== this.state.copyNewPassword) {
        Alert.alert('Passwords do not match');
        return;
    }

    try {
      await this.authentication.confirmChangePassword(
        this.state.email,
        this.state.confirmationCode,
        this.state.newPassword
      );
      this.setState({
        email : '',
        confirmationCode : '',
        newPassword : '',
        copyNewPassword : ''
      });
      Alert.alert('Password changed successfully');
    } catch (e) {
        Alert('Password Change Failed', e.message);
    }
  }

  async onSendPasswordReset() {
    if (!this.state.email) {
      Alert.alert("Please enter an email");
      return;
    }

    try {
        await this.authentication.sendPasswordResetEmail(
          this.state.email
        );
      this.setState({
        modalVisible: true
      });
    } catch (e) {
      Alert.alert("Could not reset email", e.message);
    }
  }

  onBack() {
    this.props.navigation.navigate("Login");
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-around",
              alignItems: "center"
            }}
          >

            <View></View>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "PingFangTC-Thin",
                fontSize: 30
              }}
            >
                Confirm Password Change
            </Text>
            <View></View>
            <Input
              placeholder="Confirmation Code"
              onChangeText={this.onConfirmationCodeChange}
              secureTextEntry={true}
              value={this.state.confirmationCode}
              leftIcon={<Icon name="email" size={20} color="blue" />}

            />
            <Input
              placeholder="New Password"
              onChangeText={this.onNewPasswordChange}
              secureTextEntry={true}
              value={this.state.newPassword}
              leftIcon={<Icon name="email" size={20} color="blue" />}

            />
            <Input
              placeholder="Confirm New Password"
              onChangeText={this.onReenterNewPasswordChange}
              secureTextEntry={true}
              value={this.state.copyNewPassword}
              leftIcon={<Icon name="email" size={20} color="blue" />}

            />
            <Text></Text>
            <Button title="Change" onPress={this.onChangePassword}
            type="outline"
            raise></Button>
            <View></View>
            <View></View>
            <View></View>

            <Button title="Back" onPress={() => {
                this.setState({
                    modalVisible : false
                });
            }}
            type="outline"
            raise></Button>
          </View>
        </Modal>
        <Text
          style={{
            textAlign: "center",
            fontFamily: "PingFangTC-Thin",
            fontSize: 30
          }}
        >
          Forgot Password
        </Text>
        <Input
          placeholder="Email"
          onChangeText={this.onEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<Icon name="email" size={20} color="blue" />}
        />
        <Button
          title="Send Confirmation Code"
          onPress={this.onSendPasswordReset}
          type="outline"
          raised
        ></Button>
        <View></View>
        <Button
          title="Back"
          onPress={this.onBack}
          type="outline"
          raised
        ></Button>
      </View>
    );
  }
}
