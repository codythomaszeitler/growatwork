import React, { Component } from "react";
import { Text, Modal, View, TouchableHighlight } from "react-native";
import { Button, Card, Icon, Input } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Divider } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Timestamp } from "../pojo/timestamp";

export class ExcelExportScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.onPress = this.onPress.bind(this);
    this.onFromChange = this.onFromChange.bind(this);
    this.onToChange = this.onToChange.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.turnOff = this.turnOff.bind(this);

    this.state = {
      toTimestamp: this.props.startingTo.copy(),
      fromTimestamp: this.props.startingFrom.copy(),
      modalVisible: false
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  turnOff() {
    this.setState({ modalVisible: false });
  }

  onPress() {
    this.setModalVisible(!this.state.modalVisible);
  }

  onFromChange(event) {
    console.log("on from change fired");
    const fromDate = new Date(event.nativeEvent.timestamp);

    this.setState({
      fromTimestamp: Timestamp.fromDate(fromDate)
    });
  }

  onToChange(event) {
    console.log("on to change fired");

    const toDate = new Date(event.nativeEvent.timestamp);

    this.setState({
      toDate: Timestamp.fromDate(toDate)
    });
  }

  render() {
    return (
      <ScrollView
        testID="scrollView"
        style={{
          flex: 1,
          backgroundColor: "#ffffff"
        }}
      >
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Card title="Export via Excel">
            <Text style={{ marginBottom: 10 }}>
              Export your select achievements to an excel sheet on your phone!
            </Text>
            <Button
              icon={<Icon name="code" color="#ffffff" />}
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0
              }}
              title="Export"
            />
          </Card>

          <Card title="Export via Email">
            <Text style={{ marginBottom: 10 }}>
              Export your select achievements to given email address!
            </Text>
            <Input placeholder="E-mail"></Input>
            <Text></Text>
            <Button
              icon={<Icon name="code" color="#ffffff" />}
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0
              }}
              title="Export"
            />
          </Card>

          <Text></Text>
          <Text></Text>
          <Text></Text>

          <Card>
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0
              }}
              title="Cancel"
              onPress={this.turnOff}
            />
          </Card>
        </Modal>
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
          testID="fromDateTimePicker"
          value={this.state.fromTimestamp.toDate()}
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
          testID="toDateTimePicker"
          value={this.state.toTimestamp.toDate()}
          onChange={this.onToChange}
        ></DateTimePicker>
        <Divider style={{ backgroundColor: "black" }} />
      </ScrollView>
    );
  }
}
