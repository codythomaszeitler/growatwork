import React, { Component } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { datastore } from "../datastore/datastore";
import { CareerImprovementClientFinder } from "../database/career.improvement.client.finder";
import { Authentication } from "../authentication/auth";
import { database } from "../database/database";
import { AchievementFinder } from "../database/achievement.finder";

export class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.authentication = new Authentication();
  }

  async componentDidMount() {
    const careerImprovementClientFinder = new CareerImprovementClientFinder(
      database()
    );
    const username = await this.authentication.getCurrentUsername();
    const careerImprovementClient = await careerImprovementClientFinder.findByUsername(
      username
    );

    const achievementFinder = new AchievementFinder(database());
    let achievements;
    try {
      achievements = await achievementFinder.findByUsername(username);
    } catch (e) {
      console.log(e);
    }

    for (let i = 0; i < achievements.length; i++) {
      careerImprovementClient.log(achievements[i]);
    }

    datastore().set(careerImprovementClient);
    careerImprovementClient.addOnLogListener(database());

    this.props.navigation.navigate("Dashboard");
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
