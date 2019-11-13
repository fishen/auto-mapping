import "reflect-metadata";
import { mapping, map } from "../src/index";
import { expect } from "chai";
import "mocha";

class Person {
    @mapping({ type: String })
    public name: string = "fisher";
    @mapping({ type: Boolean })
    public gender: boolean = true;
    @mapping({ type: Number, default: 18 })
    public age: number = 1;
    @mapping({ type: [String] })
    public array: string[] = [];
}

const dataSource: any = {
    name: undefined,
    gender: null,
    age: undefined,
    array: null
}
const result = map(dataSource, Person);

describe("default value", () => {
    it("should be set default value when missing corresponding value.", () => {
        expect(result.name).to.equal("fisher");
    });
    it("should first use default value from mapping options.", () => {
        expect(result.age).to.equal(18);
    });
    it("should be covert boolean value successfully.", () => {
        expect(result.gender).to.be.true;
    });
    it("should be covert array value successfully.", () => {
        expect(result.array).to.be.an("array");
    });
});