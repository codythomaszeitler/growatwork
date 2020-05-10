import React, { Component } from "react";
import { View } from "react-native";
import { Card } from "react-native-elements";
import { datastore } from "../datastore/datastore";
import { HardWorkEntryScreenSegment } from "./hard.work.entry.screen.segment";
import { ScrollView } from "react-native-gesture-handler";

export class GoalsScreen extends Component {
  constructor(props) {
    super(props);

    this.client = datastore().get();
    this.client.addOnGoalAddedListener(this);
    this.client.addOnAccomplishmentAssociatedListener(this);

    this.state = {
      goals: this.client.getGoals(),
    };
  }

  onAccomplishmentAssociated(event) {
    console.log('event fired');
    this.setState({
      goals: this.client.getGoals()
    })
  }

  componentWillUnmount() {
    this.client.removeOnGoalAddedListener(this);
  }

  onGoalAdded(event) {
    const goals = this.state.goals.concat(event.goal);
    this.setState({
      goals: goals,
    });
  }

  render() {
    return (
        <ScrollView>
          {this.state.goals.map((goal) => {
            return (
              <Card key={goal.get()} title={goal.get()}>
                {goal.getAssociatedAccomplishments().map((accomplishment) => {
                  return (
                    <HardWorkEntryScreenSegment
                      key={accomplishment.toString()}
                      hardWorkEntry={accomplishment}
                    ></HardWorkEntryScreenSegment>
                  );
                })}
              </Card>
            );
          })}
        </ScrollView>
    );
  }
}
