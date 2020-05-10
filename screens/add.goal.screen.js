import React, { Component } from "react";
import { View, Keyboard, Alert } from "react-native";
import { Card, Input, Button, Icon, Text } from "react-native-elements";
import { datastore } from "../datastore/datastore";
import { Goal } from "../pojo/goal";
import Toast from "react-native-root-toast";
import { AddGoalService } from "../service/add.goal.service";
import { database } from "../database/database";

export class AddGoalScreen extends Component {
  constructor(props) {
    super(props);

    this.client = datastore().get();

    this.onPress = this.onPress.bind(this);
    this.myTextInput = React.createRef();

    this.state = {
      goalText: "",
    };
  }

  onPress(event) {
    if (!this.state.goalText) {
      return;
    }

    const goal = new Goal(this.state.goalText);

    try {
      const service = new AddGoalService(database());
      service.addGoal(this.client, goal);

      Keyboard.dismiss();

      Toast.show("Goal Successfully Added!", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "#1ec96b",
        opacity: 1,
      });

      this.myTextInput.current.clear();
    } catch (e) {
      Alert.alert("Could not add goal", e.message);
    }
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
              ref={this.myTextInput}
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
