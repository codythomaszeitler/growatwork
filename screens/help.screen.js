import React, { Component } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";

export class HelpScreen extends Component {
  render() {
    return (
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
            alignItems : 'center'
          }}
        >
          <Text>HELP TEXT GOES HERE</Text>

        </View>
    );
  }
}
