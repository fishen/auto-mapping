import { DEFAULT_ORDER, DEFAULT_PROPERTY_SEP, DEFAULT_SOURCE, DESIGN_TYPE } from "./constants";
import { Converter, IProperty, PropertyType } from "./interface";
import Reflect from "./reflect";
import { validAssign } from "./utils";

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
      const designType = Reflect.getMetadata(DESIGN_TYPE, target, name);
      property.type = designType === Array ? [] : designType;
    }
    return property;
  }

  public path: string;
  public type: PropertyType<T>;
  public default: any;
  public order: number = DEFAULT_ORDER;
  public name: string;
  public source: string | symbol = DEFAULT_SOURCE;
}
