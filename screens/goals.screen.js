import React, { Component } from "react";
import { Modal, Alert } from "react-native";
import { Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { GoalsScreenSegment } from "./goals.screen.segment";
import { ModifyGoalScreen } from "./modify.goal.screen";
import { datastore } from "../datastore/datastore";

export class GoalsScreen extends Component {
  constructor(props) {
    super(props);

    this.client = datastore().get();
    this.client.addOnGoalAddedListener(this);
    this.client.addOnAccomplishmentAssociatedListener(this);
    this.client.addOnGoalRemovedListener(this);

    if (!this.client.hasGoals()) {
      Alert.alert(
        "Weekly View",
        'This view gives you a recap of everything you\'ve done towards your goals this week! Head to the "Log" screen to add some goals!'
      );
    }

    this.state = {
      goals: this.client.getGoals(),
      selectedGoal: null,
      modalVisible: false,
    };
  }

  componentWillUnmount() {
    this.client.removeOnGoalAddedListener(this);
    this.client.removeOnAccomplishmentAssociatedListener(this);
    this.client.removeOnGoalRemovedListener(this);
  }

  onAccomplishmentAssociated(event) {
    this.setState({
      goals: [],
    });
    this.setState({
      goals: this.client.getGoals(),
    });
  }

  onGoalAdded(event) {
    const goals = this.state.goals.concat(event.goal);
    this.setState({
      goals: goals,
    });
  }

  onGoalRemoved(event) {
    this.setState({
      goals: this.client.getGoals(),
    });
  }

  onGoalSegmentPressed(event, goal) {
    this.setState({
      selectedGoal: goal,
      modalVisible: true,
    });
  }

  onSuccessfulGoalDelete(event) {
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    return (
      <ScrollView>
        <Modal visible={this.state.modalVisible} animationType="slide">
          <ModifyGoalScreen
            goal={this.state.selectedGoal}
            onSuccessfulGoalDeleteListener={this}
          ></ModifyGoalScreen>
          <Button
            title="Back"
            onPress={(event) => {
              this.setState({
                modalVisible: false,
              });
            }}
          ></Button>
        </Modal>

        {this.state.goals.map((goal) => {
          return (
            <GoalsScreenSegment
              key={goal.get()}
              goal={goal}
              onGoalSegmentPressedListener={this}
            ></GoalsScreenSegment>
          );
        })}
      </ScrollView>
    );
  }
}
