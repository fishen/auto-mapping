declare const global: any;
import "reflect-metadata";

function isValid(obj: any) {
    return typeof obj === "object" && typeof obj.getMetadata === "function";
}

const reflect: typeof Reflect = (function() {
    if (isValid(Reflect)) {
        return Reflect;
    } else if (isValid(global.Reflect)) {
        return global.Reflect;
    } else if (isValid(global.global && global.global.Reflect)) {
        return global.global.Reflect;
    }
    return {};
}());
export default reflect;
