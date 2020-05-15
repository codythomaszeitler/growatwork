import React, { Component } from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";
import logo from "../checkbox.png";
import { datastore } from "../datastore/datastore";

class OnPressEvent {
  constructor(accomplishment) {
    this.accomplishment = accomplishment.copy();
  }
}

export class HardWorkEntryScreenSegment extends Component {
  constructor(props) {
    super(props);
    this.client = datastore().get();
    this.client.addOnAccomplishmentAssociatedListener(this);
    this.client.addOnAccomplishmentDeassociatedListener(this);

    this.props = props;
    this.generateUniqueKey = this.generateUniqueKey.bind(this);
    this.onPress = this.onPress.bind(this);

    this.onPressListeners = [];
    if (this.props.onPressListener) {
      this.onPressListeners.push(this.props.onPressListener);
    }

    this.state = {
      subtitle:
        this.getDateView(this.props.hardWorkEntry.getAccomplishedOn()) +
        this.parseAssociatedGoalText(),
      goal: this.client.getGoalWithAccomplishment(this.props.hardWorkEntry),
      paddingTop: this.getTopPadding(),
      paddingHorizontal: this.getHorizontalPadding(),
      accomplishment: this.props.hardWorkEntry,
    };
  }

  parseAssociatedGoalText() {
    let text = "";

    const goal = this.client.getGoalWithAccomplishment(
      this.props.hardWorkEntry
    );
    if (!this.props.hideAssociatedGoal) {
      if (goal) {
        text = " - " + goal.get();
      }
    }

    return text;
  }

  componentWillUnmount() {
    this.client.removeOnAccomplishmentAssociatedListener(this);
    this.client.removeOnAccomplishmentDeassociatedListener(this);
  }

  getTopPadding() {
    let topPadding = 10;
    if (this.props.paddingTop) {
      topPadding = this.props.paddingTop;
    }
    return topPadding;
  }

  getHorizontalPadding() {
    let horizontalPadding = 10;
    if (this.props.paddingHorizontal) {
      horizontalPadding = this.props.horizontalPadding;
    }
    return horizontalPadding;
  }

  onAccomplishmentAssociated(event) {
    if (event.accomplishment.equals(this.state.accomplishment)) {
      this.setState({
        subtitle:
          this.getDateView(this.props.hardWorkEntry.getAccomplishedOn()) +
          this.parseAssociatedGoalText(),
        goal: this.client.getGoalWithAccomplishment(this.props.hardWorkEntry),
      });
    }
  }

  onAccomplishmentDeassociated(event) {
    if (event.accomplishment.equals(this.state.accomplishment)) {
      this.setState({
        subtitle:
          this.getDateView(this.props.hardWorkEntry.getAccomplishedOn()),
          goal : null
      });
    }
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
          paddingHorizontal: 10,
        }}
      >
        <ListItem
          key={this.generateUniqueKey(this.props.hardWorkEntry)}
          title={this.props.hardWorkEntry.getAccomplishment()}
          titleStyle={{
            marginLeft: 15,
          }}
          onPress={this.onPress}
          leftAvatar={{ source: logo }}
          subtitle={this.state.subtitle}
          bottomDivider={!this.props.hideDivider}
          chevron={!this.props.hideChevron}
          friction={90}
          tension={100}
          subtitleStyle={{
            marginLeft: 35,
          }}
        />
      </View>
    );
  }
}
