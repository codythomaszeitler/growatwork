import React, { Component } from "react";
import { Text, Modal, View, TouchableHighlight } from "react-native";
import { Button, Card, Icon, Input } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Divider } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Timestamp } from "../pojo/timestamp";
import { datastore } from "../datastore/datastore";

export class ExcelExportScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.onExcelStartPress = this.onExcelStartPress.bind(this);
    this.onFromChange = this.onFromChange.bind(this);
    this.onToChange = this.onToChange.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.turnOff = this.turnOff.bind(this);
    this.onExportViaExcel = this.onExportViaExcel.bind(this);
    this.onEmailDestinationChange = this.onEmailDestinationChange.bind(this);
    this.onExportViaEmail = this.onExportViaEmail.bind(this);

    this.state = {
      selectedToDate: new Date(),
      selectedFromDate: new Date(),
      toTimestamp: this.getStartingTo(),
      fromTimestamp: this.getStartingFrom(),
      modalVisible: false
    };
  }

  getStartingTo() {
    return Timestamp.today();
  }

  getStartingFrom() {
    return Timestamp.today();
  }

  onEmailDestinationChange(email) {
    this.state.destinationEmail = email;
  }

  onExportViaEmail() {
    this.props.onEmailWriter.write(
      this.state.destinationEmail,
      this.getSelectedAchievements()
    );
  }

  write(achievements) {
    this.props.onWrite.write(achievements);
  }

  setModalVisible(visible) {
    this.modalVisible = visible;
  }

  turnOff() {
    this.setState({ modalVisible: false });
  }

  onExcelStartPress() {
    this.setModalVisible(!this.state.modalVisible);
  }

  onFromChange(event) {
    const fromDate = new Date(event.nativeEvent.timestamp);
    this.state.fromTimestamp = Timestamp.fromDate(fromDate);
  }

  onToChange(event) {
    const toDate = new Date(event.nativeEvent.timestamp);
    this.state.toTimestamp = Timestamp.fromDate(toDate);
  }

  onExportViaExcel() {
    this.props.onExcelWriter.write(this.getSelectedAchievements());
  }

  getSelectedAchievements() {
    return datastore()
      .get()
      .getAchievements(this.state.toTimestamp, this.state.fromTimestamp);
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
              onPress={this.onExportViaExcel}
              testID="ExportViaExcel"
              title="Export"
            />
          </Card>

          <Card title="Export via Email">
            <Text style={{ marginBottom: 10 }}>
              Export your select achievements to given email address!
            </Text>
            <Input
              testID="DestinationEmailInput"
              placeholder="E-mail"
              onChangeText={this.onEmailDestinationChange}
            ></Input>
            <Text></Text>
            <Button
              icon={<Icon name="code" color="#ffffff" />}
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0
              }}
              onPress={this.onExportViaEmail}
              testID="ExportViaEmail"
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
          testID="Export"
          title="Export"
          onPress={this.onExcelStartPress}
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
          value={this.state.selectedFromDate}
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
          value={this.state.selectedToDate}
          onChange={this.onToChange}
        ></DateTimePicker>
        <Divider style={{ backgroundColor: "black" }} />
      </ScrollView>
    );
  }
}
