import React, { Component } from "react";
import { Text, View, Button } from "react-native";
export class InitialScreen extends Component {
  constructor(props) {
    super(props);
    this.toLoginScreen = this.toLoginScreen.bind(this);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          backgroundColor : "#ffffff"
        }}
      >
        <View
          style={{
            flex: 4,
            justifyContent: "center",
            alignItems: "flex-start",
            marginLeft: 0,
            marginTop: -60
          }}
        >
          <Text
            style={{
              fontSize: 30,
              textAlign: "justify",
              fontFamily: "PingFangTC-Thin"
            }}
          >{`
        Grow and Thrive 
              at Work`}</Text>
        </View>

        <View
          style={{
            flex: 1
          }}
        >
          <Button
            title="Let's get started!"
            onPress={this.toLoginScreen}
          ></Button>
        </View>
      </View>
    );
  }

  toLoginScreen() {
    return this.props.navigation.navigate("Login");
  }
}
