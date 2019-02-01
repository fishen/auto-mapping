import { mapping, map } from '../index';
import dataSource from './data-source';

class Person {
    @mapping({ convert: (_src, dest) => dest.name, order: 1 })
    fullName: string;
    @mapping({ type: String })
    name: string = 'jack';
}
const result = map(dataSource, Person);

if (result) {
    console.assert(result.fullName === dataSource.name, '排序属性获取失败');
}