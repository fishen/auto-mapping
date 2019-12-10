import "reflect-metadata";
import { mapping, map } from 'auto-mapping';

class Person {
    @mapping()
    name: string;
    @mapping()
    gender: boolean;
    @mapping({ path: 'others.number' })
    age: number
}
const data = {
    name: 'fisher',
    gender: 1,
    others: { number: '18' },
};
const result = map(data, Person);