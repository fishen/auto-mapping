import { MAPPED, MAPPING, PROPERTIES_KEY } from "./constants";
import { IConverter, IMappingOptions, PropertyType } from "./interface";
import { Property } from "./property";
import { isNil, isValid, pushByOrder } from "./utils";

const SYSTEM_CONVERTERS = new Map<PropertyType<any>, IConverter<any>>([
  [String, (value) => isValid(value) ? String(value) : value],
  [Boolean, (value) => isNil(value) ? undefined : Boolean(value)],
  [Number, (value) => isNil(value) ? undefined : Number(value)],
  [Date, (value) => isValid(value) ? new Date(value) : value],
]);

export function getConverter<T>(type?: PropertyType<T>): IConverter<T> {
  if (typeof type === "function") {
    if (type.prototype && Reflect.hasMetadata(PROPERTIES_KEY, type.prototype)) {
      return (value: any, src: any, dest: T, options?: IMappingOptions) => map(value, type as any, options);
    } else {
      if (SYSTEM_CONVERTERS.has(type)) {
        return SYSTEM_CONVERTERS.get(type);
      } else {
        return type as any;
      }
    }
  } else {
    return (value: any) => value;
  }
}

/**
 * Map an object to an instance of the specified type.
 * @param src Data source object.
 * @param constuctor The type of instance, the constructor function of the class.
 * @param options Mapping options.
 */
export function map<T extends new (...args: any[]) => any>(src: any, constuctor: T,
                                                           options?: IMappingOptions): InstanceType<T> | null {
  let instance: any = null;
  options = Object.assign({ useDefaultSource: true }, options);
  if (typeof constuctor.prototype[MAPPING] === "function") {
    const mappingResult = constuctor.prototype[MAPPING](src, options);
    src = mappingResult === undefined ? src : mappingResult;
  }
  if (!isNil(src) && typeof src === "object") {
    instance = new constuctor();
    const properties = Property.getProperties(constuctor.prototype, options);
    properties.forEach((property) => {
      let result;
      try {
        result = property.convert(src, instance, options);
      } catch (error) {
        console.error(error);
      }
      const { name, default: df } = property;
      result = isValid(result) ? result : df !== undefined ? df : instance[name];
      instance[name] = result;
    });
  }
  if (typeof constuctor.prototype[MAPPED] === "function") {
    const result = constuctor.prototype[MAPPED].call(instance, src, options);
    if (result !== undefined) { return result; }
  }
  return instance;
}
