export interface IConverter<T> {
    (value: any, src: any, dest: T, options?: IMappingOptions): any
}

export type PropertyType<T> = { new(...args: any[]): T } | IConverter<T>;

export interface IProperty<T=any> {
    /**
     * The property path in the source object, such as 'a.b.c','a.b[0].c'
     */
    path?: string;
    /**
     * The property decalre type, it is always necessary if the property type is an array.
     * Tt is optional if the module 'refleat-metadata' has been imported in your project. 
     * such as String, [Number]
     */
    type?: PropertyType<T> | [PropertyType<T>];
    /**
     * The property path separator, default is '.'.
     */
    separator?: string;
    /**
     * The source object name, default name is 'default', it is required if you want to map data from multiple data sources.
     */
    source?: string;
    /**
     * Custom conversion function, it will use default value if the conversion throws an error.
     */
    convert?: (this: T, value: any, src: any, dest: T) => any;
    /**
     * Default value, multiple data sources can specify multiple different default values.
     */
    default?: any;
    /**
     * The order for the property generated, default is 0;
     */
    order?: number;
}

export interface IMappingOptions {
    /**
     * The source object name, default is 'default', it is required if you want to map data from multiple data sources.
     */
    source: string;
}