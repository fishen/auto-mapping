(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CURRENT_PATH = ".";
exports.DEFAULT_PROPERTY_SEP = ".";
exports.DEFAULT_PROPERTY_SOURCE = "default";
exports.PROPERTIES_KEY = Symbol("PROPERTIES_KEY");


/***/ }),

/***/ "./src/converter.ts":
/*!**************************!*\
  !*** ./src/converter.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const SYSTEM_TYPES = [String, Boolean, Number, Date];
const SYSTEM_CONVERTERS = [
    (value) => utils_1.isValid(value) ? String(value) : value,
    (value) => utils_1.isNil(value) ? undefined : Boolean(value),
    (value) => utils_1.isNil(value) ? undefined : Number(value),
    (value) => utils_1.isValid(value) ? new Date(value) : value,
];
function getConverter(type) {
    if (typeof type === "function") {
        if (constants_1.PROPERTIES_KEY in type.prototype) {
            return (value, src, dest, options) => map(value, type, options);
        }
        else {
            const index = SYSTEM_TYPES.indexOf(type);
            if (index >= 0) {
                return SYSTEM_CONVERTERS[index];
            }
            else {
                return type;
            }
        }
    }
    else {
        return (value) => value;
    }
}
exports.getConverter = getConverter;
function getProperties(constuctor, options) {
    const sourceName = options && options.source || constants_1.DEFAULT_PROPERTY_SOURCE;
    const properties = constuctor.prototype[constants_1.PROPERTIES_KEY];
    if (!properties || !(sourceName in properties)) {
        return [];
    }
    let defaultProperties = properties[constants_1.DEFAULT_PROPERTY_SOURCE];
    if (sourceName !== constants_1.DEFAULT_PROPERTY_SOURCE) {
        const useDefaultSource = (options && options.useDefaultSource) !== false;
        if (useDefaultSource && Array.isArray(defaultProperties)) {
            defaultProperties = defaultProperties.slice();
            properties[sourceName].forEach((p) => {
                const index = defaultProperties.findIndex((m) => p.name === m.name);
                if (index >= 0) {
                    defaultProperties.splice(index, 1);
                }
                utils_1.pushByOrder(defaultProperties, p, (m) => m.order);
            });
        }
        else {
            return properties[sourceName];
        }
    }
    return defaultProperties;
}
/**
 * Map an object to an instance of the specified type.
 * @param src Data source object.
 * @param constuctor The type of instance, the constructor function of the class.
 * @param options Mapping options.
 */
function map(src, constuctor, options) {
    const instance = new constuctor();
    if (src === undefined || src === null || typeof src !== "object") {
        return null;
    }
    const properties = getProperties(constuctor, options);
    properties.forEach((property) => {
        let result;
        try {
            const value = property.resolvePath(src);
            result = property.convert(value, src, instance, options);
        }
        catch (error) {
            console.error(error);
        }
        if (utils_1.isValid(result)) {
            Object.assign(instance, { [property.name]: result });
        }
        else if ("default" in property) {
            Object.assign(instance, { [property.name]: property.default });
        }
    });
    return instance;
}
exports.map = map;


/***/ }),

/***/ "./src/decorator.ts":
/*!**************************!*\
  !*** ./src/decorator.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
const property_1 = __webpack_require__(/*! ./property */ "./src/property.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/**
 * The required annotations for object mapping which can only be used on instance properties.
 * @param options mapping options
 */
function mapping(options) {
    return function (target, name) {
        if (typeof target === "function") {
            console.warn("Mapping static members is not allowed, it is a dangerous operation.");
            return;
        }
        const opts = options || {};
        const property = property_1.Property.from(opts, target, name);
        const properties = target[constants_1.PROPERTIES_KEY] || {};
        properties[property.source] = properties[property.source] || [];
        utils_1.pushByOrder(properties[property.source], property, (item) => item.order);
        target[constants_1.PROPERTIES_KEY] = properties;
    };
}
exports.mapping = mapping;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var decorator_1 = __webpack_require__(/*! ./decorator */ "./src/decorator.ts");
exports.mapping = decorator_1.mapping;
var converter_1 = __webpack_require__(/*! ./converter */ "./src/converter.ts");
exports.map = converter_1.map;


/***/ }),

/***/ "./src/property.ts":
/*!*************************!*\
  !*** ./src/property.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
const converter_1 = __webpack_require__(/*! ./converter */ "./src/converter.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
class Property {
    constructor() {
        this.separator = constants_1.DEFAULT_PROPERTY_SEP;
        this.source = constants_1.DEFAULT_PROPERTY_SOURCE;
        this.order = 0;
    }
    static from(options, target, name) {
        options = typeof options === "function" ? { type: options } : options;
        const property = new Property();
        property.name = name;
        utils_1.validAssign(property, options);
        if (options.domain) {
            if (!options.path) {
                // The option domain will be ignored when used with path.
                property.path = [options.domain, name].join(property.separator);
            }
        }
        property.path = property.path || name;
        if (!property.type && typeof Reflect === "object" && "getMetadata" in Reflect) {
            const designType = Reflect.getMetadata("design:type", target, name);
            property.type = designType === Array ? [] : designType;
        }
        return property;
    }
    resolvePath(src) {
        if (!src) {
            return undefined;
        }
        else if (this.path === constants_1.CURRENT_PATH) {
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
                }
                else {
                    break;
                }
            }
            else {
                if (path in src) {
                    src = src[path];
                }
                else {
                    break;
                }
            }
        }
        return index === length ? src : undefined;
    }
    convert(value, src, dest, options) {
        if (Array.isArray(this.type)) {
            if (!utils_1.isValid(value)) {
                return value;
            }
            const convert = converter_1.getConverter(this.type[0]);
            value = Array.isArray(value) ? value : [value];
            value = value.map((item) => convert(item, src, dest, options));
        }
        else {
            const convert = converter_1.getConverter(this.type);
            value = convert(value, src, dest, options);
        }
        return value;
    }
}
exports.Property = Property;


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function validAssign(source, dest) {
    source = source || {};
    for (const key in dest) {
        if (dest[key] !== undefined) {
            source[key] = dest[key];
        }
    }
    return source;
}
exports.validAssign = validAssign;
function pushByOrder(array, item, selector) {
    for (let index = 0, length = array.length; index < length; index++) {
        const element = array[index];
        if (selector(item) < selector(element)) {
            array.splice(index, 0, item);
            return;
        }
    }
    return array.push(item);
}
exports.pushByOrder = pushByOrder;
function isNil(value) {
    return value === null || value === undefined;
}
exports.isNil = isNil;
function isValid(value) {
    if (isNil(value)) {
        return false;
    }
    else if (value !== value && isNaN(value)) {
        return false;
    }
    else if (value instanceof Date && isNaN(value.valueOf())) {
        return false;
    }
    else {
        return true;
    }
}
exports.isValid = isValid;


/***/ })

/******/ })));
//# sourceMappingURL=index.js.map