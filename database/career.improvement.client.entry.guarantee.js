import {CareerImprovementClientFinder} from './career.improvement.client.finder';
import { CareerImprovementClient } from '../pojo/career.improvement.client';


export class CareerImprovementClientEntryGuarantee {
    constructor(database) {
        if (!database) {
            throw new Error('Cannot create guarantee without database');
        }
        this.database = database;
    }

    async onSignIn(event) {
        if (!event) {
            throw new Error('No event was given');
        }

        const finder = new CareerImprovementClientFinder(this.database);
        const client = await finder.findByUsername(event.username);

        if (!client) {
            await this.database.create(new CareerImprovementClient(event.username, event.username));
        }
        console.log('we made sure that there was a career improvement client in here');
    }
}