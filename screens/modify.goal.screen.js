import React, { Component } from "react";
import { View } from "react-native";
import { Text, Card, Input, Button } from "react-native-elements";
import {DeleteGoalService} from '../service/delete.goal.service';
import {database} from '../database/database';
import {datastore} from '../datastore/datastore';

export class ModifyGoalScreen extends Component {
  constructor(props) {
    super(props);
    this.client = datastore().get();
    this.onDelete = this.onDelete.bind(this);

    this.onSuccessfulGoalDeleteListeners = [];
    if (props.onSuccessfulGoalDeleteListener) {
        this.onSuccessfulGoalDeleteListeners.push(props.onSuccessfulGoalDeleteListener);
    }

    this.state = {
        defaultValue : props.goal.get(),
        goal : props.goal
    }
  }

  async onDelete(event) {
    const service = new DeleteGoalService(database());
    await service.removeGoal(this.client, this.state.goal);

    for (let i = 0; i < this.onSuccessfulGoalDeleteListeners.length; i++) {
        this.onSuccessfulGoalDeleteListeners[i].onSuccessfulGoalDelete({
            goal : this.state.goal
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
              onPress={this.onSave}
              title="Change"
              disabled={this.state.isSavedButtonDisabled}
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
