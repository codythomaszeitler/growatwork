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
}