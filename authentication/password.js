
export class Password {
    constructor(raw) {
        this.raw = raw;
    }

    get() {
        return this.raw;
    }

    copy() {
        return new Password(this.raw);
    }
}

export class PasswordPolicy {

    constructor(password) {
        this.password = password;
    }

    checkIfFollowing() {
        let isFollowing = false;
        if (this.password.get()) { 
            isFollowing = this.password.get().length >= 8;
        }

        return isFollowing;
    }

    whyNot() {
        let message = '';
        if (!this.checkIfFollowing()) {
            message = 'Password must be greater than or equal to eight characters';
        }
        return message;
    }
}