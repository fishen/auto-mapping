import "reflect-metadata";
import { mapping, map, after } from "../src/index";
import { expect } from "chai";
import "mocha";

class Base {
    [after](src: any, options: any) {
        console.log(1);
    }
}

class Person extends Base {
    @mapping()
    public gender: boolean;
    @mapping()
    public num: number = 1;
    [after](src: any, options: any) {
        console.log(2);
        //set value manually.
        this.gender = true;
        //override origin property value.;
        this.num = 100;
        //dynamic assignment
        Object.assign(this, { a: 1, b: 2 });
    }
}
const result = map({ num: 10 }, Person);

describe("after extension", () => {
    it("should not be undefined when rewrite no exists value.", () => {
        expect(result.gender).to.be.not.undefined;
    });
    it("should be override origin value.", () => {
        expect(result.num).to.be.eq(100);
    });
});