import { PROPERTIES_KEY } from "./constants";
import { IConverter, IProperty } from "./interface";
import { Property } from "./property";
import { pushByOrder } from "./utils";

/**
 * The required annotations for object mapping which can only be used on instance properties.
 * @param options mapping options
 */
export function mapping<T = any>(options?: IProperty<T> | IConverter<T>) {
    return function(target: any, name?: string) {
        if (typeof target === "function" && PROPERTIES_KEY in target.prototype) {
            const props = target.prototype[PROPERTIES_KEY];
            target[PROPERTIES_KEY] = Object.keys(props)
                .reduce((result, key) => {
                    result[key] = props[key].slice();
                    return result;
                }, {} as any);
            return;
        }
        const opts: IProperty<T> = options || {} as any;
        const property = Property.from(opts, target, name);
        const properties = target[PROPERTIES_KEY] || {};
        properties[property.source] = properties[property.source] || [];
        pushByOrder(properties[property.source], property, (item) => item.order);
        target[PROPERTIES_KEY] = properties;
    };
}
