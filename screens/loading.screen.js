import React, { Component } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { CareerImprovementClient } from "../pojo/career.improvement.client";
import {datastore} from '../datastore/datastore';
import {Auth} from 'aws-amplify';

export class LoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.loadingId = setTimeout(
      async function() {
        const currentUser = await Auth.currentAuthenticatedUser();
        console.log(currentUser.username);
        let careerImprovementClient = new CareerImprovementClient();
        datastore().set(careerImprovementClient);
        this.props.navigation.navigate("Dashboard"); 
      }.bind(this), 3000);
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
