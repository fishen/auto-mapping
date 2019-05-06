import "reflect-metadata";
import { mapping, map, after } from "../src/index";
import { expect } from "chai";
import "mocha";

class Person {
    @mapping()
    public gender: boolean;
    @mapping()
    public num: number = 1;
    [after](src: any, options: any) {
        //set value manually.
        this.gender = true;
        //override origin property value.;
        this.num = 100;
        //dynamic assignment
        Object.assign(this, { a: 1, b: 2 });
    }
}
const result = map({ num: 10 }, Person);

describe("auto get type", () => {
    it("should not be undefined when rewrite no exists value.", () => {
        expect(result.gender).to.be.not.undefined;
    });
    it("should be override origin value.", () => {
        expect(result.num).to.be.eq(100);
    });
});