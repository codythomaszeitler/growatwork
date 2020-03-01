import renderer from 'react-test-renderer';
import React from 'react';

import {DashboardScreen} from '../dashboard.screen';

describe('Dashboard view information', () => {

    it('should display all entries from career improvement client', () => {
        const component = renderer.create(<DashboardScreen></DashboardScreen>);
        console.log(component);
    });
});

