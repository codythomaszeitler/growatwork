import React, { Component } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { CareerImprovementClient } from "../pojo/career.improvement.client";
import { HardWorkEntry } from "../pojo/hard.work.entry";
import {datastore} from '../datastore/datastore';
import {Timestamp} from '../pojo/timestamp';

export class LoadingScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadingId = setTimeout(
      function() {
        let careerImprovementClient = new CareerImprovementClient();
          careerImprovementClient.log(new HardWorkEntry('Finished out big project what happens if this string is super super long', Timestamp.today()));
          careerImprovementClient.log(new HardWorkEntry('Got into contact with delta', Timestamp.today()));
          careerImprovementClient.log(new HardWorkEntry('Got important documents', Timestamp.today()));
          careerImprovementClient.log(new HardWorkEntry('Talked to Don', Timestamp.today()));
          careerImprovementClient.log(new HardWorkEntry('Made significat merger', Timestamp.today()));
          careerImprovementClient.log(new HardWorkEntry('Made tons of money', Timestamp.today()));
          careerImprovementClient.log(new HardWorkEntry('Partered with AMEX', Timestamp.today()));
          careerImprovementClient.log(new HardWorkEntry('Founded a new regime', Timestamp.today()));

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
