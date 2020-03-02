import React, { Component } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { CareerImprovementClient } from "../pojo/career.improvement.client";
import { HardWorkEntry } from "../pojo/hard.work.entry";

export class LoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

      this.loadingId = setTimeout(function(){

        let careerImprovementClient = new CareerImprovementClient();
        for (let i = 0; i < 100; i++) {
          careerImprovementClient.log(new HardWorkEntry(i.toString(), new Date()));
        }

        this.props.navigation.navigate("Dashboard", {
          a : 5
        })
      }.bind(this), 3000);
  }

  componentWillUnmount() {
    console.log('was unmounted');
    clearTimeout(this.loadingId);
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
