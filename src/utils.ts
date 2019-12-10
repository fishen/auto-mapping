export function validAssign(source: any, dest: any) {
    source = source || {};
    for (const key in dest) {
        if (dest[key] !== undefined) {
            source[key] = dest[key];
        }
    }
    return source;
}

export function pushByOrder<T>(array: T[], item: T, selector: (item: T) => any) {
    for (let index = 0, length = array.length; index < length; index++) {
        const element = array[index];
        if (selector(item) < selector(element)) {
            array.splice(index, 0, item);
            return array;
        }
    }
    array.push(item);
    return array;
}

export function isNil(value: any) {
    return value === null || value === undefined;
}

export function isValid(value: any, options?: { nullable?: boolean, allowNaN?: boolean }) {
    const { nullable, allowNaN } = Object.assign({}, options);
    if (value === undefined) {
        return false;
    } else if (value === null) {
        return nullable;
    } else if (value !== value && isNaN(value)) {
        return !!allowNaN;
    } else if (value instanceof Date && isNaN(value.valueOf())) {
        return !!allowNaN;
    } else {
        return true;
    }
}

export enum DecoractorTarget {
    argument = "argument",
    class = "class",
    gettter = "gettter",
    method = "method",
    property = "property",
    setter = "setter",
}

// tslint:disable-next-line
export function isFn(target: any): target is Function {
    return typeof target === "function";
}

export function isObj(target: any, canBeNull = false): target is object {
    if (typeof target !== "object") { return false; }
    return canBeNull || target !== null;
}

export function isNum(target: any, canBeNaN = false): target is number {
    if (typeof target !== "number") { return false; }
    return canBeNaN || isNaN(target);
}

export function isStr(target: any): target is string {
    return typeof target === "string";
}

const decoractorTargetDict: Map<DecoractorTarget,
    (target: any, name?: string, descriptor?: PropertyDescriptor | number) => boolean> = new Map([
        [DecoractorTarget.argument, (target, name, index) => {
            return isObj(target) && isNum(index);
        }],
        [DecoractorTarget.class, (target, name, descriptor) => {
            return isFn(target) && name === undefined && descriptor === undefined;
        }],
        [DecoractorTarget.gettter, (target, name, descriptor: PropertyDescriptor) => {
            return isObj(target) && isObj(descriptor) && isFn(descriptor.get);
        }],
        [DecoractorTarget.method, (target, name, descriptor: PropertyDescriptor) => {
            return isObj(target) && isObj(descriptor) && isFn(descriptor.value);
        }],
        [DecoractorTarget.property, (target, name, descriptor) => {
            return isObj(target) && isStr(name) && descriptor === undefined;
        }],
        [DecoractorTarget.setter, (target, name, descriptor: PropertyDescriptor) => {
            return isObj(target) && isObj(descriptor) && isFn(descriptor.set);
        }],
    ]);

export function checkDecoractorTarget(decoractor: string, ...targets: DecoractorTarget[]) {
    return function(target: any, name?: string, descriptor?: PropertyDescriptor) {
        const satisfied = targets.some((t) => {
            const predicate = decoractorTargetDict.get(t)!;
            if (!predicate) { throw new TypeError(`unknown decoractor target ${t}.`); }
            return predicate(target, name, descriptor);
        });
        if (!satisfied) {
            const types = targets.join();
            const className = isFn(target) ? target.name : target.constructor.name;
            throw new Error(`[${className}|${name}] The decorator '${decoractor}' can only be used on member types: ${types}`);
        }
    };
}

export function isGetter(target: any, name: string, descriptor: PropertyDescriptor) {
    return decoractorTargetDict.get(DecoractorTarget.gettter)(target, name, descriptor);
}
