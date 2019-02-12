import { PropertyType, IProperty, IMappingOptions } from './interface';
import { getConverter } from './converter';
import { DEFAULT_PROPERTY_SOURCE, DEFAULT_PROPERTY_SEP, CURRENT_PATH } from './constants';
import { validAssign } from './utils';

export class Property<T> implements IProperty<T> {
  path: string;
  type: PropertyType<T>;
  separator: string = DEFAULT_PROPERTY_SEP;
  source: string = DEFAULT_PROPERTY_SOURCE;
  default: any;
  order: number = 0;
  name: string;

  static from<T>(options: IProperty<T>, target: any, name: string) {
    options = typeof options === 'function' ? { type: options } : options;
    const property = new Property();
    property.name = name;
    validAssign(property, options);
    property.path = property.path || name;
    if (!property.type && Reflect && 'getMetadata' in Reflect) {
      const designType = (Reflect as any).getMetadata("design:type", target, name);
      property.type = designType === Array ? [] : designType;
    }
    if (!property.type) {
      console.warn(`The propery ${name} missing 'type' option and it will be treated as any, ` +
        `you can import module 'reflect-metadata' to get types automatically`);
    } else if (Array.isArray(property.type) && property.type.length === 0) {
      console.warn(`The propery ${name} missing type declaration and it will treated as any[]`);
    }
    return property;
  }

  resolvePath(src: any) {
    if (!src) return undefined;
    if (this.path === CURRENT_PATH) return src;
    const pathes = this.path.split(this.separator);
    for (var index = 0, length = pathes.length; index < length; index++) {
      const path = pathes[index];
      const matches = path.match(/^(.+)\[(\d)\]$/);
      if (matches) {
        const [, name, index] = matches;
        if (Array.isArray(src[name]) && src[name].length > index) {
          src = src[name][index];
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

  convert(value: any, src: any, dest: T, options?: IMappingOptions) {
    if (Array.isArray(this.type)) {
      if (value === undefined) return value;
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
