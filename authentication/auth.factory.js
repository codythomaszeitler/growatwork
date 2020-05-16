import {Authentication, GuestAuthentication} from './auth';

export class AuthenticationFactory {

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
