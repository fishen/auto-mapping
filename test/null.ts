import "reflect-metadata";
import { mapping, map } from "../src/index";
import { expect } from "chai";
import "mocha";

class Person {
    @mapping({ type: String })
    name: string;
    @mapping(Boolean) // short form
    gender: boolean;
    @mapping({ path: 'others.number', type: Number })
    age: number
    extraData = 1;
}
describe("undefined value mapping", () => {
    it("should be null.", () => {
        const result = map(undefined, Person)!;
        expect(result).to.be.null;
    });
    it("should be null.", () => {
        const result = [undefined, undefined].map(value => map(value, Person)!);
        expect(result.length).to.eq(2);
        expect(result[0]).to.be.null;
    });
});
