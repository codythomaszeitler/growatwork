import React, { Component } from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { datastore } from "../datastore/datastore";
import { HardWorkEntry } from "../pojo/hard.work.entry";
import Icon from "react-native-vector-icons/FontAwesome";
import { Timestamp } from "../pojo/timestamp";
import { Keyboard } from "react-native";
import Toast from "react-native-root-toast";
import {
  LogAccomplishmentService
} from "../service/log.accomplishment.service";
import { database } from "../database/database";
import {Alert} from 'react-native';

export class InputHardWorkEntryScreen extends Component {
  constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this);
    this.onPress = this.onPress.bind(this);
    this.myTextInput = React.createRef();

    this.state = {
      accomplishment: ""
    };
  }

  onChangeText(event) {
    this.setState({
      accomplishment: event
    });
  }

  async onPress() {
    if (!this.state.accomplishment) {
      return;
    }

    const newEntry = new HardWorkEntry(
      this.state.accomplishment,
      Timestamp.today()
    );

    try {
      const client = datastore().get();

      const logAccomplishmentService = new LogAccomplishmentService(database());
      await logAccomplishmentService.log(client, newEntry);
      Keyboard.dismiss();

      Toast.show("Accomplishment Successfully Added!", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "#1ec96b",
        opacity: 1
      });
      this.myTextInput.current.clear();
    } catch (e) {
      Alert.alert('Could not log accomplishment', e.message);
    }
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "#ffffff",
          flexDirection: "space-evenly",
          alignItems: "center"
        }}
      >
        <Text></Text>
        <Text></Text>
        <Input
          style={{
            multiline: true,
            textAlignVertical: "top",
            flex: 5
          }}
          ref={this.myTextInput}
          leftIcon={<Icon name="edit" size={18} color="blue" />}
          onChangeText={this.onChangeText}
          placeholder=" What you did today!"
        />
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>

        <Button
          style={{
            flex: 5,
            width: 250
          }}
          iconRight
          title="Add"
          onPress={this.onPress}
        />
      </View>
    );
  }
}
