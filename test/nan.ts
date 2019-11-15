import "reflect-metadata";
import { mapping, map } from "../src/index";
import { expect } from "chai";
import "mocha";

class Demo {
    @mapping()
    public date: Date;
    @mapping({ default: 18 })
    public age: number;
    @mapping()
    public count: number = 10;
    @mapping()
    public length: number;
    @mapping()
    public name: string;
    @mapping(val => NaN)
    public desc: string = "";
}

const result = map({ date: NaN, age: NaN, count: NaN, length: NaN, name: NaN }, Demo);
const result1 = map({ date: NaN, age: NaN, count: NaN, length: NaN, name: NaN }, Demo, { allowNaN: true });
const result2 = map({ date: "sfsfs" }, Demo);
const result3 = map({ date: "sfsfs" }, Demo, { allowNaN: true });

describe("nullable", () => {
    it("Should use the default value when use default options.", () => {
        expect(result.date).to.be.eq(undefined);
        expect(result.age).to.be.eq(18);
        expect(result.count).to.be.eq(10);
    });
    it("Should be undefined when use default options and the default value was not setted.", () => {
        expect(result.length).to.be.eq(undefined);
    });
    it("Should be return date instance when the option allowNaN is true.", () => {
        expect(result1.date).to.be.instanceOf(Date);
    });
    it("Should ignore the default value when the option allowNaN is true.", () => {
        expect(result1.name).to.be.eq('NaN');
        expect(result1.age).to.be.NaN;
        expect(result1.date.valueOf()).to.be.NaN;
    });
    it("Should be NaN when use custom type and the option allowNaN is true.", () => {
        expect(result1.desc).to.be.NaN;
    });
    it("Should use the default value when the date conversion fails.", () => {
        expect(result2.date).to.be.eq(undefined);
    })
    it("Should return invalid date instance when the date conversion fails and the allowNaN option is true.", () => {
        expect(result3.date).to.be.instanceOf(Date);
        expect(result3.date.valueOf()).to.be.NaN;
    })
});
