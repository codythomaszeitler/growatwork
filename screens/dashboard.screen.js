import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { Card, Button } from "react-native-elements";

export class DashboardScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 10,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffffff"
        }}
      >
        <Text></Text>
        <Text></Text>
        <Button
          style={{
            marginLeft: 50,
            marginRight: 50,
            width: 350
          }}
          title="Enter Items for Today"
          onPress={() => {this.props.navigation.navigate("TodaysGoals")}}
        ></Button>
        <Text></Text>
        <Text></Text>
        <Button
          style={{
            marginLeft: 50,
            marginRight: 50,
            width: 350
          }}
          title="Export to Excel"
          onPress={() => {this.props.navigation.navigate("ExcelExport")}}
        ></Button>
        <Text></Text>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "PingFangTC-Thin"
          }}
        >
          {" "}
          Your hard work
        </Text>
        <Text>
          ----------------------------------------------------------
        </Text>

        <FlatList
          style={{
            marginLeft: 20,
            marginRight: 20
          }}
          data={[
            { key: "Contact Boss     Jan 20th, 2019" },
            { key: "Contact Boss     Jan 21st, 2019" },
            { key: "Contact Boss     Jan 22nd, 2019" },
            { key: "Contact Boss     Jan 23nd, 2019" },
            { key: "Contact Boss     Jan 24th, 2019" },
            { key: "Contact Boss     Jan 25th, 2019" },
            { key: "Contact Boss     Jan 26th, 2019" },
            { key: "Contact Boss     Jan 28th, 2019" },
            { key: "Contact Boss     Jan 29th, 2019" },
            { key: "Contact Boss     Jan 30th, 2019" },
            { key: "Contact Boss     Jan 31st, 2019" },
            { key: "Contact Boss     Feb 1st, 2019" },
            { key: "Contact Boss     Feb 2nd, 2019" },
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
