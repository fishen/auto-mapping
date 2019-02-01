import { mapping, map } from '../index';
import dataSource from './data-source';

class Person {
    @mapping({ type: String })
    name: string;
    @mapping({ type: Boolean })
    gender: boolean;
    @mapping({ type: Number })
    age: number = 1;
    @mapping({ path: 'src.number', type: Number })
    num: number
}
const result = map(dataSource, Person);

if (result) {
    console.assert(result.name === dataSource.name, '普通属性获取失败');
    console.assert(isNaN(result.age), '普通类型转换失败');
    console.assert(!!result.num, '拉取对象失败');
    console.assert(result.num === +dataSource.src.number, '普通类型转换失败');
    console.assert(result.gender === false, '获取不存在的属性不为空');
}
