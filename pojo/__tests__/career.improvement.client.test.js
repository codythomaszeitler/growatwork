import {CareerImprovementClient} from '../career.improvement.client';
import {HardWorkEntry} from '../hard.work.entry';

describe('Career Improvement Client', () => {
    it('should be able to track all hard work entries', () => {
        const timestamp = new Date();
        const testObject = new CareerImprovementClient();

        testObject.log(new HardWorkEntry('First!', timestamp));
        testObject.log(new HardWorkEntry('Second!', timestamp));
        testObject.log(new HardWorkEntry('Third!', timestamp));

        const entries = testObject.getHardWork();
        expect(entries.length).toBe(3);

        expect(entries).toContainEqual(
            new HardWorkEntry('First!', timestamp)
        );
        expect(entries).toContainEqual(
            new HardWorkEntry('Second!', timestamp)
        );
        expect(entries).toContainEqual(
            new HardWorkEntry('Third!', timestamp)
        );
    });
});