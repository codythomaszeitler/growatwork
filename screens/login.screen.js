import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";

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
            flex: 1
          }}
        ></View>
        <View
          style={{
            flex: 0.5,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{
              justifyContent: 'flex-start',
              fontFamily: "PingFangTC-Thin",
              fontSize: 30
          }}>Log In</Text>

          <View style={{
              flex: 1
          }}>

          </View>

          <View
            style={{
              flex: 3
            }}
          >
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
            />
          </View>

          <View style={{
              flex: 20
          }}>

          </View>

          <View
            style={{
              flex: 3
            }}
          >
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
        </View>

        <View
          style={{
            flex: 2
          }}
        ></View>
      </View>
    );
  }
}
