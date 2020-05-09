import React, { Component } from "react";
import { View, FlatList, Modal, Alert } from "react-native";
import { Text, Button, Card, Icon, Input } from "react-native-elements";
import { HardWorkEntryScreenSegment } from "./hard.work.entry.screen.segment";
import { datastore } from "../datastore/datastore";
import { ChangeAccomplishmentService } from "../service/change.accomplishment.service";
import { DeleteAccomplishmentService } from "../service/delete.accomplishment.service";
import { database } from "../database/database";

export class DashboardScreen extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.client = datastore().get();
    this.client.addOnLogListener(this);
    this.client.addOnLogRemovedListener(this);

    this.generateUniqueKey = this.generateUniqueKey.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onAccomplishmentTextChange = this.onAccomplishmentTextChange.bind(
      this
    );

    this.state = {
      entries: this.client.getHardWork().reverse(),
      modalVisible: false,
      accomplishmentText: "",
      defaultValue: "",
      accomplishment: null,
      isSavedButtonDisabled: false,
      isDeleteButtonDisabled: false,
    };
  }

  componentDidMount() {
    // We have to wait for the modal to dissapear from
    // the loading screen to be able to show the Alert.
    setTimeout(() => {
      if (!this.hasAchievements()) {
        Alert.alert(
          "No accomplishments yet!",
          "Go to the add screen and put your hard work in!"
        );
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.client.removeOnLogRemovedListener(this);
    this.client.removeOnLogListener(this);
  }

  hasAchievements() {
    const client = datastore().get();
    return client.getHardWork().length !== 0;
  }

  onLog() {
    this.setState({
      entries: this.client.getHardWork().reverse(),
    });
  }

  onLogRemoved() {
    this.setState({
      entries: this.client.getHardWork().reverse(),
    });
  }

  add(entry) {
    this.client.log(entry);
  }

  generateUniqueKey(accomplishment) {
    return (
      accomplishment.getAccomplishment() +
      accomplishment.getAccomplishedOn().toString()
    );
  }

  async onSave() {
    this.setState({
      isSavedButtonDisabled: true,
      isDeleteButtonDisabled: true,
    });
    const accomplishment = this.state.accomplishment.copy();
    const text = this.state.accomplishmentText;

    if (text.length === 0 || text === accomplishment.getAccomplishment()) {
      this.setState({
        modalVisible: false,
        defaultValue: "",
        accomplishment: null,
        isSavedButtonDisabled: false,
      });
      return;
    }

    const changeAccomplishmentService = new ChangeAccomplishmentService(
      database()
    );
    try {
      await changeAccomplishmentService.change(
        this.client,
        accomplishment,
        text
      );
    } catch (e) {
      Alert.alert("Could not change accomplishment", e.message);
    }
    this.setState({
      modalVisible: false,
      defaultValue: "",
      accomplishment: null,
      isSavedButtonDisabled: false,
      isDeleteButtonDisabled: false,
    });
  }

  async onDelete() {
    this.setState({
      isSavedButtonDisabled: true,
      isDeleteButtonDisabled: true,
    });

    const accomplishment = this.state.accomplishment.copy();
    const service = new DeleteAccomplishmentService(database());
    try {
      await service.delete(this.client, accomplishment);
      this.setState({
        modalVisible: false,
        defaultValue: "",
        accomplishment: null,
      });
    } catch (e) {
      Alert.alert("Could not delete accomplishment", e.message);
    }

    this.setState({
      isSavedButtonDisabled: false,
      isDeleteButtonDisabled: false,
    });
  }

  onPress(event) {
    this.setState({
      modalVisible: true,
      defaultValue: event.accomplishment.getAccomplishment(),
      accomplishment: event.accomplishment,
      accomplishmentText: event.accomplishment.getAccomplishment(),
    });
  }

  onBack() {
    this.setState({
      modalVisible: false,
      defaultValue: "",
      accomplishment: null,
    });
  }

  onAccomplishmentTextChange(accomplishmentText) {
    this.setState({
      accomplishmentText: accomplishmentText,
    });
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 0.5,
              }}
            ></View>
            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "PingFangTC-Thin",
                  fontSize: 30,
                }}
              >
                Accomplishment
              </Text>
            </View>

            <View
              style={{
                alignSelf: "stretch",
                flex: 4,
              }}
            >
              <Card title="Change Accomplishment">
                <Input
                  defaultValue={this.state.defaultValue}
                  onChangeText={this.onAccomplishmentTextChange}
                ></Input>
                <Text></Text>
                <Button
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                  }}
                  onPress={this.onSave}
                  title="Change"
                  disabled={this.state.isSavedButtonDisabled}
                />
              </Card>
              <View
                style={{
                  flex: 0.2,
                }}
              ></View>
              <Card>
                <Button
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                  }}
                  onPress={this.onDelete}
                  disabled={this.state.isDeleteButtonDisabled}
                  title="Delete"
                />
              </Card>
            </View>
            <View
              style={{
                flex: 1,
                alignSelf: "stretch",
              }}
            >
              <Card>
                <Button
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                  }}
                  onPress={this.onBack}
                  title="Back"
                />
              </Card>
            </View>
            <View style={{ flex: 1 }}></View>
          </View>
        </Modal>
        <FlatList
          data={this.state.entries}
          keyExtractor={(item) => {
            return this.generateUniqueKey(item);
          }}
          renderItem={({ item }) => (
            <HardWorkEntryScreenSegment
              onPressListener={this}
              hardWorkEntry={item}
            ></HardWorkEntryScreenSegment>
          )}
        ></FlatList>

      </View>
    );
  }
}
