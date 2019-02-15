import 'reflect-metadata';
import { mapping, map } from '../index';
import dataSource from './data-source';

class Person {
    @mapping({ domain: 'src', path: 'src.number' })
    number: number;
    @mapping({ domain: 'address' })
    city: string;
}
const result = map(dataSource, Person);
if (result) {
    console.assert(result.number === +dataSource.src.number, '域属性获取失败');
    console.assert(result.city === dataSource.address.city, '域属性获取失败');
}
