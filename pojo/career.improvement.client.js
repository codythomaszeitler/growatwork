
class OnLogEvent {
    constructor(entry) {
        this.logged = entry.copy();
    }
}

export class CareerImprovementClient {
    constructor() {
        this.hardWorkEntries = [];
        this.listeners = [];
    }

    log(hardWorkEntry) {
        if (!hardWorkEntry) {
            throw new Error('Cannot log without a hard work entry to a career improvement client');
        }
        this.checkForDuplicate(hardWorkEntry);

        this.hardWorkEntries.push(hardWorkEntry.copy());
        this.emitOnLogEvent(hardWorkEntry.copy());
    }

    emitOnLogEvent(hardWorkEntry) {
        for (let i = 0; i < this.listeners.length; i++) {
            const listener = this.listeners[i];
            listener.onLog(new OnLogEvent(hardWorkEntry));
        }
    }

    addOnLogListener(listener) {
        if (!listener) {
            throw new Error('Cannot add a listener that does not exist')
        }

        this.listeners.push(listener);
    }

    checkForDuplicate(toCheck) {
        for (let i = 0; i < this.hardWorkEntries.length; i++) {
            const hardWorkEntry = this.hardWorkEntries[i];

            if (hardWorkEntry.equals(toCheck)) {
                throw new Error('Cannot add the same hard work entry twice');
            }
        }
    }

    getHardWork() {
        return this.hardWorkEntries.slice();
    }
};