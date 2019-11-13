export type IConverter<T> = (value: any, src: any, dest: T, options?: IMappingOptions) => any;

export type PropertyType<T> = (new (...args: any[]) => T) | IConverter<T>;

export interface IProperty<T = any> {
  /**
   * Default value, multiple data sources can specify multiple different default values.
   */
  default?: any;
  /**
   * The parent path of current property, the resulting path is `${domain}.${currentPropertyKey}`
   * The option domain will be ignored when used with path.
   */
  domain?: string;
  /**
   * The order for the property generated
   * @default 0
   */
  order?: number;
  /**
   * The property path in the source object, such as 'a.b.c','a.b[0].c',
   * @default current property name.
   */
  path?: string;
  /**
   * The source object name,
   * it is required if you want to map data from multiple data sources.
   * @default DEFAULT_SOURCE
   */
  source?: string | symbol;
  /**
   * The property decalre type, it is always necessary if the property type is an array.
   * such as String, [Number]
   */
  type?: PropertyType<T> | [PropertyType<T>];
}

export interface IMappingOptions {
  /**
   * Whether enable debug mode.
   */
  debug?: boolean;
  /**
   * The source object name, it is required if you want to map data from multiple data sources.
   * @default DEFAULT_SOURCE
   */
  source?: string | symbol;
  /**
   * Use the default mapping configuration when the current source configuration is missing.
   * @default true
   */
  useDefaultSource?: boolean;
}
