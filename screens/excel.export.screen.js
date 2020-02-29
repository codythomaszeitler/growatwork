import React, {Component} from 'react';
import { View, Text, DatePickerIOS} from "react-native";


export class ExcelExportScreen extends Component { 

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#ffffff'
            }}>

                <Text></Text>
                <Text></Text>
                <Text style={{
                    fontSize: 20,
                    fontFamily: "PingFangTC-Thin"
                }}>     From:</Text>
                <DatePickerIOS date={new Date()}></DatePickerIOS>
                <Text></Text>
                <Text style={{
                    fontSize: 20,
                    fontFamily: "PingFangTC-Thin"
                }}>     To:</Text>
                <DatePickerIOS date={new Date()}></DatePickerIOS>
            </View>
        );
    }

}