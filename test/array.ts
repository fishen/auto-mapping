import 'reflect-metadata';
import { mapping, map } from '../index';
import dataSource from './data-source';

class Address {
    @mapping()
    id: number;
    @mapping()
    city: '';
    @mapping({ path: 'zip_code' })
    zipCode: '';
}

class Person {
    @mapping({ path: 'address1', type: [Address] })
    address1: Address[];
    @mapping({ type: [Date] })
    dates: any;
}

const result = map(dataSource, Person);
if (result) {
    console.assert(Array.isArray(result.dates), '数组转换失败');
    console.assert(result.address1[0] instanceof Address, '数组对像转换失败');
}
