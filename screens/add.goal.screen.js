import React, { Component } from "react";
import { View } from "react-native";
import { Card, Input, Button, Icon, Text } from "react-native-elements";
import { datastore } from "../datastore/datastore";
import { Goal } from "../pojo/goal";

export class AddGoalScreen extends Component {
  constructor(props) {
    super(props);

    this.client = datastore().get();

    this.onPress = this.onPress.bind(this);

    this.state = {
      goalText: "",
    };
  }

  onPress(event) {
    const goal = new Goal(this.state.goalText);
    this.client.addGoal(goal);
  }

  render() {
    return (
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
          <Card>
            <Input
              style={{
                multiline: true,
                textAlignVertical: "top",
                flex: 4,
              }}
              onChangeText={(value) => this.setState({ goalText: value })}
              leftIcon={<Icon name="edit" size={18} color="blue" />}
              placeholder=" Long Term Goal"
            />
            <Text></Text>
            <Button title="Add" onPress={this.onPress} />
          </Card>
        </View>
      </View>
    );
  }
}
