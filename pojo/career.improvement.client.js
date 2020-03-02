
export class CareerImprovementClient {
    constructor() {
        this.hardWorkEntries = [];
    }

    log(hardWorkEntry) {
        this.hardWorkEntries.push(hardWorkEntry.copy());
    }

    getHardWork() {
        return this.hardWorkEntries.slice();
    }
};