import React, { View, Component, StyleSheet } from "react-native";

export class Separator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          marginVertical: 8,
          borderBottomColor: "#737373",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
    );
  }
}
