import React, { Component } from "react";
import { View } from "react-native";
import {Card} from 'react-native-elements';
import { datastore } from "../datastore/datastore";

export class GoalsScreen extends Component {
  constructor(props) {
    super(props);

    this.client = datastore().get();
    this.client.addOnGoalAddedListener(this);

    this.state = {
      goals: this.client.getGoals(),
    };
  }

  componentWillUnmount() {
    this.client.removeOnGoalAddedListener(this);
  }

  onGoalAdded(event) {
    console.log('we are in goal added');
    console.log(event);
    const goals = this.state.goals.concat(event.goal);
    console.log(goals);
    this.setState({
      goals : goals
    });
  }

  render() {
    return (
      <View >
        {this.state.goals.map((goal) => {
          return (<Card key={goal.get()} title={goal.get()}>


          </Card>);
        })}
      </View>
    );
  }
}
