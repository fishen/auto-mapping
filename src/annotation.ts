import { IProperty, IConverter } from "./interface";
import { Property } from "./property";
import { PROPERTIES_KEY } from "./constants";
import { pushByOrder } from './utils';

/**
 * The required annotations for object mapping which can only be used on instance properties.
 * @param options mapping options
 */
export function mapping<T=any>(options?: IProperty<T> | IConverter<T>) {
    return function (target: any, name: string) {
        if (typeof target === 'function') {
            console.warn('Mapping static members is not allowed, it is a dangerous operation.');
            return;
        }
        const opts: IProperty<T> = options || {} as any;
        const property = Property.from(opts, target, name);
        target[PROPERTIES_KEY] = target[PROPERTIES_KEY] || {};
        target[PROPERTIES_KEY][property.source] = target[PROPERTIES_KEY][property.source] || [];
        pushByOrder(target[PROPERTIES_KEY][property.source], property, item => item.order)
    }
}