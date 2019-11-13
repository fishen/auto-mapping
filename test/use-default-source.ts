import "reflect-metadata";
import { mapping, map } from "../src/index";
import dataSource from "./data-source";
import { expect } from "chai";
import "mocha";

class Person {
    @mapping({ type: String, source: "other", path: "person.lastname" })
    @mapping({ type: String, default: "fisher" })
    public name: string;
    @mapping({ type: Number, path: "src.number" })
    public age: number;
}
const dataSource1 = {
    person: { lastname: "jack" },
    src: { number: 18 },
};
const result = map(dataSource, Person);
const result1 = map(dataSource1, Person, { source: "other" });
const result2 = map(dataSource1, Person, { source: "other", useDefaultSource: false });

describe("default source", () => {
    it("should be equal to correct property.", () => {
        expect(result.name).to.equal(dataSource.name);
        expect(result1.name).to.equal(dataSource1.person.lastname);
    });
    it("should be use the default source configuration.", () => {
        expect(result1.age).to.be.equal(dataSource1.src.number);
    });
    it("should be undefined when set useDefaultSource to false.", () => {
        expect(result2.age).to.be.undefined;
    });
});
