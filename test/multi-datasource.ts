import { mapping, map } from '../index';
import dataSource from './data-source';
import { expect } from 'chai';
import 'mocha';

class Person {
    @mapping({ type: String, source: 'other', path: 'person.lastname' })
    @mapping({ type: String, default: 'fisher' })
    name: string;
}
const dataSource1 = {
    person: { lastname: 'jack' }
};
const result = map(dataSource, Person);
const result1 = map(dataSource1, Person, { source: 'other' });

describe('multi-datasource', () => {
    it('should be equal when using default source.', () => {
        expect(result.name).to.equal(dataSource.name);
    });
    it('should be equal when using special source.', () => {
        expect(result1.name).to.equal(dataSource1.person.lastname);
    });
});