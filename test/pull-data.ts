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
    @mapping({ path: 'address1[0].city' })
    cityName: string;
    @mapping({ path: 'src.number' })
    num: number;
    @mapping({ path: 'address1[0]' })
    address: Address;
}

const result = map(dataSource, Person);
if (result) {
    console.assert(result.cityName === dataSource.address.city, '属性拉取失败');
    console.assert(typeof result.num === 'number', '拉取基础属性转换失败');
    console.assert(result.address instanceof Address, '拉取自定义类型属性转换失败')
}
