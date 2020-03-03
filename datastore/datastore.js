import {type as clienttype} from '../pojo/career.improvement.client';

export class DataStore {

    constructor() {
        this.store = {};
    }

    setCareerImprovementClient(client) {

        if (client === null) {
            throw new Error('Cannot set career improvement client to null');
        }

        this.store[clienttype] = client;
    }

    getCareerImprovementClient() {
        return this.store[clienttype];
    }
};

let dataStore = null;
export function datastore() {
    if (!dataStore) {
        dataStore = new DataStore();
    }
    return dataStore;
}

export function reset() {
    dataStore = null;
}