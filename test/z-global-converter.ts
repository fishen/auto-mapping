import "reflect-metadata";
import { mapping, map } from "../src/index";
import { expect } from "chai";
import "mocha";

map.setDefaultConverter(String, (val) => (val === undefined || val === null) ? '' : String(val));
map.setDefaultConverter(Number, (val) => isNaN(Number(val)) ? 0 : Number(val));

class Person {
    @mapping()
    public name: string;
    @mapping(() => "default")
    public desc: string;
    @mapping()
    public num: number;
}

const result = map({}, Person);

describe("global converters", () => {
    it("should be a string.", () => {
        expect(result.desc).to.be.an("string");
        expect(result.desc).to.be.eq("default");
        expect(result.name).to.be.eq("");
    });
    it("should be a number.", () => {
        expect(result.num).to.be.an("number");
        expect(result.num).to.be.eq(0);
    });
});