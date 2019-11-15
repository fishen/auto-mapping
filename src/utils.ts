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
