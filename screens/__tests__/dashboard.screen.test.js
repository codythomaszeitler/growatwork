import renderer from 'react-test-renderer';
import React from 'react';
import {View} from 'react-native';

describe('Dashboard view information', () => {

    it('should display all entries from career improvement client', () => {
        const component = renderer.create(<View></View>);
        console.log(component);
    });
});

