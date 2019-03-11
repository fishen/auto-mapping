export type IConverter<T> = (value: any, src: any, dest: T, options?: IMappingOptions) => any;

export type PropertyType<T> = (new (...args: any[]) => T) | IConverter<T>;

export interface IProperty<T = any> {
  /**
   * Default value, multiple data sources can specify multiple different default values.
   */
  default?: any;
  /**
   * The parent path of current property, the resulting path is `${domain}${separator}${currentPropertyKey}`
   * The option domain will be ignored when used with path.
   */
  domain?: string;
  /**
   * The order for the property generated, default is 0;
   */
  order?: number;
  /**
   * The property path in the source object, such as 'a.b.c','a.b[0].c', default value is current property name.
   */
  path?: string;
  /**
   * The property path separator, default is '.'.
   */
  separator?: string;
  /**
   * The source object name, default name is 'default',
   * it is required if you want to map data from multiple data sources.
   */
  source?: string;
  /**
   * The property decalre type, it is always necessary if the property type is an array.
   * such as String, [Number]
   */
  type?: PropertyType<T> | [PropertyType<T>];
}

export interface IMappingOptions {
  /**
   * The source object name, default is 'default', it is required if you want to map data from multiple data sources.
   */
  source?: string;
  /**
   * Use the default mapping configuration when the current source configuration is missing.
   * default is true.
   */
  useDefaultSource?: boolean;
}
