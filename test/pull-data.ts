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

class Person {
    @mapping({ path: 'address1[0].city' })
    cityName: string;
    @mapping({ path: 'src.number' })
    num: number;
    @mapping({ path: 'address1[0]' })
    address: Address;
}

const result = map(dataSource, Person);

describe('pull data', () => {
    it('should be successfull by pulling array data.', () => {
        expect(result.cityName).to.equal(dataSource.address.city);
    });
    it('should be successfull by pulling object data.', () => {
        expect(result.num).is.an('number');
    });
    it('should be convert successfully.', () => {
        expect(result.address).to.instanceOf(Address);
    });
});
