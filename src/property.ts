import { PropertyType, IProperty, IMappingOptions } from './interface';
import { getConverter } from './converter';
import { DEFAULT_PROPERTY_SOURCE, DEFAULT_PROPERTY_SEP, CURRENT_PATH } from './constants';
import { validAssign, isValid } from './utils';

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
    if (options.domain) {
      if (options.path) {
        console.warn('The option domain will be ignored when used with path.');
      } else {
        property.path = [options.domain, name].join(property.separator);
      }
    }
    property.path = property.path || name;
    if (!property.type && Reflect && typeof Reflect.getMetadata === 'function') {
      const designType = Reflect.getMetadata("design:type", target, name);
      property.type = designType === Array ? [] : designType;
    }
    if (Array.isArray(property.type) && property.type.length === 0) {
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
      if (!isValid(value)) return value;
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
