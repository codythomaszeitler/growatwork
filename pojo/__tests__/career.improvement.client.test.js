import {CareerImprovementClient} from '../career.improvement.client';

describe('Career Improvement Client', () => {
    it('should be able to track all hard work entries', () => {
        const testObject = new CareerImprovementClient();

        const entries = testObject.getHardWork();
        expect(entries.length).toBe(1);
    });
});