import "reflect-metadata";
import { mapping, map } from "../src/index";
import dataSource from "./data-source";
import { expect } from "chai";
import "mocha";

class Person {
    @mapping({ domain: "src", path: "src.number" })
    public number: number;
    @mapping({ domain: "address" })
    public city: string;
}
const result = map(dataSource, Person);

describe("domain", () => {
    it("should be successfull to get domain property.", () => {
        expect(result.city).to.equal(dataSource.address.city);
    });
    it("should first to use path instead of domain property.", () => {
        expect(result.city).to.equal(dataSource.address.city);
    });
})

