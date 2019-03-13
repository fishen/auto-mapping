import { resolve } from "secure-template";
import { CURRENT_PATH, DEFAULT_PROPERTY_SEP, DEFAULT_PROPERTY_SOURCE } from "./constants";
import { getConverter } from "./converter";
import { IMappingOptions, IProperty, PropertyType } from "./interface";
import { isValid, validAssign } from "./utils";

export class Property<T> implements IProperty<T> {
  public static from<T>(options: IProperty<T>, target: any, name: string) {
    options = typeof options === "function" ? { type: options } : options;
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
    if (!property.type && typeof Reflect === "object" && "getMetadata" in Reflect) {
      const designType = (Reflect as any).getMetadata("design:type", target, name);
      property.type = designType === Array ? [] : designType;
    }
    return property;
  }
  public path: string;
  public type: PropertyType<T>;
  public source: string = DEFAULT_PROPERTY_SOURCE;
  public default: any;
  public order: number = 0;
  public name: string;

  public resolvePath(src: any) {
    if (this.path === CURRENT_PATH) {
      return src;
    } else {
      return resolve(this.path, src);
    }
  }

  public convert(value: any, src: any, dest: T, options?: IMappingOptions) {
    if (Array.isArray(this.type)) {
      if (!isValid(value)) {
        return value;
      }
      const convert = getConverter(this.type[0]);
      value = Array.isArray(value) ? value : [value];
      value = value.map((item: any) => convert(item, src, dest, options));
    } else {
      const convert = getConverter(this.type);
      value = convert(value, src, dest, options);
    }
    return value;
  }
}
