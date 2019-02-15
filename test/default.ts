import { mapping, map } from '../index';

class Person {
    @mapping({ type: String })
    name: string = 'fisher';
    @mapping({ type: Boolean })
    gender: boolean;
    @mapping({ type: Number, default: 18 })
    age: number = 1;
    @mapping({ type: [String] })
    array: string[] = [];
}

const dataSource: any = {
    name: undefined,
    gender: null,
    age: undefined,
    array: null
}
const result = map(dataSource, Person);

if (result) {
    console.assert(result.name === 'fisher', '默认值获取失败');
    console.assert(result.age === 18, '参数默认值获取失败');
    console.assert(result.gender === false, '布尔类型转换失败');
    console.assert(Array.isArray(result.array) && result.array.length === 0, '数组默认值转换失败');
}
