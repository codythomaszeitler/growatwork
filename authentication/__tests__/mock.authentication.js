export class MockAuthentication {

    async signIn(username, password) {
        this.username = username;
        this.password = password;
    }

    async signUp(username, password) {
        this.signUpUsername = username;
        this.signUpPassword = password;
    }

    async forgotPassword(username) {

    }

    async forgotPasswordSubmit(username, code, newPassword) {
        this.onSubmittedCode = code;
        this.onSubmittedNewPassword = newPassword;
    }

    async resendSignUp(username) {
        this.resendSignUpUsername = username;
    }

    async confirmChangePassword(username, code) {
        this.confirmChangePasswordUsername = username;
        this.confirmChangePasswordCode = code;
    }

    async confirmSignUp(username, code) {
        this.confirmSignUpUsername = username;
        this.confirmSignUpCode = code;
    }
};