import React, { Component } from "react";
import { View, FlatList, Text, Alert } from "react-native";
import { HardWorkEntryScreenSegment } from "./hard.work.entry.screen.segment";
import { datastore } from "../datastore/datastore";

export class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    const client = datastore().get();
    client.addOnLogListener(this);

    this.state = {
      entries: client.getHardWork(),
      modalVisible: !this.hasAchievements()
    };
  }

  componentDidMount() {
    if (!this.hasAchievements()) {
      Alert.alert(
        'No accomplishments yet!',
        'Go to the add screen and put your hard work in!');
    }
  }

  hasAchievements() {
    const client = datastore().get();
    return client.getHardWork().length !== 0;
  }

  onLog(event) {
    this.setState({
      entries: [event.logged].concat(this.state.entries)
    });
  }

  add(entry) {
    const client = datastore().get();
    client.log(entry);
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.entries}
          keyExtractor={item => item.accomplishment}
          renderItem={({ item }) => (
            <HardWorkEntryScreenSegment
              hardWorkEntry={item}
            ></HardWorkEntryScreenSegment>
          )}
        ></FlatList>
      </View>
    );
  }
}
