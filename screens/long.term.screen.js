import React, { Component } from "react";
import { View } from "react-native";
import { datastore } from "../datastore/datastore";

export class LongTermScreen extends Component {
  constructor(props) {
    super(props);

    this.client = datastore().get();
  }

  render() {
    return (
      <View>
      </View>
    );
  }
}
