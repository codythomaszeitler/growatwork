import {AuthenticationFlow} from '../authentication.flow';
import {UserNotFoundCode, IncorrectPasswordCode, PasswordResetRequiredCode, UserNotConfirmedCode, IncorrectConfirmationCodeCode, SignUpFailedCode} from '../auth';
import {Completed, ResetPassword, EnterConfirmationCode, PasswordRetryLimitExceededCode} from '../authentication.flow';
import {MockAuthentication} from './mock.authentication';


describe('Authentication Flow', () => {

    let authentication;
    let testObject;

    beforeEach(() => {
        authentication = new MockAuthentication();
        testObject = new AuthenticationFlow(authentication);
    });

    it('should pass the proper credentials to login when commanded', async () => {
        const nextStep = await testObject.signIn('cody', 'password');

        expect(nextStep.step).toBe(Completed);
        expect(authentication.username).toBe('cody');
        expect(authentication.password).toBe('password');
    });

    it('should send back PasswordResetLimitExceeded on when trying to change too many times', async () => {
        authentication.signIn = function() {
            const error = new Error('');
            error.code = PasswordResetRequiredCode;
            throw error;
        }

        const nextStep = await testObject.signIn('cody', 'password');

        authentication.forgotPassword = function() {
            const error = new Error('Password retry limit hit');
            error.code = PasswordRetryLimitExceededCode;
            throw error;
        }

        let caughtException = null;
        try {
            await nextStep.resetPassword('password');
        } catch (e) {
            caughtException = e;
        }
        expect(caughtException.message).toBe('Password retry limit hit');
        expect(caughtException.code).toBe(PasswordRetryLimitExceededCode);
    });

    it('should be able to send a user confirmation code if user is not registered on sign in', async () => {
        authentication.signIn = function() {
            const error = new Error('');
            error.code = UserNotConfirmedCode;
            throw error;
        };

        let nextStep = await testObject.signIn('cody', 'password');
        expect(nextStep.step).toBe(EnterConfirmationCode);

        let code = '12345';
        nextStep = await nextStep.enterConfirmationCode(code);
        expect(nextStep.step).toBe(Completed);
    });
    
    it('should be able to run the password reset step if needed after sign in', async () => {
        authentication.signIn = function() {
            const error = new Error('');
            error.code = PasswordResetRequiredCode;
            throw error;
        };

        let nextStep = await testObject.signIn('cody', 'password');
        expect(nextStep.step).toBe(ResetPassword);

        let newPassword = 'newpassword';
        nextStep = await nextStep.resetPassword(newPassword);
        expect(nextStep.step).toBe(EnterConfirmationCode);

        let code = '12345';
        nextStep = await nextStep.enterConfirmationCode(code);
        expect(nextStep.step).toBe(Completed);
    });

    it('should throw an exception of Username Not Found if username is not within database', async () => {
        authentication.signIn = function() {
            const error = new Error('');
            error.code = UserNotFoundCode;
            throw error;
        }

        let caughtException = null;
        try {
            await testObject.signIn('username', 'password');
        } catch (e) {
            caughtException = e;
        }

        expect(caughtException.message).toBe('Username Not Found');
    });

    it('should throw exception if the user provides the wrong password', async () => {
        authentication.signIn = function() {
            const error = new Error('');
            error.code = IncorrectPasswordCode;
            throw error;
        }

        let caughtException = null;
        try {
            await testObject.signIn('username', 'password');
        } catch (e) {
            caughtException = e;
        }

        expect(caughtException.message).toBe('Incorrect Password');
    });

    it('should return the next step of ResetPassword when PasswordResetRequiredCode is thrown', async () => {
        authentication.signIn = function() {
            const error = new Error('');
            error.code = PasswordResetRequiredCode;
            throw error;
        };

        const nextStep = await testObject.signIn('username', 'password');
        expect(nextStep.step).toBe(ResetPassword)
    });

    it('should be able to signUp a user', async () => {
        const nextStep = await testObject.signUp('username', 'password');
        expect(nextStep.step).toBe(EnterConfirmationCode);
    });

    it('should throw an exception if the sign up failed', async () => {

        authentication.signUp = function() {
            throw new Error('NOTCONNECTED');
        }

        let caughtException = null;
        try {
            await testObject.signUp('username', 'password');
        } catch (e) {
            caughtException = e;
        }

        expect(caughtException.message).toBe('NOTCONNECTED');
        expect(caughtException.code).toBe(SignUpFailedCode);
    });


    it('should return Completed when confirming sign up and is successful', async () => {
        const firstStep = await testObject.signUp('username', 'password');
        expect(firstStep.step).toBe(EnterConfirmationCode);

        let code = '12345';
        const nextStep = await firstStep.enterConfirmationCode(code);
        expect(nextStep.step).toBe(Completed);
    });
});