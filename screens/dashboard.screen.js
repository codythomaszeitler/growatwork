import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import { HardWorkEntryScreenSegment } from "./hard.work.entry.screen.segment";

export class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      entries : this.props.careerImprovementClient.getHardWork()
    }
  }

  add(entry) {
    this.setState({
      entries: this.state.entries.concat([entry])
    });
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.entries}
          renderItem={({ item }) => (
            <HardWorkEntryScreenSegment hardWorkEntry={item}></HardWorkEntryScreenSegment> 
          )}
        ></FlatList>
      </View>
    );
  }
}
