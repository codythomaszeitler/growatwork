export class CareerImprovementClientDataStore {

    constructor() {
        this.client = null;
    }

    set(client) {
        if (client === null) {
            throw new Error('Cannot set career improvement client to null');
        }
        this.client = client;
    }

    get() {
        return this.client;
    }
};

let dataStore = null;
export function datastore() {
    if (!dataStore) {
        dataStore = new CareerImprovementClientDataStore();
    }
    return dataStore;
}

export function reset() {
    dataStore = null;
}