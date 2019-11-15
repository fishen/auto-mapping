import "reflect-metadata";
import { mapping, map } from "../src/index";
import { expect } from "chai";
import "mocha";

class Demo {
    @mapping()
    public date: Date;
    @mapping()
    public name: string = "fisher";
    @mapping({ default: 18 })
    public age: number;
    @mapping(val => null)
    public desc: string = "";
}

const result = map({ date: null, age: null, name: null }, Demo);
const result1 = map({ date: null, age: null, name: null }, Demo, { nullable: true });

describe("nullable", () => {
    it("Should use the default value when use default options.", () => {
        expect(result.name).to.be.eq("fisher");
        expect(result.age).to.be.eq(18);
        expect(result.desc).to.be.eq("");
    });
    it("Should be undefined when use default options and the default value was not setted.", () => {
        expect(result.date).to.be.eq(undefined);
    });
    it("Should be return date instance when the option nullable is true.", () => {
        expect(result1.date).to.be.instanceOf(Date);
    });
    it("Should ignore the default value when the option nullable is true.", () => {
        expect(result1.name).to.be.eq('null');
        expect(result1.age).to.be.eq(0);
    });
    it("Should be null when use custom type and the option nullable is true.", () => {
        expect(result1.desc).to.be.eq(null);
    });
});
