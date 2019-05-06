declare module "auto-mapping/src/constants" {
    export const CURRENT_PATH = ".";
    export const DEFAULT_PROPERTY_SEP = ".";
    export const DEFAULT_PROPERTY_SOURCE = "default";
    export const PROPERTIES_KEY: any;
}
declare module "auto-mapping/src/interface" {
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
         * The order for the property generated, default is 0;
         */
        order?: number;
        /**
         * The property path in the source object, such as 'a.b.c','a.b[0].c', default value is current property name.
         */
        path?: string;
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
}
declare module "auto-mapping/src/utils" {
    export function validAssign(source: any, dest: any): any;
    export function pushByOrder<T>(array: T[], item: T, selector: (item: T) => any): any;
    export function isNil(value: any): boolean;
    export function isValid(value: any): boolean;
}
declare module "auto-mapping/src/converter" {
    import { IConverter, IMappingOptions, PropertyType } from "auto-mapping/src/interface";
    export function getConverter<T>(type?: PropertyType<T>): IConverter<T>;
    /**
     * Map an object to an instance of the specified type.
     * @param src Data source object.
     * @param constuctor The type of instance, the constructor function of the class.
     * @param options Mapping options.
     */
    export function map<T extends new (...args: any[]) => any>(src: any, constuctor: T, options?: IMappingOptions): InstanceType<T> | null;
}
declare module "auto-mapping/src/property" {
    import { IMappingOptions, IProperty, PropertyType } from "auto-mapping/src/interface";
    export class Property<T> implements IProperty<T> {
        static from<T>(options: IProperty<T>, target: any, name: string): Property<{}>;
        path: string;
        type: PropertyType<T>;
        source: string;
        default: any;
        order: number;
        name: string;
        resolvePath(src: any): any;
        convert(value: any, src: any, dest: T, options?: IMappingOptions): any;
    }
}
declare module "auto-mapping/src/decorator" {
    import { IConverter, IProperty } from "auto-mapping/src/interface";
    /**
     * The required annotations for object mapping which can only be used on instance properties.
     * @param options mapping options
     */
    export function mapping<T = any>(options?: IProperty<T> | IConverter<T>): (target: any, name: string) => void;
}
declare module "auto-mapping" {
    export { mapping } from "auto-mapping/src/decorator";
    export { map } from "auto-mapping/src/converter";
}