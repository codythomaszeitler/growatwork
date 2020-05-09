import React, { Component } from "react";
import { View, Text, Modal } from "react-native";
import { Input, Button, Card, ListItem } from "react-native-elements";
import { datastore } from "../datastore/datastore";
import { HardWorkEntry } from "../pojo/hard.work.entry";
import Icon from "react-native-vector-icons/FontAwesome";
import { Timestamp } from "../pojo/timestamp";
import { Keyboard } from "react-native";
import Toast from "react-native-root-toast";
import { LogAccomplishmentService } from "../service/log.accomplishment.service";
import { database } from "../database/database";
import { Alert } from "react-native";
import { GoalsScreen } from "./goals.screen";

export class InputHardWorkEntryScreen extends Component {
  constructor(props) {
    super(props);

    this.onChangeText = this.onChangeText.bind(this);
    this.onPress = this.onPress.bind(this);
    this.onLongTermChangeText = this.onLongTermChangeText.bind(this);
    this.onLongTermGoalAddPress = this.onLongTermGoalAddPress.bind(this);
    this.myTextInput = React.createRef();
    this.onAssociateGoalPress = this.onAssociateGoalPress.bind(this);
    this.onAssociateGoalBackButtonPress = this.onAssociateGoalBackButtonPress.bind(
      this
    );

    this.state = {
      accomplishment: "",
      isAddButtonDisabled: false,
      modalVisible: false,
      longTermGoal: "",
    };
  }

  onAssociateGoalPress(event) {
    this.setState({
      modalVisible: true,
    });
  }

  onAssociateGoalBackButtonPress(event) {
    this.setState({
      modalVisible: false,
    });
  }

  onChangeText(event) {
    this.setState({
      accomplishment: event,
    });
  }

  async onLongTermGoalAddPress() {
    this.setState({
      modalVisible: true,
    });
  }

  onLongTermChangeText(event) {
    this.setState({
      longTermGoal: event,
    });
  }

  async onPress() {
    if (!this.state.accomplishment) {
      return;
    }

    this.setState({
      isAddButtonDisabled: true,
    });

    const newEntry = new HardWorkEntry(
      this.state.accomplishment,
      Timestamp.today()
    );

    try {
      const client = datastore().get();

      const logAccomplishmentService = new LogAccomplishmentService(database());
      await logAccomplishmentService.log(client, newEntry);
      Keyboard.dismiss();

      Toast.show("Accomplishment Successfully Added!", {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: "#1ec96b",
        opacity: 1,
      });
      this.setState({
        accomplishment: "",
      });
      this.myTextInput.current.clear();
    } catch (e) {
      Alert.alert("Could not log accomplishment", e.message);
    }

    this.setState({
      isAddButtonDisabled: false,
    });
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "#ffffff",
          justifyContent: "space-evenly",
          flexDirection: "space-evenly",
          alignItems: "stretch",
          flex: 1,
        }}
      >
        <Modal animationType="slide" visible={this.state.modalVisible}>
          <View
            style={{
              flex: 1,
              alignItems : 'flex-start'
            }}
          ></View>
          <View style={{
            flex : 15,
            justifyContent : 'flex-start'
          }}>
            <Text style={{
              fontSize : 20
            }}>                              Long Term Goals</Text>
            <GoalsScreen></GoalsScreen>
          </View>
          <View style={{
            flex : 1,
            justifyContent: 'flex-end',
            alignItems : 'center'
          }}>
            <Button
              title="Back"
              onPress={this.onAssociateGoalBackButtonPress}
            ></Button>
            <Text></Text>
          </View>
        </Modal>

        <View
          style={{
            flex: 0.5,
          }}
        ></View>
        <View
          style={{
            flex: 5,
          }}
        >
          <Card>
            <Input
              style={{
                multiline: true,
                textAlignVertical: "top",
                flex: 4,
              }}
              ref={this.myTextInput}
              leftIcon={<Icon name="edit" size={18} color="blue" />}
              onChangeText={this.onChangeText}
              placeholder=" What you did today!"
            />
            <Text></Text>
            <Button
              disabled={this.state.isAddButtonDisabled}
              iconRight
              title="Add"
              onPress={this.onPress}
            />
          </Card>
        </View>

        <View>
          <Card>
            <Text
              style={{
                fontSize: 20,
              }}
            >
              {" "}
              Implement AI
            </Text>
            <Text></Text>
            <Button
              title="Associate Goal"
              onPress={this.onAssociateGoalPress}
            ></Button>
          </Card>
        </View>
        <View
          style={{
            flex: 10,
          }}
        ></View>
      </View>
    );
  }
}
