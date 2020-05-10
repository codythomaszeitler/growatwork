import React, { Component } from "react";
import { View, Text, Modal, Alert, Keyboard } from "react-native";
import { Input, Button, Card, ListItem, Header } from "react-native-elements";
import { datastore } from "../datastore/datastore";
import { HardWorkEntry } from "../pojo/hard.work.entry";
import Icon from "react-native-vector-icons/FontAwesome";
import { Timestamp } from "../pojo/timestamp";
import Toast from "react-native-root-toast";
import { LogAccomplishmentService } from "../service/log.accomplishment.service";
import { database } from "../database/database";
import { ScrollView } from "react-native-gesture-handler";
import {Goal} from '../pojo/goal';

const noGoalSeleceted = "--NONE--";

export class InputHardWorkEntryScreen extends Component {
  constructor(props) {
    super(props);

    this.client = datastore().get();
    this.client.addOnGoalAddedListener(this);

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
      selectedGoal: noGoalSeleceted,
      goals: this.client.getGoals(),
    };
  }

  onGoalAdded(event) {
    this.setState({
      goals: this.client.getGoals(),
    });
  }

  onSelect(event, selectedGoalText) {
    this.setState({
      selectedGoal: selectedGoalText,
      modalVisible : false
    });
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
      await logAccomplishmentService.log(client, newEntry, new Goal(this.state.selectedGoal));
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
            }}
          >
            <Header
              centerComponent={{
                text: "Select a Goal",
                style: { color: "#fff", fontSize: 20 },
              }}
            ></Header>

            <ScrollView
              style={{
                flex: 10,
              }}
            >
              {this.state.goals.map((goal) => {
                return (
                  <ChoosableGoalScreenSegment
                    key={goal.get()}
                    onSelectListener={this}
                    goal={goal}
                  ></ChoosableGoalScreenSegment>
                );
              })}
              <ChoosableGoalScreenSegment
                key={this.noGoalSeleceted}
                onSelectListener={this}
                goal={null}
              ></ChoosableGoalScreenSegment>
            </ScrollView>

            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button
                title="Back"
                onPress={this.onAssociateGoalBackButtonPress}
                style={{
                  width: 250,
                }}
              ></Button>
            </View>
            <View
              style={{
                flex: 0.25,
              }}
            ></View>
          </View>
        </Modal>

        <View
          style={{
            flex: 0.5,
          }}
        ></View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
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
          </Card>
        </View>

        <View
          style={{
            flex: 4,
            justifyContent: "flex-start",
          }}
        >
          <Card>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                {this.state.selectedGoal}
              </Text>
            </View>
            <Text></Text>
            <Button
              title="Associate"
              onPress={this.onAssociateGoalPress}
            ></Button>
          </Card>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <Button
            disabled={this.state.isAddButtonDisabled}
            iconRight
            title="Add"
            onPress={this.onPress}
            style={{
              width: 250,
            }}
          />
        </View>
      </View>
    );
  }
}

class ChoosableGoalScreenSegment extends Component {
  constructor(props) {
    super(props);

    const parseTitle = (goal) => {
      let title = noGoalSeleceted;
      if (goal) {
        title = props.goal.get();
      }
      return title;
    }

    this.onPress = this.onPress.bind(this);
    this.listener = props.onSelectListener;

    this.state = {
      title: parseTitle(props.goal),
    };
  }

  onPress(event) {
    this.listener.onSelect(event, this.state.title);
  }

  render() {
    return (
      <ListItem
        title={this.state.title}
        onPress={this.onPress}
        bottomDivider
        checkmark
      ></ListItem>
    );
  }
}
