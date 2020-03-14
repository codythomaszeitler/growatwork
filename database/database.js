import {API} from 'aws-amplify';

class Database {
    write(inMemory) {
        
    }
}

let databaseSingleton = null;
export function database() {
    if (!databaseSingleton) {
        databaseSingleton = new Database();
    }
    return databaseSingleton;
}