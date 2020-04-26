import { resolve } from "secure-template";
import { CURRENT_PATH, DEFAULT_SOURCE, MAPPED, MAPPING } from "./constants";
import { PROPERTIES_KEY } from "./constants";
import { Converter, IMappingOptions, PropertyType } from "./interface";
import { Property } from "./property";
import Reflect from "./reflect";
import { isNil, isValid, pushByOrder } from "./utils";

export class Mapper<T extends new (...args: any[]) => any> {
  public static converters = new Map<PropertyType<any>, Converter<any>>([
    [String, (value, src, dest, options) => isValid(value, options) ? String(value) : value],
    [Boolean, (value, src, dest, options) => isValid(value, options) ? Boolean(value) : value],
    [Number, (value, src, dest, options) => isValid(value, options) ? Number(value) : value],
    [Date, (value, src, dest, options) => isValid(value, options) ? new Date(value) : value],
  ]);
  /**
   * Get the properties bound on the prototype object
   * @param prototype prototype object
   * @param options mapping options
   */
  public static getProperties<T>(prototype: object, options?: IMappingOptions): Property<T>[] {
    const { source, useDefaultSource } = Object.assign({ source: DEFAULT_SOURCE }, options);
    let properties: Property<T>[] = Reflect.getMetadata(PROPERTIES_KEY, prototype, source);
    properties = properties ? properties.slice() : [];
    if (source !== DEFAULT_SOURCE && useDefaultSource) {
      const dfProperties: Property<T>[] = Mapper.getProperties(prototype);
      dfProperties.filter((p) => !properties.some((x) => x.name === p.name))
        .forEach((p) => pushByOrder(properties, p, (m) => m.order));
    }
    return properties;
  }
  public data: any;
  public instance: any;
  public ctor: T;
  public prototype: any;
  public options?: IMappingOptions;
  public customConverter: (...args: any) => any;
  constructor(instance: any, data: any, ctor: T, options?: IMappingOptions) {
    this.instance = instance;
    this.ctor = ctor;
    this.prototype = ctor.prototype;
    this.options = Object.assign({ useDefaultSource: true, source: DEFAULT_SOURCE }, options);
    if (typeof ctor.prototype[MAPPING] === "function") {
      const mappingResult = ctor.prototype[MAPPING](data, options);
      data = mappingResult === undefined ? data : mappingResult;
    }
    this.data = data;
  }
  public map() {
    if (!this.isValidSourceData()) { return null; }
    const properties = Mapper.getProperties<T>(this.prototype, this.options);
    properties.forEach((p) => this.instance[p.name] = this.getPropertyValue(p));
    const mappedResult = this.getMappedResult();
    return mappedResult === undefined ? this.instance : mappedResult;
  }
  private hasProperties(prototype: any) {
    if (!prototype) return false;
    const result = Reflect.hasMetadata(PROPERTIES_KEY, prototype, this.options.source);
    if (result) { return true; }
    if (this.options.useDefaultSource) {
      return Reflect.hasMetadata(PROPERTIES_KEY, prototype, DEFAULT_SOURCE);
    }
  }
  private getConverter(type: PropertyType<T>): Converter<T> {
    if (typeof type === "function") {
      if (this.options && this.options.converters instanceof Map && this.options.converters.has(type)) {
        return this.options.converters.get(type);
      } else if (Mapper.converters.has(type)) {
        return Mapper.converters.get(type)!;
      } else if (this.hasProperties(type.prototype)) {
        return (value, src, dest, opts) => this.customConverter(value, type, opts);
      } else {
        return type as any;
      }
    } else {
      return (value: any) => value;
    }
  }
  private getPropertyValue(p: Property<T>) {
    let value;
    try {
      value = p.path === CURRENT_PATH ? this.data : resolve(p.path, this.data);
      if (Array.isArray(p.type)) {
        if (isValid(value, this.options)) {
          const convert = this.getConverter(p.type[0]);
          value = Array.isArray(value) ? value : [value];
          value = value.map((item: any) => convert(item, this.data, this.instance, this.options));
        }
      } else {
        const convert = this.getConverter(p.type);
        value = convert(value, this.data, this.instance, this.options);
      }
    } catch (error) {
      console.error(error);
    }
    value = isValid(value, this.options) ? value : p.default !== undefined ? p.default : this.instance[p.name];
    return value;
  }
  private getMappedResult() {
    if (typeof this.prototype[MAPPED] === "function") {
      const result = this.prototype[MAPPED].call(this.instance, this.data, this.options);
      if (result !== undefined) { return result; }
    }
  }
  private isValidSourceData() {
    return !isNil(this.data) && typeof this.data === "object";
  }
}

/**
 * Map an object to an instance of the specified type.
 * @param src Data source object.
 * @param constuctor The type of instance, the constructor function of the class.
 * @param options Mapping options.
 */
export function map<T extends new (...args: any[]) => any>(
  src: any,
  constuctor: T,
  options?: IMappingOptions): InstanceType<T> | null {
  const mapper = new Mapper(new constuctor(), src, constuctor, options);
  mapper.customConverter = map;
  return mapper.map();
}

/**
 * Map an object to another object which only has the mapped property.
 * @param src Data source object.
 * @param constuctor The type of instance, the constructor function of the class.
 * @param options Mapping options.
 */
export function select<T extends new (...args: any[]) => any>(
  src: any,
  constuctor: T,
  options?: IMappingOptions): Partial<InstanceType<T>> | null {
  const mapper = new Mapper(Object.create({}), src, constuctor, options);
  mapper.customConverter = select;
  return mapper.map();
}

/**
 * Set the global conversion function for the specified type
 * @param type The type of value to convert
 * @param converter The conversion function
 * @example map.setDefaultConverter(String,(value)=>value!==null&&value!==undefined?value:'')
 */
map.setDefaultConverter = function (type: PropertyType, converter: Converter<any>) {
  if (typeof type !== "function") { throw new TypeError(`The 'type' parameter must be a function type`); }
  if (typeof converter !== "function") { throw new TypeError(`The 'type' parameter must be a function type`); }
  Mapper.converters.set(type, converter);
};
