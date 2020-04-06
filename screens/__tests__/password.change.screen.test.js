import React from "react";
import { create, act } from "react-test-renderer";
import { PasswordChangeScreen } from "../password.change.screen";

describe("Password Change Screen", () => {

  let testObject;

  let listener;
  let caughEvent;

  beforeEach(() => {
    listener = {
      onPasswordChangePress: function(onPressEvent) {
        caughtEvent = onPressEvent;
      },
      onPasswordChangeMismatchedEvent: function(onPasswordChangeMismatchedEvent) {
        caughtEvent = onPasswordChangeMismatchedEvent;
      },
      onPasswordViolatingPolicyEvent: function(onPasswordViolatingPolicyEvent) {
        caughtEvent = onPasswordViolatingPolicyEvent;
      }
    };
    testObject = create(
      <PasswordChangeScreen listener={listener}></PasswordChangeScreen>
    );
  });

  it("should emit an event when the passwords are entered equivalently", () => {

    testObject.getInstance().setPassword("password");
    testObject.getInstance().setReenteredPassword("password");

    testObject.getInstance().press();

    expect(caughtEvent.password.get()).toBe('password');
  });

  it('should emit an event when the passwords do not match policy on press', () => {

    let passwordViolatingPolicy = 'abc';
    testObject.getInstance().setPassword(passwordViolatingPolicy);
    testObject.getInstance().setReenteredPassword(passwordViolatingPolicy);

    testObject.getInstance().press();

    expect(caughtEvent.message).toBe('Password must be greater than or equal to eight characters');
  });

  it('should emit an error when the passwords were not entered', () => {
    let passwordViolatingPolicy = null;
    testObject.getInstance().setPassword(passwordViolatingPolicy);
    testObject.getInstance().setReenteredPassword(passwordViolatingPolicy);

    testObject.getInstance().press();

    expect(caughtEvent.message).toBe('Password must be greater than or equal to eight characters');
  });

  it('should emit an error event when the passwords do not match on press', () => {
    testObject.getInstance().setPassword("password");
    testObject.getInstance().setReenteredPassword("notmatching");

    testObject.getInstance().press();

    expect(caughtEvent.message).toBe('Passwords did not match');
  });
});
