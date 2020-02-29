import React, { Component } from "react";
import { Text, View, TextInput, Button } from "react-native";

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 0.5,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              justifyContent: "flex-start",
              fontFamily: "PingFangTC-Thin",
              fontSize: 30
            }}
          >
            Log In
          </Text>
          <Text
            style={{
              flex: 0.2
            }}
          ></Text>

          <TextInput
            style={{
              height: 40,
              width: 300,
              borderColor: "gray",
              borderWidth: 1,
              backgroundColor: "#bfbfbf"
            }}
            placeholder="  Username"
            autoCapitalize="none"
            keyboardType="email-address"
            autoFocus={true}
          />
          <Text
            style={{
              flex: 0.03
            }}
          ></Text>
          <TextInput
            style={{
              height: 40,
              width: 300,
              borderColor: "gray",
              borderWidth: 1,
              backgroundColor: "#bfbfbf"
            }}
            placeholder="  Password"
            secureTextEntry={true}
          />
        </View>

        <View style={{
            flex : .1,
            alignItems: 'center',
            justifyContent: 'center',

        }}>
          <Button title="Let's Go!" onPress={() => {this.props.navigation.navigate("Loading")}}></Button>
        </View>
      </View>
    );
  }
}
