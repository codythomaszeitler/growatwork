import React, { Component } from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";

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
  render() {
    return (
      <View>
        <FlatList style={{
          marginTop: 25,
        }}
          data={list}
          renderItem={({ item }) => (
            <View>
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
            </View>
          )}
        ></FlatList>
      </View>
    );
  }
}
