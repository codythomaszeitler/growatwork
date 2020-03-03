
import React from "react";
import { create, act } from "react-test-renderer";
import { DashboardScreen } from "../dashboard.screen";
import { configureEnzyme } from "../../setupTest";
import {HardWorkEntryScreenSegment} from '../../screens/hard.work.entry.screen.segment';
import { HardWorkEntry } from "../../pojo/hard.work.entry";
import { CareerImprovementClient } from "../../pojo/career.improvement.client";
import {getInstance} from '../../datastore/datastore';

describe("Dashboard view information", () => {
  let testObject;
  let careerImprovementClient;

  beforeEach(() => {
    configureEnzyme();

    careerImprovementClient = new CareerImprovementClient();
    careerImprovementClient.id = '1000';
    getInstance().add(careerImprovementClient);
  });

  it("should load all hard work entries found in the initial sleep consultant client", () => {
    const first = new HardWorkEntry("1", new Date());
    const second = new HardWorkEntry("2", new Date());
    const third = new HardWorkEntry("3", new Date());

    careerImprovementClient.log(first);
    careerImprovementClient.log(second);
    careerImprovementClient.log(third);

    testObject = create(
      <DashboardScreen
        careerImprovementClient={careerImprovementClient}
      ></DashboardScreen>
    );

    expect(getDisplayedHardWork()).toContainEqual(displayConversion(first));
    expect(getDisplayedHardWork()).toContainEqual(displayConversion(second));
    expect(getDisplayedHardWork()).toContainEqual(displayConversion(third));
  });

  it("should be able to add a hard work entry", () => {
    testObject = create(
      <DashboardScreen
        careerImprovementClient={careerImprovementClient}
      ></DashboardScreen>
    );

    const first = new HardWorkEntry("1", new Date());
    const second = new HardWorkEntry("2", new Date());
    testObject.getInstance().add(first);
    testObject.getInstance().add(second);

    expect(getDisplayedHardWork()).toContainEqual(displayConversion(first));
    expect(getDisplayedHardWork()).toContainEqual(displayConversion(second));
  });

  function displayConversion(hardWorkEntry) {
    return {
      achievement: hardWorkEntry.getAccomplishment(),
      date: hardWorkEntry.getAccomplishedOn().toString()
    };
  }

  function getDisplayedHardWork() {
    const textBoxes = testObject.root.findAllByType(HardWorkEntryScreenSegment);
    const displayed = [];
    for (let i = 0; i < textBoxes.length; i++) {
      const textBox = textBoxes[i];

      const hardWorkEntry = textBox.instance.props.hardWorkEntry;

      displayed.push({
        achievement: hardWorkEntry.getAccomplishment(),
        date: hardWorkEntry.getAccomplishedOn().toString()
      });
    }

    return displayed;
  }

});
