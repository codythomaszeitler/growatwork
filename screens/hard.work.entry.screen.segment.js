import React, { Component } from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";
import logo from "../checkbox.png";

class OnPressEvent {
  constructor(accomplishment) {
    this.accomplishment = accomplishment.copy();
  }
}

export class HardWorkEntryScreenSegment extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.generateUniqueKey = this.generateUniqueKey.bind(this);
    this.getDateView = this.getDateView.bind(this);
    this.onPress = this.onPress.bind(this);

    this.onPressListeners = [this.props.onPressListener];
  }

  onPress() {
    for (let i = 0; i < this.onPressListeners.length; i++) {
      const listener = this.onPressListeners[i];
      listener.onPress(new OnPressEvent(this.props.hardWorkEntry));
    }
  }

  generateUniqueKey() {
    const accomplishment = this.props.hardWorkEntry;
    const key =
      accomplishment.getAccomplishment() +
      accomplishment.getAccomplishedOn().toString();
    return key;
  }

  getDateView(timestamp) {
    return timestamp.toDate().toLocaleDateString();
  }

  render() {
    return (
      <View
        style={{
          paddingTop: 10,
          paddingHorizontal: 10
        }}
      >
          <ListItem
            key={this.generateUniqueKey(this.props.hardWorkEntry)}
            title={this.props.hardWorkEntry.getAccomplishment()}
            titleStyle={{
              marginLeft: 15
            }}
            onPress={this.onPress}
            leftAvatar={{ source: logo }}
            subtitle={this.getDateView(
              this.props.hardWorkEntry.getAccomplishedOn()
            )}
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
