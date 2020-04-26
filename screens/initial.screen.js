import React, { Component } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-elements";

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
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <View style={{
          flex : 1
        }}>

        </View>
        <View style={{
          flex : 1
        }}>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              fontFamily: "PingFangTC-Thin",
            }}
          >
            Grow and Thrive
          </Text>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              fontFamily: "PingFangTC-Thin",
            }}
          >
            at Work
          </Text>
        </View>
        <View style={{
          flex: 3
        }}>
        </View>
        <View style={{
          flex : 1
        }}>
          <Button
            title="Let's get started!"
            onPress={this.toLoginScreen}
            type="outline"
            raised
          ></Button>
        </View>
        <View style={{
          flex : 1
        }}>
          <Text
            style={{
              color: "#A0A0A0",
              fontSize: 20,
            }}
          >
            {"  "}
            {"\u00A9"} Copyright 2020 Cody Zeitler
          </Text>
        </View>
      </View>
    );
  }

  toLoginScreen() {
    return this.props.navigation.navigate("Login");
  }
}
