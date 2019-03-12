import "reflect-metadata";
import { mapping, map } from "../src/index";
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
}

class Person {
    @mapping({ path: "address1", type: [Address] })
    public address1: Address[];
    @mapping({ type: [Date] })
    public dates: any;
}

const result = map(dataSource, Person);

describe("array", () => {
    it("should be a array.", () => {
        expect(result.dates).to.be.an("array");
    });
    it("should be a Address type of array item.", () => {
        expect(result.address1).to.be.an("array");
        expect(result.address1[0]).instanceOf(Address);
    })
});
