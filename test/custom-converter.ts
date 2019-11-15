import "reflect-metadata";
import { mapping, map, PropertyType, Converter, } from "../src/index";
import dataSource from "./data-source";
import { expect } from "chai";
import "mocha";


class Person {
    @mapping({ path: "address1[0].city" })
    public cityName: string;
    @mapping<Person>((_value, src, dest) => {
        return `I"m ${src.name} and i come from ${dest.cityName}`;
    })
    public intro: string;
    @mapping()
    public num: number;
}

const converters = new Map<PropertyType, Converter>([[String, () => ''], [Number, () => 0]])
const result = map(dataSource, Person, { converters });

describe("custom converters", () => {
    it("should be a string.", () => {
        expect(result.intro).to.be.an("string");
        expect(result.intro).to.be.not.eq("");
        expect(result.cityName).to.be.eq("");
    });
    it("should be a number.", () => {
        expect(result.num).to.be.an("number");
        expect(result.num).to.be.eq(0);
    });
});