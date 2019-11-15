import { MAPPED, MAPPING } from "./constants";
import { Converter, IMappingOptions, PropertyType } from "./interface";
import { Property } from "./property";
import { isNil, isValid } from "./utils";

/**
 * Global conversion function container
 */
export const CONVERTERS = new Map<PropertyType<any>, Converter<any>>([
  [String, (value, src, dest, options) => isValid(value, options) ? String(value) : value],
  [Boolean, (value, src, dest, options) => isValid(value, options) ? Boolean(value) : value],
  [Number, (value, src, dest, options) => isValid(value, options) ? Number(value) : value],
  [Date, (value, src, dest, options) => isValid(value, options) ? new Date(value) : value],
]);

/**
 * Get the conversion function of the specified type.
 * @param type conversion type
 * @param options mapping options
 */
export function getConverter<T>(type: PropertyType<T>, options: IMappingOptions): Converter<T> {
  if (typeof type === "function") {
    if (options && options.converters instanceof Map && options.converters.has(type)) {
      return options.converters.get(type);
    } else if (CONVERTERS.has(type)) {
      return CONVERTERS.get(type)!;
    } else {
      return type as any;
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
      result = isValid(result, options) ? result : df !== undefined ? df : instance[name];
      instance[name] = result;
    });
  }
  if (typeof constuctor.prototype[MAPPED] === "function") {
    const result = constuctor.prototype[MAPPED].call(instance, src, options);
    if (result !== undefined) { return result; }
  }
  return instance;
}

/**
 * Set the global conversion function for the specified type
 * @param type The type of value to convert
 * @param converter The conversion function
 * @example map.setDefaultConverter(String,(value)=>value!==null&&value!==undefined?value:'')
 */
map.setDefaultConverter = function(type: PropertyType, converter: Converter<any>) {
  if (typeof type !== "function") { throw new TypeError(`The 'type' parameter must be a function type`); }
  if (typeof converter !== "function") { throw new TypeError(`The 'type' parameter must be a function type`); }
  CONVERTERS.set(type, converter);
};
