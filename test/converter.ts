import "reflect-metadata";
import { mapping, map } from "../src/index";
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
    @mapping(() => { throw new Error("cast error") })
    public error: string;
}

const result = map(dataSource, Person);

describe("custom converter", () => {
    it("should be a string.", () => {
        expect(result.intro).to.be.an("string");
    });
    it("should be undefined.", () => {
        expect(result.error).to.be.undefined;
    });
});