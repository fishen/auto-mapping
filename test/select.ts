import "reflect-metadata";
import { mapping, select } from "../src/index";
import dataSource from "./data-source";
import { expect } from "chai";
import "mocha";

class Address {
    @mapping()
    public id: number;
    @mapping()
    public city: "";
    @mapping({ path: "zip_code" })
    public zipCode: "";
    public extra = 2;
}

class Base {
    @mapping()
    public name: string;
    public baseExtra = 0;
}

class Person extends Base {
    public extra = 1;
    @mapping()
    public address: Address;
}

const result = select(dataSource, Person)!;
describe("select test", () => {
    it("should be an object", () => {
        expect(result).to.be.an('object');
        expect(result.address).to.be.an('object');
    })
    it("should be equal to dest property.", () => {
        expect(result.name).to.equal(dataSource.name);
    });
    it("should be missed extra property.", () => {
        expect(result.extra).to.be.undefined;
        expect(result.baseExtra).to.be.undefined;
        expect(result.address.extra).to.be.undefined;
    })
});