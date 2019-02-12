import { mapping, map } from '../index';
import dataSource from './data-source';

class Person {
    @mapping({ type: String, source: 'other', path: 'person.lastname' })
    @mapping({ type: String, default: 'fisher' })
    name: string;
    @mapping({ type: Number, path: 'src.number' })
    age: number;
}
const dataSource1 = {
    person: { lastname: 'jack' },
    src: { number: 18 },
};
const result = map(dataSource, Person);
const result1 = map(dataSource1, Person, { source: 'other' });
const result2 = map(dataSource1, Person, { source: 'other', useDefaultSource: false });

if (result && result1) {
    console.assert(result.name === dataSource.name && result1.name === dataSource1.person.lastname, '多个数据源属性获取失败');
    console.assert(result1.age === dataSource1.src.number, '使用默认数据源配置失败');
    console.assert(result2.age === undefined, '不使用默认数据源配置失败');
}