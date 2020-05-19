import React, { Component } from "react";
import { View, Alert } from "react-native";
import { Text, Card, Input, Button } from "react-native-elements";
import { DeleteGoalService } from "../service/delete.goal.service";
import {ChangeGoalService} from '../service/change.goal.service';
import { database } from "../database/database";
import { datastore } from "../datastore/datastore";

export class ModifyGoalScreen extends Component {
  constructor(props) {
    super(props);
    this.client = datastore().get();
    this.onDelete = this.onDelete.bind(this);
    this.onGoalTextChange = this.onGoalTextChange.bind(this);
    this.onChange = this.onChange.bind(this); 

    this.onSuccessfulGoalDeleteListeners = [];
    if (props.onSuccessfulGoalDeleteListener) {
      this.onSuccessfulGoalDeleteListeners.push(
        props.onSuccessfulGoalDeleteListener
      );
    }
    this.onSuccessfulGoalChangedListeners = [];
    if (props.onSuccessfulGoalChangedListener) {
      this.onSuccessfulGoalChangedListeners.push(
        props.onSuccessfulGoalChangedListener
      );
    }

    this.state = {
      defaultValue: props.goal.get(),
      goal: props.goal,
      changeGoalInput: props.goal.get(),
    };
  }

  async onChange(event) {

    const input = this.state.changeGoalInput.trim();
    if (!input) {
      Alert.alert('Empty Goal', 'Must provide a name');
      return;
    }

    const service = new ChangeGoalService(database());
    const changedGoal = await service.changeGoalName(
      this.client,
      this.state.goal,
      input
    );

    for (let i = 0; i < this.onSuccessfulGoalChangedListeners.length; i++) {
      this.onSuccessfulGoalChangedListeners[i].onSuccessfulGoalChange({
        original : this.state.goal,
        changed: changedGoal
      });
    }
  }

  async onGoalTextChange(event) {
    this.setState({
      changeGoalInput: event,
    });
  }

  async onDelete(event) {
    const service = new DeleteGoalService(database());
    await service.removeGoal(this.client, this.state.goal);

    for (let i = 0; i < this.onSuccessfulGoalDeleteListeners.length; i++) {
      this.onSuccessfulGoalDeleteListeners[i].onSuccessfulGoalDelete({
        goal: this.state.goal,
      });
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 0.5,
          }}
        ></View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "PingFangTC-Thin",
              fontSize: 30,
            }}
          >
            Goal
          </Text>
        </View>

        <View
          style={{
            alignSelf: "stretch",
            flex: 4,
          }}
        >
          <Card title="Change Goal">
            <Input
              defaultValue={this.state.defaultValue}
              onChangeText={this.onGoalTextChange}
            ></Input>
            <Text></Text>
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              onPress={this.onChange}
              title="Change"
            />
          </Card>
          <View
            style={{
              flex: 0.2,
            }}
          ></View>
          <Card>
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              onPress={this.onDelete}
              disabled={this.state.isDeleteButtonDisabled}
              title="Delete"
            />
          </Card>
        </View>
      </View>
    );
  }
}
