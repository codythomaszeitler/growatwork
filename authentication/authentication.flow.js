import {
  UserNotFoundCode,
  IncorrectPasswordCode,
  PasswordResetRequiredCode,
  UserNotConfirmedCode,
  SignUpFailedCode,
} from "./auth";

export const Completed = "Completed";
export const ResetPassword = "ResetPassword";
export const EnterConfirmationCode = "ConfirmSignUp";
export const PasswordRetryLimitExceededCode = "PasswordRetryLimitExceeded";

class NextStep {
  constructor(step) {
    this.step = step;
  }
}

export class AuthenticationFlow {
  constructor(authentication) {
    this.authentication = authentication;
    this.signInListeners = [];
    this.nextSignInListenerId = 0;
  }

  async signIn(username, password) {
    const resetPassword = async (newPassword) => {
      try {
        await this.authentication.forgotPassword(username);
      } catch (e) {
        if (e.code === PasswordRetryLimitExceededCode) {
          const error = new Error("Password retry limit hit");
          error.code = PasswordRetryLimitExceededCode;
          throw error;
        }
        throw e;
      }

      const nextStep = new NextStep(EnterConfirmationCode);
      nextStep.enterConfirmationCode = async (code) => {
        await this.authentication.forgotPasswordSubmit(username, code, newPassword.get());
        const nextStep = new NextStep(Completed);
        return nextStep;
      };
      return nextStep;
    };

    let nextStep = null;
    try {
      await this.authentication.signIn(username, password);
      await this.notifySignInListeners(username);
      nextStep = new NextStep(Completed);
    } catch (e) {
      if (e.code === UserNotFoundCode) {
        throw new Error("Username Not Found");
      }
      else if (e.code === IncorrectPasswordCode) {
        throw new Error("Incorrect Password");
      }
      else if (e.code === PasswordResetRequiredCode) {
        nextStep = new NextStep(ResetPassword);
        nextStep.resetPassword = resetPassword;
      }
      else if (e.code === UserNotConfirmedCode) {
        nextStep = new NextStep(EnterConfirmationCode);
        await this.authentication.resendSignUp(username);
        nextStep.enterConfirmationCode = async (code) => {
          await this.authentication.confirmSignUp(username, code);
          const nextStep = new NextStep(Completed);
          return nextStep;
        };
      } else {
          throw e;
      }
    }
    return nextStep;
  }

  async signUp(username, password) {
    const enterConfirmationCode = async (code) => {
      await this.authentication.confirmSignUp(username, code);
      return new NextStep(Completed);
    };

    let nextStep;
    try {
      await this.authentication.signUp(username, password);
      nextStep = new NextStep(EnterConfirmationCode);
      nextStep.enterConfirmationCode = enterConfirmationCode;
    } catch (e) {
      const error = new Error(e.message);
      error.code = SignUpFailedCode;
      throw error;
    }
    return nextStep;
  }

  async notifySignInListeners(username) {
    for (let i = 0; i < this.signInListeners.length; i++) {
      const event = new OnSignInEvent(username);

      const listener = this.signInListeners[i];
      await listener.onSignIn(event);
    }
  }

  async addOnSignInListener(listener) {
    listener.__addOnSignInListenerId = this.nextSignInListenerId;
    this.nextSignInListenerId++;

    this.signInListeners.push(listener);
  }
}

class OnSignInEvent {
  constructor(username) {
    this.username = username;
  }
}
