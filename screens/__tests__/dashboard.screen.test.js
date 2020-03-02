import React from "react";
import { create, act } from "react-test-renderer";
import { DashboardScreen } from "../dashboard.screen";
import { configureEnzyme } from "../../setupTest";
import { ListItem } from "react-native-elements";
import { HardWorkEntry } from "../../pojo/hard.work.entry";
import { CareerImprovementClient } from "../../pojo/career.improvement.client";

describe("Dashboard view information", () => {
  let testObject;
  beforeEach(() => {
    configureEnzyme();
  });

  it("should load all hard work entries found in the initial sleep consultant client", () => {
    let careerImprovementClient = new CareerImprovementClient();

    testObject = create(
      <DashboardScreen
      careerImprovementClient={careerImprovementClient}
      ></DashboardScreen>
    );
  });

  it("should be able to add a hard work entry", () => {
    testObject = create(<DashboardScreen></DashboardScreen>);

    const toAdd = new HardWorkEntry("This is an achievement", new Date());
    testObject.getInstance().add(toAdd);

    expect(getDisplayedHardWork()).toContainEqual(displayConversion(toAdd));
  });

  function displayConversion(hardWorkEntry) {
    return {
      achievement: hardWorkEntry.getAccomplishment(),
      date: hardWorkEntry.getAccomplishedOn().toString()
    };
  }

  function getDisplayedHardWork() {
    const textBoxes = testObject.root.findAllByType(ListItem);

    const displayed = [];
    for (let i = 0; i < textBoxes.length; i++) {
      const textBox = textBoxes[i];

      displayed.push({
        achievement: textBox.instance.props.title,
        date: textBox.instance.props.subtitle
      });
    }

    return displayed;
  }
});
