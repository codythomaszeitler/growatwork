import {Goal} from '../goal';
import {HardWorkEntry} from '../hard.work.entry';
import {Timestamp} from '../timestamp';

describe('Goal', () => {
    it('should be able to set a goal to the given text', () => {
        const contents = 'Test';
        const testObject = new Goal(contents);

        expect(contents).toBe(testObject.get());
    });

    it('should throw an exception if a falsy contents is given', () => {
        let caughtException = null;
        try {
            new Goal(null);
        } catch (e) {
            caughtException = e;
        }

        expect(caughtException.message).toBe('Cannot create a goal without contents');
    });

    it ('should be able to copy a goal', () => {
        const contents = 'Test';
        const testObject = new Goal(contents);
        const accomplishment = new HardWorkEntry('Test Test Test', new Timestamp(2010, 'January', 1));
        testObject.associate(accomplishment);

        const copy = testObject.copy();
        testObject.contents = 'bad';
        testObject.accomplishments = [];

        expect(copy.get()).toBe(contents);
        expect(containsAccomplishment(copy.getAssociatedAccomplishments(), accomplishment)).toBe(true);
    });

    it('should throw an exception when trying to associate a falsy accomplishment', () => {

        const contents = 'Test';
        const testObject = new Goal(contents);

        let caughtException = null;
        try {
            testObject.associate(null);
        } catch (e) {
            caughtException = e;
        }

        expect(caughtException.message).toBe('Cannot associate a falsy accomplishment');
    });

    it('should be able to associate a accomplishment with the goal', () => {
        const contents = 'Test';
        const testObject = new Goal(contents);
        
        const accomplishment = new HardWorkEntry('Test Test Test', new Timestamp(2010, 'January', 1));
        testObject.associate(accomplishment);

        const contains = containsAccomplishment(testObject.getAssociatedAccomplishments(), accomplishment);
        expect(contains).toBe(true);
    });

    function containsAccomplishment(accomplishments, expected) {
        let contains = false;

        for (let i = 0; i < accomplishments.length; i++) {
            if (accomplishments[i].equals(expected)) {
                contains = true;
                break;
            }
        }

        return contains;
    }
});