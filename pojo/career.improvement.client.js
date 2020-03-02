
export class CareerImprovementClient {
    constructor() {
        this.hardWorkEntries = [];
    }

    log(hardWorkEntry) {
        console.log('we are here');
        this.hardWorkEntries.push(hardWorkEntry.copy());
    }

    getHardWork() {
        return this.hardWorkEntries.slice();
    }
};