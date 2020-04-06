import React, { Component } from "react";
import { View } from "react-native";
import { Card, Button, Text, Input } from "react-native-elements";

class OnConfirmationCodePress {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

export class ConfirmationCodeEntryScreen extends Component {
  constructor(props) {
    super(props);
    this.listeners = [this.props.listener];
    this.onConfirmationCodeChange = this.onConfirmationCodeChange.bind(this);
    this.press = this.press.bind(this);

    this.state = {
      code: "",
    };
  }

  onConfirmationCodeChange(code) {
    this.setState({
      code: code,
    });
  }

  press() {
    if (!this.state.code) {
      for (let i = 0; i < this.listeners.length; i++) {
        const event = new OnConfirmationCodePress(
          this.state.code,
          "No confirmation code entered"
        );
        const listener = this.listeners[i];
        listener.onNoConfirmationCodeEnteredEvent(event);
      }
      return;
    }

    for (let i = 0; i < this.listeners.length; i++) {
      const event = new OnConfirmationCodePress(this.state.code);
      const listener = this.listeners[i];
      listener.onConfirmationCodePress(event);
    }
  }

  render() {
    return (
      <View>
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
            Confirmation Code
          </Text>
          <Input
            placeholder="Confirmation Code"
            onChangeText={this.onConfirmationCodeChange}
          />
          <Text></Text>
          <Button title="Enter" onPress={this.press}></Button>
        </Card>
      </View>
    );
  }
}
