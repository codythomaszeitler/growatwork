import React, {Component} from 'react';
import { View, Text } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

export class ExcelExportScreen extends Component { 

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#ffffff'
            }}>

                <Text></Text>
                <Text></Text>
                <Text></Text>
                <Text style={{
                    fontSize: 20,
                    fontFamily: "PingFangTC-Thin"
                }}>     From:</Text>
                <DateTimePicker value={new Date()}></DateTimePicker>
                <Text></Text>
                <Text style={{
                    fontSize: 20,
                    fontFamily: "PingFangTC-Thin"
                }}>     To:</Text>
                <DateTimePicker value={new Date()}></DateTimePicker>
            </View>
        );
    }

}