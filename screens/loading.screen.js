import React, { Component } from "react";
import { ActivityIndicator, View, Text } from "react-native";

export class LoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      console.log('console mounted');

      setTimeout(function(){
        this.props.navigation.navigate("Dashboard")
      }.bind(this), 3000);
  }


  render() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
        <Text></Text>
        <Text
          style={{
            justifyContent: "flex-start",
            fontFamily: "PingFangTC-Thin"
          }}
        >
          Getting all of your hard work :)
        </Text>
        <Text></Text>
        <Text
          style={{
            justifyContent: "flex-start",
            fontFamily: "PingFangTC-Thin",
            fontSize: 12
           }}
        >
          Grow and Thrive at Work
        </Text>
      </View>
    );
  }
}
