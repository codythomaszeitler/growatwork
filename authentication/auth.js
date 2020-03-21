import { Auth } from "aws-amplify";

export class Authentication {

  async signIn(email, password) {
    if (!email) {
      throw new Error("Cannot sign in without an email");
    }
    if (!password) {
      throw new Error("Cannot sign in without a password");
    }

    try {
      await Auth.signIn(email, password);
    } catch (e) {
      if (e.code === 'UserNotFoundException') {
        throw new Error("Cannot find user with given email");
      }

      if (e.code === 'NotAuthorizedException') {
        throw new Error("Incorrect email or password");
      }

      if (e.code === 'UserNotConfirmedException') {
        throw new Error('You never confirmed your email. Please use the forgot password link to reset your account.');
      }

      throw new Error(e.message);
    }
  }

  async signUp(email, password) {
    return await Auth.signUp({
      username: email,
      password,
      attributes: {
        email // optional
      },
      validationData: [] //optional
    });
  }

  async confirmSignUp(email, code) {
    let message = "NO_RESPONSE";

    try {
      message = await Auth.confirmSignUp(email, code, {
        forceAliasCreation: true
      });
    } catch (e) {
      message = e.code;
    }

    return message;
  }

  async signOut() {
    return await Auth.signOut();
  }

  async changePassword(oldPassword, newPassword) {
    const user = await Auth.currentAuthenticatedUser();
    return await Auth.changePassword(user, oldPassword, newPassword);
  }

  async confirmChangePassword(username, code, newPassword) {
    await Auth.forgotPasswordSubmit(username, code, newPassword);
  }

  async getCurrentUsername() {
    const currentUser = await Auth.currentAuthenticatedUser();
    return currentUser.username;
  }

  async sendPasswordResetEmail(username) {
    return await Auth.forgotPassword(username);
  }
}