import "reflect-metadata";
import { mapping, map } from "../src/index";
import dataSource from "./data-source";
import { expect } from "chai";
import "mocha";

class Base {
    @mapping()
    public name: string;
}

class Person extends Base {
    @mapping()
    public gender: string;
    @mapping()
    public age: number = 1;
    @mapping({ path: "src.number" })
    public num: number;
    @mapping()
    public date: Date = new Date();
}
const result = map(dataSource, Person);

describe("auto get type", () => {
    it("should be equal to origin property.", () => {
        expect(result.name).to.equal(dataSource.name);
    });
    it("should be pull data successfully and it should be a number.", () => {
        expect(result.num).to.be.an("number");
    });
    it("should be undefined when no mapping value exists.", () => {
        expect(result.gender).to.be.undefined;
    });
    it("should be a date type", () => {
        expect(result.date).to.instanceOf(Date);
    });
});