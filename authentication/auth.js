import { Auth } from "aws-amplify";

export const UserNotFoundCode = "UserNotFoundException";
export const IncorrectPasswordCode = "NotAuthorizedException";
export const PasswordResetRequiredCode = "PasswordResetRequiredException";
export const UserNotConfirmedCode = "UserNotConfirmedException";
export const SignUpFailedCode = "SignUpFailedException";
export const IncorrectConfirmationCodeCode = "IncorrectConfirmationException";

export class Authentication {
  async signIn(email, password) {
    if (!email) {
      throw new Error("Cannot sign in without an email");
    }
    if (!password) {
      throw new Error("Cannot sign in without a password");
    }

    await Auth.signIn(email, password);
  }

  async signUp(email, password) {
    return await Auth.signUp({
      username: email,
      password,
      attributes: {
        email, // optional
      },
      validationData: [], //optional
    });
  }

  async confirmSignUp(email, code) {
    return await Auth.confirmSignUp(email, code, {
      forceAliasCreation: true,
    });
  }

  async signOut() {
    return await Auth.signOut();
  }

  async changePassword(oldPassword, newPassword) {
    const user = await Auth.currentAuthenticatedUser();
    return await Auth.changePassword(user, oldPassword, newPassword);
  }

  async forgotPasswordSubmit(username, code, newPassword) {
    return await Auth.forgotPasswordSubmit(username, code, newPassword);
  }

  async getCurrentUsername() {
    const currentUser = await Auth.currentAuthenticatedUser();
    return currentUser.username;
  }

  async sendPasswordResetEmail(username) {
    return await Auth.forgotPassword(username);
  }

  async forgotPassword(username) {
    return await this.sendPasswordResetEmail(username);
  }

  async forgotPasswordSubmit(username, code, newPassword) {
    return await Auth.forgotPasswordSubmit(username, code, newPassword);
  }

  async resendSignUp(username) {
    return await Auth.resendSignUp(username);
  }
}

export const guestUsername = 'Guest';

export class GuestAuthentication {
  async signIn(email, password) {}

  async signUp(email, password) {}

  async confirmSignUp(email, code) {}

  async signOut() {}

  async changePassword(oldPassword, newPassword) {}

  async forgotPasswordSubmit(username, code, newPassword) {}

  async getCurrentUsername() {
    return guestUsername;
  }

  async sendPasswordResetEmail(username) {}

  async forgotPassword(username) {}

  async forgotPasswordSubmit(username, code, newPassword) {}

  async resendSignUp(username) {}

}

class AuthenticationFactory {

  create(type) {

      let authentication;
      if (type === 'Guest') {
          authentication = new GuestAuthentication();
      } else if (type === 'AWS') {
          authentication = new Authentication();
      } else {
          throw new Error('Unsupported type [' + type + ']');
      }
      return authentication;
  }
}

let singleton = null;
export function configureAWSAuthentication() {
  const factory = new AuthenticationFactory();
  singleton = factory.create("AWS");
}

export function configureGuestAuthenticaion() {
  const factory = new AuthenticationFactory();
  singleton = factory.create("Guest");
}

export function authentication() {
  if (singleton === null) {
    throw new Error('Authentication has not been configured');
  }

  return singleton;
}
