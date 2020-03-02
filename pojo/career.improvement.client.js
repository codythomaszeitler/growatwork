
export class CareerImprovementClient {
    constructor() {
        this.hardWorkEntries = [];
    }

    log(hardWorkEntry) {
        if (!hardWorkEntry) {
            throw new Error('Cannot log without a hard work entry to a career improvement client');
        }
        this.checkForDuplicate(hardWorkEntry);

        this.hardWorkEntries.push(hardWorkEntry.copy());
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