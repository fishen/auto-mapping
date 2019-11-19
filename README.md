# AUTO-MAPPING
Map and convert objects automatically in typescript.
# Features
* Map object to an instance of a class by annotation;
* Convert property types automatically;
* Custom conversion;
* Multiple data source mappings;
* Map extensions;
# Installation

`$ npm install --save auto-mapping`

# Getting started
Please import the **reflect-metadata** module in the project entry file before use.

To enable experimental support for decorators, you must enable the experimentalDecorators compiler option either on the command line or in your *tsconfig.json*:
```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
  }
}
```
```ts
import 'reflect-metadata';
import { mapping, map } from 'auto-mapping';

class Person {
    @mapping({ type: String })
    name: string;
    @mapping(Boolean) // short form
    gender: boolean;
    @mapping({ path: 'others.number', type: Number })
    age: number
}
const data={
    name: 'fisher',
    gender: 1,
    others: { number: '18' },
};
console.log(map(data, Person));
```
```sh
# output
Person { name: 'fisher', gender: true, age: 18 }
```
# More Convenient Use(reflect-metadata)
If you have already imported **reflect-metadata** module into your project, it will infer type automatic except array type.
The array type must declare the **type** parameter at any time.
```ts
import 'reflect-metadata';
import { mapping, map } from 'auto-mapping';

class Person {
    @mapping()
    name: string;
    @mapping()
    gender: boolean;
    @mapping({ path: 'others.number' })
    age: number
}
const data={
    name: 'fisher',
    gender: 1,
    others: { number: '18' },
};
console.log(map(data, Person));
```
```sh
# output
Person { name: 'fisher', gender: true, age: 18 }
```
# API

## @mapping(options: object | function)
Configuring property mapping information, If the argument is a function, then it is equivalent to **{ type: options }**.
* **domain**(string): The parent path of current property, the option domain will be ignored when used with path. 
* **type**(function | [function]): The property decalre type, it is always necessary if the property type is an array. Tt is optional if the module 'refleat-metadata' has been imported in your project. It also can be used to set custom conversion function, it will use default value if the conversion throws an error.
* **path**(string): The property path in the source object, such as 'a.b.c','a.b[0].c', default is the current path name. Use the dot symbol ('.') to indicates the current path.
* **order**(number): The order for the property generated, default is 0.
* **source**(string): The source object name, it is required if you want to map data from multiple data sources.
* **default**(any): Default value, multiple data sources can specify multiple different default values.
***
## map(source:object, constructor:function, options?:object)
Map an object to an instance of the specified type.
* **source**(object): Data source object
* **constructor**(function): The type of instance, the constructor function of the class
* **options**(string, optional): Mapping options.
    * **source**(string): The source object name, it is required if you want to map data from multiple data sources.
    * **useDefaultSource**(boolean): Use the default mapping configuration when the current source configuration is missing, default is **true**. 
    * **nullable**(boolean): Whether to allow the value to be set to null.
    * **allowNaN**(booelan): Whether to allow the value to be set to NaN.
    * **converters**(Map): Custom conversion function, only valid during the current mapping.
## map.setDefaultConverter(type:function, converter:function)
Set the global conversion function for the specified type
* **type**(function): The type of value to convert.
* **converter**(function): The conversion function.
> The function **setDefaultConverter**  will affect the global type conversion. If you want to use it locally, please set the **converters** option of the **map** function.
```ts
import "reflect-metadata";
import { mapping, map } from "auto-mapping";

map.setDefaultConverter(String, (val) => (val === undefined || val === null) ? '' : String(val));
map.setDefaultConverter(Number, (val) => isNaN(Number(val)) ? 0 : Number(val));

class Person {
    @mapping()
    public cityName: string;
    @mapping(() => "default")
    public intro: string;
    @mapping()
    public num: number;
}

console.log(map({}, Person));
```
```sh
# output
Person { name: '', desc: 'default', num: 0 }
```
***
# Array
Because the type of the array cannot be automatically derived, the type parameter must be specified at all times and the value must be an array.
```ts
import { mapping, map } from 'auto-mapping';

class ArrayTest {
    @mapping({ type: [Number] })
    numbers: number[];
}
const data={
    numbers:['1','2','3']
};
const result = map(data, ArrayTest);
console.log(result);
```
```sh
# output
ArrayTest { numbers: [ 1, 2, 3 ] }
```
If an property is declared as array, but the source value is not an array, the result is wrapped into an array.
```ts
import { mapping, map } from 'auto-mapping';

class ArrayTest {
    @mapping({ type: [Number], path:'number' })
    numbers: number[];
}
const data={
    number: '1'
};
console.log(map(data, ArrayTest));
```
```sh
# output
ArrayTest { numbers: [ 1 ] }
```
# Multiple Data Source
The default data source mapping config named **default**, you can set multiple configurations by **source** option to map multiple data sources.
```ts
import { mapping, map } from 'auto-mapping';

class Person {
    @mapping()
    @mapping({ source: 'other', path: 'person.name' })
    name: string;
}
const dataSource1 = {
    name: 'fisher'
};
const dataSource2 = {
    person: { name: 'jack' }
};
const result1 = map(dataSource1, Person);
const result2 = map(dataSource2, Person, { source: 'other' });

console.log(result1, result2);
```
```sh
# output
Person { name: 'fisher' } Person { name: 'jack' }
```
# Custom Conversion
The signature of the custom conversion function is as follows：
```ts
function(value: any, source: any, dest: any, options?: object){}
```
* value(any): The value which current path matched in the source object;
* source(any): The source object;
* dest(any): The instance of the dest class;
* options(object, optional): Mapping options;

