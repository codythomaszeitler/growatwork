import React from "react";
import { create } from "react-test-renderer";
import { ConfirmationCodeEntryScreen } from "../confirmation.code.entry.screen";

describe("Confirmation Code Entry Screen", () => {

    let caughtEvent;
    let testObject;

    beforeEach(() => {
        const listener = {
          onConfirmationCodePress: function (event) {
            caughtEvent = event;
          },
          onNoConfirmationCodeEnteredEvent: function (event) {
            caughtEvent = event;
          },
        };
    
        testObject = create(
          <ConfirmationCodeEntryScreen
            listener={listener}
          ></ConfirmationCodeEntryScreen>
        );
    });

  it("should emit an event when there is no confirmation code entered", () => {
    testObject.getInstance().press();

    expect(caughtEvent.message).toBe('No confirmation code entered');
  });

  it('should emit an event when there is a confirmation code entered', () => {
    testObject.getInstance().onConfirmationCodeChange('123456');
    testObject.getInstance().press();

    expect(caughtEvent.code).toBe('123456');
  });
});
