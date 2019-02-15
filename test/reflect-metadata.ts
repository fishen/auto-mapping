import 'reflect-metadata';
import { mapping, map } from '../index';
import dataSource from './data-source';

class Base {
    @mapping()
    public name: string;
}

class Person extends Base {
    @mapping()
    gender: string;
    @mapping()
    age: number = 1;
    @mapping({ path: 'src.number' })
    num: number;
    @mapping()
    date: Date = new Date();
}
const result = map(dataSource, Person);
if (result) {
    console.assert(result.name === dataSource.name, '普通属性获取失败');
    console.assert(!!result.num, '拉取对象失败');
    console.assert(result.num === +dataSource.src.number, '普通类型转换失败');
    console.assert(result.gender === undefined, '获取不存在的属性不为空');
    console.assert(result.date instanceof Date, '日期对像转换失败');
}
