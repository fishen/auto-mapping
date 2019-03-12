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
    @mapping({ path: "address1[0].city" })
    public cityName: string;
    @mapping({ path: "src.number" })
    public num: number;
    @mapping({ path: "address1[0]" })
    public address: Address;
}

const result = map(dataSource, Person);

describe("pull data", () => {
    it("should be successfull by pulling array data.", () => {
        expect(result.cityName).to.equal(dataSource.address.city);
    });
    it("should be successfull by pulling object data.", () => {
        expect(result.num).is.an("number");
    });
    it("should be convert successfully.", () => {
        expect(result.address).to.instanceOf(Address);
    });
});
