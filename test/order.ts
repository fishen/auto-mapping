import "reflect-metadata";
import { mapping, map } from "../src/index";
import dataSource from "./data-source";
import { expect } from "chai";
import "mocha";

class Person {
    @mapping({ type: (_src, dest) => dest.name, order: 1 })
    public fullName: string;
    @mapping({ type: String })
    public name: string = "jack";
}
const result = map(dataSource, Person);

describe("order", () => {
    it("should be sort as expected.", () => {
        expect(result.fullName).to.equal(dataSource.name);
    });
});