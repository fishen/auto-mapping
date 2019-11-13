import "reflect-metadata";
import { mapping, map } from "../src/index";
import { expect } from "chai";
import "mocha";

class Demo {
    @mapping()
    public date: Date;
}

const result = map({ date: null }, Demo);

describe("date", () => {
    it("should be undefined.", () => {
        expect(result.date).to.be.eq(undefined);
    });
});
