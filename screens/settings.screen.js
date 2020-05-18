import React, { Component } from "react";
import { View, Alert } from "react-native";
import { Button, Text, Card, Input } from "react-native-elements";
import { authentication, guestUsername } from "../authentication/auth";

export class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.authentication = authentication();

    this.onClose = this.onClose.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
    this.onOldPasswordChange = this.onOldPasswordChange.bind(this);
    this.onReenterNewPasswordChange = this.onReenterNewPasswordChange.bind(
      this
    );

    this.state = {
      modalVisible: false,
      oldPassword: "",
      newPassword: "",
      copyNewPassword: "",
      isLoggedInAsGuest: true
    };
  }

  async componentDidMount() {
    const isGuestUser = async () => {
      const username = await this.authentication.getCurrentUsername();
      return username === guestUsername;
    }

    const isGuest = await isGuestUser(); 
    this.setState({
      isLoggedInAsGuest : isGuest
    });
  }

  onClose() {
    this.props.onCloseCall();
  }

  async onLogOut() {
    await this.authentication.signOut();
    this.props.onLogOutCall();
  }

  async onChangePassword() {
    if (this.state.newPassword !== this.state.copyNewPassword) {
      Alert.alert("New Passwords do not match");
      return;
    }

    try {
      await this.authentication.changePassword(
        this.state.oldPassword,
        this.state.newPassword
      );
      Alert.alert("Password Changed Successfully");
      this.setState({
        oldPassword: "",
        newPassword: "",
        copyNewPassword: "",
      });
    } catch (e) {
      Alert.alert(
        "Password Change Failed",
        "Ensure that old password is correct and new password is longer than eight characters"
      );
    }
  }

  onOldPasswordChange(oldPassword) {
    this.setState({
      oldPassword: oldPassword,
    });
  }

  onNewPasswordChange(newPassword) {
    this.setState({
      newPassword: newPassword,
    });
  }

  onReenterNewPasswordChange(copyNewPassword) {
    this.setState({
      copyNewPassword: copyNewPassword,
    });
  }

  render() {
    return (
      <View
        style={{
          justifyContent: "space-around",
          alignItems: "stretch",
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 0.5,
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
            Settings
          </Text>
        </View>
        <View
          style={{
            flex: 5,
          }}
        >
          <Card>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "PingFangTC-Thin",
                fontSize: 20,
              }}
            >
              Change Password
            </Text>
            <Input
              placeholder="Old Password"
              placeholderTextColor="#E0E0E0"
              onChangeText={this.onOldPasswordChange}
              secureTextEntry={true}
              value={this.state.oldPassword}
              disabled={this.state.isLoggedInAsGuest}
            />
            <Input
              placeholder="New Password"
              placeholderTextColor="#E0E0E0"
              onChangeText={this.onNewPasswordChange}
              secureTextEntry={true}
              value={this.state.newPassword}
              disabled={this.state.isLoggedInAsGuest}
            />
            <Input
              placeholder="Confirm New Password"
              placeholderTextColor="#E0E0E0"
              onChangeText={this.onReenterNewPasswordChange}
              secureTextEntry={true}
              value={this.state.copyNewPassword}
              disabled={this.state.isLoggedInAsGuest}
            />
            <Text></Text>
            <Button
              title="Change"
              onPress={this.onChangePassword}
              disabled={this.state.isLoggedInAsGuest}
            ></Button>
          </Card>
          <Card>
            <Button title="Log Out" onPress={this.onLogOut}></Button>
          </Card>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Button title="Go Back" onPress={this.onClose}></Button>
        </View>
      </View>
    );
  }
}
