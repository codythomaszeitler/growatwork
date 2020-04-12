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

  async confirmChangePassword(username, code, password) {
    return await this.confirmChangePassword(username, code, password);
  }

  async resendSignUp(username) {
    return await Auth.resendSignUp(username);
  }
}
