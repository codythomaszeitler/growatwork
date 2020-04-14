import React, { Component } from "react";
import { Text, Modal, View, TouchableHighlight } from "react-native";
import { Button, Card, Icon, Input } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Divider } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Timestamp } from "../pojo/timestamp";
import { datastore } from "../datastore/datastore";
import { AchievementExcelWriter } from "../excelexport/excel.writer";
import * as MailComposer from "expo-mail-composer";
import * as FileSystem from "expo-file-system";

export class ExcelExportScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.client = datastore().get();

    this.onExcelStartPress = this.onExcelStartPress.bind(this);
    this.onFromChange = this.onFromChange.bind(this);
    this.onToChange = this.onToChange.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.turnOff = this.turnOff.bind(this);
    this.onExportViaExcel = this.onExportViaExcel.bind(this);
    this.onEmailDestinationChange = this.onEmailDestinationChange.bind(this);
    this.onExportViaEmail = this.onExportViaEmail.bind(this);

    const fromTimestamp = this.getStartingFrom();
    const toTimestamp = this.getStartingTo();

    this.state = {
      selectedToDate: toTimestamp.toDate(),
      selectedFromDate: fromTimestamp.toDate(),
      toTimestamp: toTimestamp,
      fromTimestamp: fromTimestamp,
      modalVisible: false,
      destinationEmail: this.client.getEmail(),
    };
  }

  getStartingTo() {
    let earliestAchievement = this.client.getLatestAchievement();

    let earliest;
    if (earliestAchievement) {
      earliest = earliestAchievement.getAccomplishedOn();
    } else {
      earliest = Timestamp.today();
    }

    return earliest;
  }

  getStartingFrom() {
    let latestAchievement = this.client.getEarliestAchievement();

    if (latestAchievement) {
      latest = latestAchievement.getAccomplishedOn();
    } else {
      latest = Timestamp.today();
    }

    return latest;
  }

  onEmailDestinationChange(email) {
    this.setState({
      destinationEmail: email,
    });
  }

  async onExportViaEmail() {
    try {
      const excelWriter = new AchievementExcelWriter();
      await excelWriter.write(
        "yourhardwork.csv",
        this.getSelectedAchievements()
      );
      await MailComposer.composeAsync({
        recipients: [this.state.destinationEmail],
        subject: this.parseSubjectLine(),
        attachments: [FileSystem.documentDirectory + "yourhardwork.csv"],
      });
      this.turnOff();
    } catch (e) {
      Alert.alert("Could not export", e.message);
    }
  }

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
    });
  }

  turnOff() {
    this.setState({ modalVisible: false });
  }

  onExcelStartPress() {
    this.setModalVisible(!this.state.modalVisible);
  }

  onFromChange(event) {
    const fromDate = new Date(event.nativeEvent.timestamp);

    this.setState({
      fromTimestamp: Timestamp.fromDate(fromDate),
      selectedFromDate: fromDate,
    });
  }

  onToChange(event) {
    const toDate = new Date(event.nativeEvent.timestamp);
    this.setState({
      toTimestamp: Timestamp.fromDate(toDate),
      selectedToDate: toDate,
    });
  }

  async onExportViaExcel() {
    const excelWriter = new AchievementExcelWriter();
    await excelWriter.write("yourhardwork.csv", this.getSelectedAchievements());
  }

  parseSubjectLine() {
    return (
      "Your hard work between " +
      this.parseTimestampEmailFormat(this.state.fromTimestamp) +
      " to " +
      this.parseTimestampEmailFormat(this.state.toTimestamp)
    );
  }

  parseTimestampEmailFormat(timestamp) {
    return timestamp.getMonth() + " " + timestamp.getDay();
  }

  getSelectedAchievements() {
    const startOfDay = this.state.fromTimestamp.startOfDay();
    const endOfDay = this.state.toTimestamp.endOfDay();

    return datastore().get().getAchievements(startOfDay, endOfDay);
  }

  render() {
    return (
      <ScrollView
        testID="scrollView"
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
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

          <Card title="Export via Email">
            <Text style={{ marginBottom: 10 }}>
              Export the achievements within the selected ranged to the given
              email address!
            </Text>
            <Input
              testID="DestinationEmailInput"
              placeholder="E-mail"
              defaultValue={this.state.destinationEmail}
              onChangeText={this.onEmailDestinationChange}
            ></Input>
            <Text></Text>
            <Button
              icon={<Icon name="code" color="#ffffff" />}
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
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
                marginBottom: 0,
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
            alignItems: "center",
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
            marginLeft: 30,
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
            marginLeft: 30,
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
