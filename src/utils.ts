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
            return;
        }
    }
    return array.push(item);
}

export function isNil(value: any) {
    return value === null || value === undefined;
}

export function isValid(value: any) {
    if (isNil(value)) return false;
    if (value !== value && isNaN(value)) return false;
    if (value instanceof Date && isNaN(value.valueOf())) return false;
    return true;
}