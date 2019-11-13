import { DEFAULT_SOURCE, PROPERTIES_KEY } from "./constants";
import { IConverter, IProperty } from "./interface";
import { Property } from "./property";
import { pushByOrder } from "./utils";

/**
 * The required annotations for object mapping which can only be used on instance properties.
 * @param options mapping options
 */
export function mapping<T = any>(options?: IProperty<T> | IConverter<T>) {
    return function(target: any, name?: string) {
        const opts: IProperty<T> = options || {} as any;
        const property = Property.from(opts, target, name);
        const properties = Property.getProperties(target, { source: property.source });
        const index = properties.findIndex((p) => p.name === property.name);
        // tslint:disable-next-line
        ~index && properties.splice(index, 1);
        pushByOrder(properties, property, (item) => item.order);
        Reflect.defineMetadata(PROPERTIES_KEY, true, target);
        Reflect.defineMetadata(PROPERTIES_KEY, properties, target, property.source);
    };
}
