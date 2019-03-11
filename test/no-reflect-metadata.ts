import { mapping, map } from '../index';
import dataSource from './data-source';
import { expect } from 'chai';
import 'mocha';

class Base {
    @mapping(String)
    public name: string;
}

class Person extends Base {
    @mapping(String)
    gender: string;
    @mapping(Number)
    age: number = 1;
    @mapping({ type: Number, path: 'src.number' })
    num: number;
    @mapping(Date)
    date: Date = new Date();
}
const result = map(dataSource, Person);

describe('no reflect-metadata', () => {
    it('should be equal to origin property.', () => {
        expect(result.name).to.equal(dataSource.name);
    });
    it('should be pull data successfully and it should be a number.', () => {
        expect(result.num).to.be.an('number');
    });
    it('should be undefined when no mapping value exists.', () => {
        expect(result.gender).to.be.undefined;
    });
    it('should be a date type', () => {
        expect(result.date).to.instanceOf(Date);
    });
});

console.log(result);