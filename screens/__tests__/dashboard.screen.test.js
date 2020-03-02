import React from 'react';
import {shallow} from 'enzyme';
import {DashboardScreen} from '../dashboard.screen';
import {configureEnzyme} from '../../setupTest';
import {HardWorkEntry} from '../../pojo/hard.work.entry';

describe('Dashboard view information', () => {

    beforeEach(() => {
        configureEnzyme();
    });

    it('should display all entries from career improvement client', () => {
        const component = shallow(<DashboardScreen></DashboardScreen>);

        const hardWorkEntry = new HardWorkEntry("This is my accomplishment", new Date());
        component.add(hardWorkEntry);
    });
});

