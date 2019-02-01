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

class Base {
    @mapping()
    public name: string;
}

class Person extends Base {
    @mapping()
    address: Address;
}

const result = map(dataSource, Person);
if (result) {
    console.assert(result.name === dataSource.name, '普通属性获取失败');
    console.assert(result.address && result.address instanceof Address, '自定义对象转换失败');
}
