import React, { Component } from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import {datastore} from '../datastore/datastore';
import { HardWorkEntry } from "../pojo/hard.work.entry";

export class InputHardWorkEntryScreen extends Component {

  constructor(props) {
    super(props);
    this.props = props;

    this.onChangeText = this.onChangeText.bind(this);
    this.onPress = this.onPress.bind(this);

    this.state = {
      accomplishment : ''
    }
  }

  onChangeText(event) {
    this.setState({
      accomplishment : event
    })
  }
  
  onPress() {
    if (!this.state.accomplishment) {
      return;
    }

    const client = datastore().getCareerImprovementClient();
    client.log(new HardWorkEntry(this.state.accomplishment, new Date()));
  }

  render() {
    return (
      <View
        style={{
          flex: 3,
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: "#ffffff" 
        }}
      >
        <Text style={{
          flexGrow: .1
        }}></Text>
          <Input style={{
            flexGrow: .5
          }} 
          onChangeText={this.onChangeText}
          placeholder="What you did today!" />
          <Button
            style={{
              width: 300,
              flexGrow : .5
            }}
            title="Add"
            onPress={this.onPress}
          />
      </View>
    );
  }
}
