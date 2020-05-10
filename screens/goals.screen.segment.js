import React, { Component } from "react";
import { View } from "react-native";
import { Card, ListItem } from "react-native-elements";
import logo from "../checkbox.png";
import { HardWorkEntryScreenSegment } from "./hard.work.entry.screen.segment";

export class GoalsScreenSegment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boss : this.props.boss,
      goals : this.props.boss.getLongTermGoals()
    }

    this.onGoalAdded = this.onGoalAdded.bind(this);
    this.state.boss.addOnGoalAddedListener(this);
  }

  onGoalAdded(event) {
    const goals = this.state.goals;
    goals.push(event.getGoal());

    this.setState({
      goals : goals
    });
  }

  generateUniqueKey(goal) {
    const key = this.props.boss.getName() + goal.get();
    return key;
  }

  render() {
    return (
      <View>
        <Card title={this.props.boss.getName()}>
          {this.state.goals.map((goal) => {
            return (
              <ListItem
                key={this.generateUniqueKey(goal)}
                title={goal.get()}
                titleStyle={{
                  marginLeft: 15,
                }}
                onPress={this.onPress}
                leftAvatar={{ source: logo }}
                bottomDivider
                chevron
                friction={90}
                tension={100}
                subtitleStyle={{
                  marginLeft: 35,
                }}
              >
}
                </ListItem>
            );
          })}
        </Card>
      </View>
    );
  }
}