Custom conversion function can be set by type parameter.
If you just pass a function to the annotation, like this **mapping(fn)**, then it is equivalent to **mapping({ type: fn })**.
```ts
import { mapping, map } from 'auto-mapping';

function trim(value: string) {
    return value && value.trim();
}

function fullName(_value: any, source: any) {
    return `${source.firstName} ${source.lastName}`;
}

function info(_value: any, _source: any, dest: Person) {
    return `I am ${dest.name} who come from ${dest.city}`;
}

class Person {
    age: number = 18;
    @mapping(fullName)
    name: string;
    @mapping({ type: trim, path: 'city.cityName' })
    city: string;
    @mapping(info)
    info: string;
}
const dataSource = {
    firstName: 'Lei',
    lastName: 'Lee',
    city: {
        cityId: 1,
        cityName: '    NEW YORK    '
    },
};
console.log(map(dataSource, Person));
```
```sh
# ouput
Person {
  age: 18,
  name: 'Lei Lee',
  city: 'NEW YORK',
  info: 'I am Lei Lee who come from NEW YORK.' 
}
```
# Extensions 
# [MAPPING](src:object, options?:object){...}
Do some processing before mapping.
```ts
import "reflect-metadata";
import { mapping, map, MAPPING } from "auto-mapping";

class Person {
    @mapping()
    public num: number = 1;
    @mapping()
    public name: string;
    [MAPPING](src: any, options: any) {
        src.name = "fisher";
    }
}
const result = map({ num: 10 }, Person);
console.log(result, result instanceof Person);
```
```sh
# output
Person { num: 100, name: 'fisher' } true
```
If the *MAPPING* function returns a value that is not undefined, it will be passed to the *map* method as a source object.

# [MAPPED](src:object, options?:object){...}
Sometimes you may need to do some extra finishing work, such as dynamically adding some properties, you can do this through the **MAPPED** symbol function.
```ts
import "reflect-metadata";
import { mapping, map, MAPPED } from "auto-mapping";

class Person {
    @mapping()
    public gender: boolean;
    @mapping()
    public num: number = 1;
    [MAPPED](src: any, options: any) {
        // set value manually
        this.gender = true;
        // override original value
        this.num = 100;
        // dynamic assignment
        Object.assign(this, { a: 1, b: 2 })
    }
}
const result = map({ num: 10 }, Person);
console.log(result, result instanceof Person);
```
```sh
# output
Person { num: 100, gender: true, a: 1, b: 2 } true
```
> :warning: Note that when using the *MAPPED* function, if the map result is null, then any property that accesses ***this*** will throw an error.

If the function returns a value that is not undefined, it will replace the map result value.
```ts
...
[MAPPED](src: any, options: any) {
    this.gender = true;
    this.num = 100;
    return Object.assign({}, this, { a: 1, b: 2 })
}
...
```
```sh
# output
{ num: 100, gender: true, a: 1, b: 2 } false
```
# Update Logs
## 1.2.1
* compatible for mini-programs.
## 1.2.0
* added mapping options *nullable*、*allowNaN*、*converters*;
* added new api *map.setDefaultConverter* to config global default type conversion;
## 1.1.0
* refacted module using *reflect-metadata*;
* added two extension methods *MAPPING* and *MAPPED*;
* marked the *after* method as a deprecated method and replaced with the *MAPPED* method.