import React, { Component } from "react";
import { View } from "react-native";
import { Card, Button, Text, Input } from "react-native-elements";
import { PasswordPolicy, Password} from "../authentication/password";

class OnPasswordChangePress {
  constructor(password, reentered, message) {
    this.password = password;
    this.reentered = reentered;
    this.message = message;
  }
}

export class PasswordChangeScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.listeners = [this.props.listener];

    this.setPassword = this.setPassword.bind(this);
    this.setReenteredPassword = this.setReenteredPassword.bind(this);
    this.press = this.press.bind(this);

    this.state = {
      password: "",
      reentered: "",
    };
  }

  setPassword(password) {
    this.setState({
      password: password,
    });
  }

  setReenteredPassword(reentered) {
    this.setState({
      reentered: reentered,
    });
  }

  press() {
    if (this.state.password !== this.state.reentered) {
      for (let i = 0; i < this.listeners.length; i++) {
        const event = new OnPasswordChangePress(
          new Password(this.state.password),
          new Password(this.state.reentered),
          "Passwords did not match"
        );
        const listener = this.listeners[i];
        listener.onPasswordChangeMismatchedEvent(event);
      }
      return;
    }

    const password = new Password(this.state.password);
    const policy = new PasswordPolicy(password);

    if (!policy.checkIfFollowing()) {
      for (let i = 0; i < this.listeners.length; i++) {
        const event = new OnPasswordChangePress(
          new Password(this.state.password),
          new Password(this.state.reentered),
          policy.whyNot()
        );

        const listener = this.listeners[i];
        listener.onPasswordViolatingPolicyEvent(event);
      }
      return;
    }

    for (let i = 0; i < this.listeners.length; i++) {
      const event = new OnPasswordChangePress(
        new Password(this.state.password),
        new Password(this.state.reentered)
      );
      const listener = this.listeners[i];
      listener.onPasswordChangePress(event);
    }
  }

  render() {
    return (
      <View
        style={{
          flow: 1,
          justifyContent: "flex-end",
        }}
      >
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Card>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "PingFangTC-Thin",
              fontSize: 20,
            }}
          >
            Password Change Needed
          </Text>
          <Input
            placeholder="New Password"
            onChangeText={this.setPassword}
            secureTextEntry={true}
          />
          <Input
            placeholder="Confirm New Password"
            onChangeText={this.setReenteredPassword}
            secureTextEntry={true}
          />
          <Text></Text>
          <Button title="Change" onPress={this.press}></Button>
        </Card>
      </View>
    );
  }
}
