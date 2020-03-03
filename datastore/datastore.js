
let singleton = null;
export function getInstance() {
    if (!singleton) {
        singleton = new DataStore();
    }

    return singleton;
}

export class DataStore {

    constructor() {
        this.store = {};
    }

    static instance() {

    }
    
    add(object) {

        if (!object) {
            throw new Error('Cannot add a null object to datastore');
        }

        if (!object.type) {
            throw new Error('Cannot add an object to datastore without a "type" attribute');
        }

        if (!this.store[object.type]) {
            this.store[object.type] = [];
        }

        this.store[object.type].push(object);
    }

    get(command) {

        if (!command) {
            throw new Error('Cannot get using a null command');
        }

        if (!this.store[command.type()]) {
            return null;
        }

        let found = null;
        const collection = this.store[command.type()];
        for (let i = 0; i < collection.length; i++) {
            const element = collection[i];

            if (element.id === command.id()) {
                found = element;
            }
        }

        return found;
    }
};