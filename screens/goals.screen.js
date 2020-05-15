import React, { Component } from "react";
import { Modal, Alert, View } from "react-native";
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
    this.client.addOnLogRemovedListener(this);
    this.client.addOnAccomplishmentAssociatedListener(this);
    this.client.addOnAccomplishmentDeassociatedListener(this);
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
    this.client.removeOnAccomplishmentDeassociatedListener(this);
    this.client.removeOnLogRemovedListener(this);
  }

  onLogRemoved(event) {
    this.setState({
      goal : this.client.getGoals()
    });
  }

  onAccomplishmentAssociated(event) {
    this.setState({
      goals: this.client.getGoals(),
    });
  }

  onAccomplishmentDeassociated(event) {
    this.setState({
      goals : this.client.getGoals()
    });
  }

  onGoalAdded(event) {
    this.setState({
      goals: this.client.getGoals(),
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

  onSuccessfulGoalChange(event) {
    this.setState({ 
      modalVisible: false 
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
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                flex: 5,
              }}
            >
              <ModifyGoalScreen
                goal={this.state.selectedGoal}
                onSuccessfulGoalDeleteListener={this}
                onSuccessfulGoalChangedListener={this}
              ></ModifyGoalScreen>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Button
                title="Back"
                onPress={(event) => {
                  this.setState({
                    modalVisible: false,
                  });
                }}
              ></Button>
            </View>
          </View>
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
