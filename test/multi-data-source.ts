import { mapping, map } from '../index';
import dataSource from './data-source';

class Person {
    @mapping({ type: String, source: 'other', path: 'person.lastname' })
    @mapping({ type: String, default: 'fisher' })
    name: string;
}
const dataSource1 = {
    person: { lastname: 'jack' }
};
const result = map(dataSource, Person);
const result1 = map(dataSource1, Person, { source: 'other' });

if (result && result1) {
    console.assert(result.name === dataSource.name && result1.name === dataSource1.person.lastname, '多个数据源属性获取失败');
}