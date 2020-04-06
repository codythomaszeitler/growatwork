import {CareerImprovementClientEntryGuarantee} from '../career.improvement.client.entry.guarantee';
import { CareerImprovementClient } from "../../pojo/career.improvement.client";
import {AuthenticationFlow} from '../../authentication/authentication.flow';
import {MockAuthentication} from '../../authentication/__tests__/mock.authentication';
import {MockDatabase, Query} from '../../database/__tests__/mock.database';
import {listCareerImprovementClients} from '../../graphql/queries';
import { CareerImprovementClientFinder } from '../career.improvement.client.finder';

describe('Career Improvement Client Entry Guarantee', () => {

    let careerImprovementClient;
    let authentication;
    let database;

    beforeEach(() => {
        careerImprovementClient = new CareerImprovementClient('username@gmail.com');
        authentication = new MockAuthentication();
        database = new MockDatabase();
    });

    it('should create a career improvement client in the db if one does not exist for the user', async () => {
        expect(database.contains(careerImprovementClient)).toBe(false);

        const authenticationFlow = new AuthenticationFlow(authentication);
        const guarantee = new CareerImprovementClientEntryGuarantee(database);
        authenticationFlow.addOnSignInListener(guarantee);
        await authenticationFlow.signIn(careerImprovementClient.getUsername(), 'password');

        expect(database.contains(careerImprovementClient)).toBe(true);
    });

    it('should not create a career improvement client in the db if one does exist', async () => {
       await database.create(careerImprovementClient); 

       const authenticationFlow = new AuthenticationFlow(authentication);
       const guarantee = new CareerImprovementClientEntryGuarantee(database);
       authenticationFlow.addOnSignInListener(guarantee);
       await authenticationFlow.signIn(careerImprovementClient.getUsername(), 'password');

       const query = new Query(listCareerImprovementClients);
       expect(database.count(query)).toBe(1);
    });

    it('should throw an exception if no database is given on creation', () => {
        let caughtException = null;
        try {
            new CareerImprovementClientEntryGuarantee(null);
        } catch (e) {
            caughtException = e;
        }

        expect(caughtException.message).toBe('Cannot create guarantee without database');
    });

    it('should throw an exception if no event is given', async () => {
        const testObject = new CareerImprovementClientEntryGuarantee(database);

        let caughtException = null;
        try {
            await testObject.onSignIn(null);
        } catch (e) {
            caughtException = e;
        }
        expect(caughtException.message).toBe('No event was given');
    });
});