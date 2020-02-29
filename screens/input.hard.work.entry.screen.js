import React, { Component } from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";

export class InputHardWorkEntryScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 3,
          justifyContent: "space-evenly",
          alignItems: "center"
        }}
      >
        <Text style={{
          flexGrow: .1
        }}></Text>
          <Input style={{
            flexGrow: .5
          }} 
          placeholder="What you did today!" />
          <Button
            style={{
              width: 300,
              flexGrow : .5
            }}
            title="Add"
          />
      </View>
    );
  }
}
