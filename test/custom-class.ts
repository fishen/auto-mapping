import 'reflect-metadata';
import { mapping, map } from '../index';
import dataSource from './data-source';
import { expect } from 'chai';
import 'mocha';

class Address {
    @mapping()
    id: number;
    @mapping()
    city: '';
    @mapping({ path: 'zip_code' })
    zipCode: '';
}

class Base {
    @mapping()
    public name: string;
}

class Person extends Base {
    @mapping()
    address: Address;
}

const result = map(dataSource, Person);
describe('custom class', () => {
    it('should be equal to dest property.', () => {
        expect(result.name).to.equal(dataSource.name);
    });
    it('should be a Address type.', () => {
        expect(result.address).to.be.instanceOf(Address);
    })
});