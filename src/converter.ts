import { PropertyType, IMappingOptions, IConverter } from "./interface";
import { DEFAULT_PROPERTY_SOURCE, PROPERTIES_KEY } from "./constants";
import { Property } from "./property";
import { pushByOrder, isValid, isNil } from "./utils";

const SYSTEM_TYPES: Array<PropertyType<any>> = [String, Boolean, Number, Date];

const SYSTEM_CONVERTERS: Array<IConverter<any>> = [
  (value) => isValid(value) ? String(value) : value,
  (value) => isNil(value) ? undefined : Boolean(value),
  (value) => isNil(value) ? undefined : Number(value),
  (value) => isValid(value) ? new Date(value) : value,
];

export function getConverter<T>(type?: PropertyType<T>): IConverter<T> {
  if (typeof type === 'function') {
    if (PROPERTIES_KEY in type.prototype) {
      return (value: any, _src: any, _dest: T, options?: IMappingOptions) => map(value, type as any, options);
    } else {
      const index = SYSTEM_TYPES.indexOf(type);
      if (~index) {
        return SYSTEM_CONVERTERS[index];
      } else {
        return type as any;
      }
    }
  } else {
    return (value: any) => value;
  }
}

function getProperties<T>(constuctor: any, options?: IMappingOptions) {
  const sourceName = options && options.source || DEFAULT_PROPERTY_SOURCE;
  const properties: Record<string, Array<Property<T>>> = constuctor.prototype[PROPERTIES_KEY];
  if (!properties || !(sourceName in properties)) {
    console.warn(`The type ${constuctor.name} has no mapping annotation declared.`);
    return [];
  }
  let defaultProperties = properties[DEFAULT_PROPERTY_SOURCE];
  if (sourceName !== DEFAULT_PROPERTY_SOURCE) {
    const useDefaultSource = (options && options.useDefaultSource) !== false;
    if (useDefaultSource && Array.isArray(defaultProperties)) {
      defaultProperties = defaultProperties.slice();
      properties[sourceName].forEach(p => {
        const index = defaultProperties.findIndex(m => p.name === m.name);
        ~index && defaultProperties.splice(index, 1);
        pushByOrder(defaultProperties, p, p => p.order);
      });
    } else {
      return properties[sourceName];
    }
  }
  return defaultProperties;
}

/**
 * Map an object to an instance of the specified type.
 * @param src Data source object.
 * @param constuctor The type of instance, the constructor function of the class.
 * @param options Mapping options.
 */
export function map<T extends new (...args: any[]) => any>
  (src: any, constuctor: T, options?: IMappingOptions): InstanceType<T> | null {
  const instance = new constuctor();
  if (src === undefined || src === null || typeof src !== 'object') {
    return null;
  }
  const properties = getProperties(constuctor, options);
  properties.forEach((property) => {
    let result;
    try {
      const value = property.resolvePath(src);
      result = property.convert(value, src, instance, options);
    } catch (error) {
      console.error(error);
    }
    if (isValid(result)) {
      Object.assign(instance, { [property.name]: result });
    } else if ('default' in property) {
      Object.assign(instance, { [property.name]: property.default });
    }
  });
  return instance;
}
