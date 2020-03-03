import React, { Component } from "react";
import {View, Image } from 'react-native';
import { ListItem } from "react-native-elements";
import logo from '../checkbox.png';

export class HardWorkEntryScreenSegment extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <View style={{
        paddingTop: 10,
        paddingHorizontal: 10,
        
      }}>
      <ListItem
        key={this.props.hardWorkEntry.getAccomplishment()}
        title={this.props.hardWorkEntry.getAccomplishment()}
        titleStyle={{
          marginLeft: 15
        }}
        leftAvatar={{ source: logo } }
        subtitle={'Jan 25, 2019'}//{this.props.hardWorkEntry.getAccomplishedOn().toString()}
        bottomDivider
        chevron
        friction={90}
        tension={100}
        subtitleStyle={{
          marginLeft: 35
        }}
      />
      </View>
    );
  }
}
