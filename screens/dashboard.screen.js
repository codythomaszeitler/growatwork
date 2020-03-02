import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import { ListItem } from "react-native-elements";

export class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props);
    this.state = {
      list: []
    };
  }

  add(entry) {
    this.setState({
      list: this.state.list.concat({
        name: entry.getAccomplishment(),
        subtitle : entry.getAccomplishedOn().toString()
      })
    });
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.list}
          renderItem={({ item }) => (
            <ListItem
              key={item}
              title={item.name}
              titleStyle={{
                marginLeft: 25
              }}
              subtitle={item.subtitle}
              bottomDivider
              chevron
              friction={90}
              tension={100}
              subtitleStyle={{
                marginLeft: 65
              }}
            />
          )}
        ></FlatList>
      </View>
    );
  }
}
