import React, { Component } from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-elements";
import { HardWorkEntryScreenSegment } from "./hard.work.entry.screen.segment";
import { TouchableOpacity } from "react-native-gesture-handler";
import { datastore } from "../datastore/datastore";
import { Timestamp } from "../pojo/timestamp";

export class GoalsScreenSegment extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);

    this.client = datastore().get();
    this.client.addOnAccomplishmentAssociatedListener(this);
    this.client.addOnAccomplishmentDeassociatedListener(this);

    this.getAccomplishmentsFromPastWeek = this.getAccomplishmentsFromPastWeek.bind(
      this
    );
    this.onAccomplishmentAssociated = this.onAccomplishmentAssociated.bind(
      this
    );
    this.onAccomplishmentDeassociated = this.onAccomplishmentAssociated.bind(
      this
    );

    this.onGoalSegmentPressedListeners = [];
    if (props.onGoalSegmentPressedListener) {
      this.onGoalSegmentPressedListeners.push(
        props.onGoalSegmentPressedListener
      );
    }

    this.state = {
      goal: props.goal,
    };
    this.state.accomplishments = this.getAccomplishmentsFromPastWeek();
  }

  getAccomplishmentsFromPastWeek() {
    const today = Timestamp.today();
    const previous = today.getPreviousDayOfWeek("Monday");

    return this.client.getAchievements(previous, today, [this.state.goal]);
  }

  componentWillUnmount() {
    this.client.removeOnAccomplishmentAssociatedListener(this);
    this.client.removeOnAccomplishmentDeassociatedListener(this);
  }

  onAccomplishmentDeassociated(event) {
    if (event.goal.get() === this.state.goal.get()) {
      this.setState({
        goal: event.goal,
        accomplishments: this.getAccomplishmentsFromPastWeek(),
      });
    }
  }

  onAccomplishmentAssociated(event) {
    if (event.goal.get() === this.state.goal.get()) {
      this.setState({
        goal: event.goal,
        accomplishments: this.getAccomplishmentsFromPastWeek(),
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
        <Card
          title={this.state.goal.get()}
          titleStyle={{
            fontFamily: "PingFangTC-Thin",
          }}
        >
          <View>
            {this.state.accomplishments.length === 0 && (
              <Text
                style={{
                  fontFamily: "PingFangTC-Thin",
                }}
              >
                No accomplishments this week!
              </Text>
            )}
            {this.state.accomplishments.length > 0 &&
              this.state.accomplishments.map((accomplishment) => {
                return (
                  <HardWorkEntryScreenSegment
                    key={accomplishment.toString()}
                    hardWorkEntry={accomplishment}
                    hideChevron
                    hideDivider
                    hideAssociatedGoal
                    topPadding={0}
                  ></HardWorkEntryScreenSegment>
                );
              })}
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}
