import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Divider } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

export class ExcelExportScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.onPress = this.onPress.bind(this);
    this.onFromChange = this.onFromChange.bind(this);
    this.onToChange = this.onToChange.bind(this);

    this.state = {
      toDate: new Date(),
      fromDate: new Date()
    };
  }

  onPress() {
    console.log(this.state.fromDate);
    console.log(this.state.toDate);
  }

  onFromChange(event) {
    this.setState({
      fromDate: new Date(event.nativeEvent.timestamp)
    });
  }

  onToChange(event) {
    this.setState({
      toDate: new Date(event.nativeEvent.timestamp)
    });
  }

  render() {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#ffffff"
        }}
      >
        <Divider style={{ backgroundColor: "black" }} />

        <Text></Text>
        <Button
          style={{
            flexGrow: 0.5,
            alignItems: "center"
          }}
          title="Export"
          onPress={this.onPress}
        />
        <Text></Text>
        <Divider style={{ backgroundColor: "black" }} />
        <Text></Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "PingFangTC-Thin",
            marginLeft: 30
          }}
        >
          {" "}
          From:
        </Text>
        <Text></Text>
        <DateTimePicker
          value={this.state.fromDate}
          onChange={this.onFromChange}
        ></DateTimePicker>
        <Text></Text>
        <Divider style={{ backgroundColor: "black" }} />

        <Text></Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "PingFangTC-Thin",
            marginLeft: 30
          }}
        >
          {" "}
          To:
        </Text>
        <DateTimePicker
          value={this.state.toDate}
          onChange={this.onToChange}
        ></DateTimePicker>
        <Divider style={{ backgroundColor: "black" }} />
      </ScrollView>
    );
  }
}
