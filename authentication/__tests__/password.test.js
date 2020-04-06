import {Password, PasswordPolicy} from '../password';

describe('Password', () => {
    it('should be able to create a password meeting requirements', () => {
        const raw = 'overEightCharacters';
        const testObject = new Password(raw);

        expect(testObject.get()).toBe(raw);
    });

    it('should be ablet to copy a password object', () => {
        const raw = 'overEightCharacters';
        const testObject = new Password(raw);

        const copy = testObject.copy();
        testObject.raw = 'DIFFERENT';

        expect(copy.get()).toBe(raw);
    });

    it('should throw an exception if the password does not meet requirements', () => {
        const raw = 'abc';
        const password = new Password(raw);

        const policy = new PasswordPolicy(password);
        expect(policy.checkIfFollowing()).toBe(false);

        const message = policy.whyNot();
        expect(message).toBe('Password must be greater than or equal to eight characters');
    });

    it('should throw an exception if no password is given', () => {

        const raw = null;
        const password = new Password(raw);

        const policy = new PasswordPolicy(password);
        expect(policy.checkIfFollowing()).toBe(false);

        const message = policy.whyNot();
        expect(message).toBe('Password must be greater than or equal to eight characters');
    });
});