import React, { Component } from "react";

export class HardWorkEntry extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.message}</Text>
            </View>
        );
    };
};