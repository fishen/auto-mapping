import { resolve } from "secure-template";
import { CURRENT_PATH, DEFAULT_ORDER, DEFAULT_PROPERTY_SEP, DEFAULT_SOURCE, PROPERTIES_KEY } from "./constants";
import { getConverter } from "./converter";
import { Converter, IMappingOptions, IProperty, PropertyType } from "./interface";
import { isValid, pushByOrder, validAssign } from "./utils";

export class Property<T> implements IProperty<T> {

  public static from<T>(options: IProperty<T> | Converter<T>, target: any, name: string) {
    options = typeof options === "function" ? { type: options } : (options || {});
    const property = new Property();
    property.name = name;
    validAssign(property, options);
    if (options.domain) {
      if (!options.path) {
        // The option domain will be ignored when used with path.
        property.path = [options.domain, name].join(DEFAULT_PROPERTY_SEP);
      }
    }
    property.path = property.path || name;
    if (!property.type) {
      const designType = Reflect.getMetadata("design:type", target, name);
      property.type = designType === Array ? [] : designType;
    }
    return property;
  }

  /**
   * Get the properties bound on the prototype object
   * @param prototype prototype object
   * @param options mapping options
   */
  public static getProperties<T>(prototype: object, options?: IMappingOptions): Array<Property<T>> {
    options = Object.assign({ source: DEFAULT_SOURCE }, options);
    const { source, useDefaultSource } = options;
    let properties: Array<Property<T>> = Reflect.getMetadata(PROPERTIES_KEY, prototype, source);
    properties = properties ? properties.slice() : [];
    if (source !== DEFAULT_SOURCE && useDefaultSource) {
      const dfProperties: Array<Property<T>> = Property.getProperties(prototype);
      dfProperties.filter((p) => !properties.some((x) => x.name === p.name))
        .forEach((p) => pushByOrder(properties, p, (m) => m.order));
    }
    return properties;
  }

  public path: string;
  public type: PropertyType<T>;
  public default: any;
  public order: number = DEFAULT_ORDER;
  public name: string;
  public source: string | symbol = DEFAULT_SOURCE;

  /**
   * The conversion function
   * @param src source value
   * @param dest dest value
   * @param options mapping options
   */
  public convert(src: any, dest: T, options?: IMappingOptions) {
    let value = this.path === CURRENT_PATH ? src : resolve(this.path, src);
    if (Array.isArray(this.type)) {
      if (!isValid(value, options)) { return value; }
      const convert = getConverter(this.type[0], options);
      value = Array.isArray(value) ? value : [value];
      value = value.map((item: any) => convert(item, src, dest, options));
    } else {
      const convert = getConverter(this.type, options);
      value = convert(value, src, dest, options);
    }
    return value;
  }
}
