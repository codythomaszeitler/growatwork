import React, { Component } from "react";
import { ListItem } from "react-native-elements";

export class HardWorkEntryScreenSegment extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidCatch(error, errorInfo) {
  }

  render() {
    return (
      <ListItem
        key={this.props.hardWorkEntry.getAccomplishment()}
        title={this.props.hardWorkEntry.getAccomplishment()}
        titleStyle={{
          marginLeft: 25
        }}
        subtitle={this.props.hardWorkEntry.getAccomplishedOn().toString()}
        bottomDivider
        chevron
        friction={90}
        tension={100}
        subtitleStyle={{
          marginLeft: 65
        }}
      />
    );
  }
}
