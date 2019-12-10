import "reflect-metadata";
import { mapping, map, MAPPING, MAPPED } from "../src/index";
import { expect } from "chai";
import "mocha";

class Base {
    [MAPPED](src: any, options: any) {
        console.log(1);
    }
}

class Person extends Base {
    @mapping()
    public gender: boolean;
    @mapping()
    public num: number = 1;
    @mapping()
    public name: string;
    [MAPPING](src: any, options: any) {
        src.name = "fisher";
    }
    [MAPPED](src: any, options: any) {
        //set value manually.
        this.gender = true;
        //override origin property value.;
        this.num = 100;
        //dynamic assignment
        Object.assign(this, { a: 1, b: 2 });
    }
}
const result = map({ num: 10 }, Person);

describe("hooks", () => {
    it("should be able to get the name property correctly.", () => {
        expect(result.name).to.be.eq('fisher');
    });
    it("should not be undefined when rewrite no exists value.", () => {
        expect(result.gender).to.be.not.undefined;
    });
    it("should be override origin value.", () => {
        expect(result.num).to.be.eq(100);
    });
});