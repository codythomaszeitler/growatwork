import {CareerImprovementClient} from '../career.improvement.client';
import {HardWorkEntry} from '../hard.work.entry';

describe('Career Improvement Client', () => {
    it('should be able to track all hard work entries', () => {
        const testObject = new CareerImprovementClient();

        testObject.log(new HardWorkEntry('This is an accomplishment!', new Date()));

        const entries = testObject.getHardWork();
        expect(entries.length).toBe(1);
    });
});