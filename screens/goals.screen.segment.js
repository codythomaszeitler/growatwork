import React, { Component } from "react";
import { Card } from "react-native-elements";
import { HardWorkEntryScreenSegment } from "./hard.work.entry.screen.segment";
import { TouchableOpacity } from "react-native-gesture-handler";
import {datastore} from '../datastore/datastore';

export class GoalsScreenSegment extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);

    this.client = datastore().get();
    this.client.addOnAccomplishmentAssociatedListener(this);
    this.client.addOnAccomplishmentDeassociatedListener(this);

    this.onGoalSegmentPressedListeners = [];
    if (props.onGoalSegmentPressedListener) {
      this.onGoalSegmentPressedListeners.push(
        props.onGoalSegmentPressedListener
      );
    }

    this.state = {
      goal: props.goal,
    };
  }

  componentWillUnmount() {
    this.client.removeOnAccomplishmentAssociatedListener(this);
    this.client.removeOnAccomplishmentDeassociatedListener(this);
  }

  onAccomplishmentDeassociated(event) {
    if (event.goal.get() === this.state.goal.get()) {
      this.setState({
        goal : event.goal
      });
    }
  }

  onAccomplishmentAssociated(event) {
    if (event.goal.get() === this.state.goal.get()) {
      this.setState({
        goal : event.goal
      });
    }
  }

  onPress(event) {
    for (let i = 0; i < this.onGoalSegmentPressedListeners.length; i++) {
      this.onGoalSegmentPressedListeners[i].onGoalSegmentPressed(
        event,
        this.state.goal
      );
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPress}>
        <Card title={this.state.goal.get()}>
          {this.state.goal
            .getAssociatedAccomplishments()
            .map((accomplishment) => {
              return (
                <HardWorkEntryScreenSegment
                  key={accomplishment.toString()}
                  hardWorkEntry={accomplishment}
                  hideChevron
                  hideDivider
                  hideAssociatedGoal
                ></HardWorkEntryScreenSegment>
              );
            })}
        </Card>
      </TouchableOpacity>
    );
  }
}
