import "reflect-metadata";
import { mapping, map } from "../src/index";
import dataSource from "./data-source";
import { expect } from "chai";
import "mocha";

@mapping()
class Base {
    @mapping()
    public name: string;
}

@mapping()
class Person extends Base {
    @mapping({ path: "address.city" })
    public name: string;
    @mapping({ path: "src.number" })
    public age: number;
}
const result = map(dataSource, Person);
const result1 = map(dataSource, Base);

describe("inherit", () => {
    it("should be equal to ovrride config value.", () => {
        expect(result.name).to.equal(dataSource.address.city);
    });
    it("should be equal to own config value.", () => {
        expect(result1.name).to.equal(dataSource.name);
    });
    it("should be undefined to access not exists property.", () => {
        expect((result1 as any).age).to.be.undefined;
    });
});