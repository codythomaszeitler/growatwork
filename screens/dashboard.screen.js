import React, { Component } from "react";
import { View, FlatList } from "react-native";


const list = [
  {
    name: "Grow and Thrive at Work"
  },
  {
    name: "Amy Farha",
    subtitle: "Vice President"
  },
  {
    name: "Chris Jackson",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    subtitle: "Vice Chairman"
  },
  {
    name: "Chris Jackson",
    subtitle: "Vice Chairman"
  },
];

export class DashboardScreen extends Component {

  constructor(props) {
    super(props);
    this.props = props;
  }

  add(entry) {

  }

  render() {
    return (
      <View>
        <FlatList data={list} renderItem={({item}) => 
          <View>

          </View>
        }>
        </FlatList>
      </View>
    );
  }
}
