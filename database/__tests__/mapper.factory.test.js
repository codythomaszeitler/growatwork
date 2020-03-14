import {HardWorkEntry} from '../../pojo/hard.work.entry';
import {Timestamp} from '../../pojo/timestamp';
import {MapperFactory} from '../mapper.factory';

describe('Mapper Factor Test', () => {
    it('should create a factory that can create an achievement if given the achievement type', () => {
        const achievement = new HardWorkEntry('test achievement', Timestamp.today());

        const testObject = new MapperFactory();
        const factory = testObject.create("achievement");

        expect(factory.toDatabaseModel(achievement)).toBeTruthy();
    });
});