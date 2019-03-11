import { mapping, map } from '../index';
import dataSource from './data-source';
import { expect } from 'chai';
import 'mocha';

class Person {
    @mapping({ type: (_src, dest) => dest.name, order: 1 })
    fullName: string;
    @mapping({ type: String })
    name: string = 'jack';
}
const result = map(dataSource, Person);

describe('order', () => {
    it('should be sort as expected.', () => {
        expect(result.fullName).to.equal(dataSource.name);
    });
});