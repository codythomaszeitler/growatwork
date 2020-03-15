import React, { Component } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { datastore } from "../datastore/datastore";
import { CareerImprovementClientFinder } from "../database/career.improvement.client.finder";
import { Authentication } from "../authentication/auth";
import {database} from '../database/database';

export class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.authentication = new Authentication();
  }

  async componentDidMount() {
    this.loadingId = setTimeout(
      async function() {
        const finder = new CareerImprovementClientFinder(database());
        const careerImprovementClient = await finder.findByUsername(
          this.authentication.getCurrentUsername()
        );

        datastore().set(careerImprovementClient);
        this.props.navigation.navigate("Dashboard");
      }.bind(this),
      3000
    );
  }

  componentWillUnmount() {
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
