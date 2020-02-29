import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { Card, Button } from "react-native-elements";

export class TodaysGoalsScreen extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: "#ffffff",
          flex: 3,
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Button
          style={{
            marginLeft: 25,
            marginRight: 25,
            width: 350
          }}
          title="Add Another Entry"
        ></Button>

        <Text></Text>
        <Text></Text>
        <Text>----------------------------------------------------------</Text>
        <Text></Text>

        <FlatList
          data={[
            { key: "Contact Boss     Feb 3rd, 2019" },
            { key: "Contact Boss     Feb 4th, 2019" },
            { key: "Contact Boss     Feb 5th, 2019" },
            { key: "Contact Boss     Feb 6th, 2019" }
          ]}
          renderItem={({ item }) => (
            <Card>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "PingFangTC-Thin"
                }}
              >
                {item.key}
              </Text>
            </Card>
          )}
        />
      </View>
    );
  }
}
