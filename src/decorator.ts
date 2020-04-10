import { PROPERTIES_KEY } from "./constants";
import { Mapper } from "./converter";
import { Converter, IProperty } from "./interface";
import { Property } from "./property";
import Reflect from "./reflect";
import { pushByOrder } from "./utils";

/**
 * The required annotations for object mapping which can only be used on instance properties.
 * @param options mapping options
 */
export function mapping<T = any>(options?: IProperty<T> | Converter<T>) {
    return function (target: any, name?: string) {
        const property = Property.from(options, target, name);
        const properties = Mapper.getProperties(target, { source: property.source });
        const index = properties.findIndex((p) => p.name === property.name);
        // tslint:disable-next-line
        ~index && properties.splice(index, 1);
        pushByOrder(properties, property, (item) => item.order);
        Reflect.defineMetadata(PROPERTIES_KEY, properties, target, property.source);
    };
}
