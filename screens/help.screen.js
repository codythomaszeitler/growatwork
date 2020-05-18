import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-elements";

export class HelpScreen extends Component {
  render() {
    return (
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
          }}
        >
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
              Help
            </Text>
          </View>
          <View
            style={{
              flex: 6,
            }}
          >
            <Text>Screen</Text>
          </View>
        </View>
    );
  }
}
