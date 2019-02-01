import 'reflect-metadata';
import { mapping, map } from '../index';
import dataSource from './data-source';


class Person {
    @mapping({ path: 'address1[0].city' })
    cityName: string;
    @mapping<Person>((_value, src, dest) => {
        return `I'm ${src.name} and i come from ${dest.cityName}`;
    })
    intro: string;
    @mapping(() => { throw new Error('cast error') })
    error: string;
}

const result = map(dataSource, Person);
if (result) {
    console.assert(typeof result.intro === 'string', '自定义转换失败');
    console.assert(typeof result.error === 'undefined', '自定义转换抛出错误转换失败');
}