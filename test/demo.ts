import "reflect-metadata";
import { mapping, map, select } from "../src/index";

// import { mapping, map, select } from 'auto-mapping';

class Person {
    @mapping({ type: String })
    name: string;
    @mapping(Boolean) // short form
    gender: boolean;
    @mapping({ path: 'others.number', type: Number })
    age: number
    extraData = 1;
}
const data = {
    name: 'fisher',
    gender: 1,
    others: { number: '18' },
};
console.info("Mapped result:", map(data, Person));
console.info("Selected result:", select(data, Person));
