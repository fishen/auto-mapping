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
        property.path = [options.domain, name].join(property.separator);
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
  public separator: string = DEFAULT_PROPERTY_SEP;
  public source: string = DEFAULT_PROPERTY_SOURCE;
  public default: any;
  public order: number = 0;
  public name: string;

  public resolvePath(src: any) {
    if (!src) {
      return undefined;
    } else if (this.path === CURRENT_PATH) {
      return src;
    }
    const pathes = this.path.split(this.separator);
    let index = 0;
    const length = pathes.length;
    for (; index < length; index++) {
      const path = pathes[index];
      const matches = path.match(/^(.+)\[(\d)\]$/);
      if (matches) {
        const [, name, idx] = matches;
        if (Array.isArray(src[name]) && src[name].length > idx) {
          src = src[name][idx];
        } else {
          break;
        }
      } else {
        if (path in src) {
          src = src[path];
        } else {
          break;
        }
      }
    }
    return index === length ? src : undefined;
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
