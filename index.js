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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CURRENT_PATH = ".";
exports.DEFAULT_PROPERTY_SEP = ".";
exports.DEFAULT_SOURCE = Symbol("DEFAULT_PROPERTY_SOURCE");
exports.PROPERTIES_KEY = Symbol("PROPERTIES_KEY");
exports.MAPPING = Symbol("MAPPING_KEY");
exports.MAPPED = Symbol("MAPPED_KEY");
exports.DEFAULT_ORDER = 0;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function validAssign(source, dest) {
    source = source || {};
    for (var key in dest) {
        if (dest[key] !== undefined) {
            source[key] = dest[key];
        }
    }
    return source;
}
exports.validAssign = validAssign;
function pushByOrder(array, item, selector) {
    for (var index = 0, length_1 = array.length; index < length_1; index++) {
        var element = array[index];
        if (selector(item) < selector(element)) {
            array.splice(index, 0, item);
            return array;
        }
    }
    array.push(item);
    return array;
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var secure_template_1 = __webpack_require__(6);
var constants_1 = __webpack_require__(0);
var converter_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(1);
var Property = /** @class */ (function () {
    function Property() {
        this.order = constants_1.DEFAULT_ORDER;
        this.source = constants_1.DEFAULT_SOURCE;
    }
    Property.from = function (options, target, name) {
        options = typeof options === "function" ? { type: options } : options;
        var property = new Property();
        property.name = name;
        utils_1.validAssign(property, options);
        if (options.domain) {
            if (!options.path) {
                // The option domain will be ignored when used with path.
                property.path = [options.domain, name].join(constants_1.DEFAULT_PROPERTY_SEP);
            }
        }
        property.path = property.path || name;
        if (!property.type) {
            var designType = Reflect.getMetadata("design:type", target, name);
            property.type = designType === Array ? [] : designType;
        }
        return property;
    };
    Property.getProperties = function (prototype, options) {
        options = Object.assign({ source: constants_1.DEFAULT_SOURCE }, options);
        var source = options.source, useDefaultSource = options.useDefaultSource;
        var properties = Reflect.getMetadata(constants_1.PROPERTIES_KEY, prototype, source);
        properties = properties ? properties.slice() : [];
        if (source !== constants_1.DEFAULT_SOURCE && useDefaultSource) {
            var dfProperties = Property.getProperties(prototype);
            dfProperties.filter(function (p) { return !properties.some(function (x) { return x.name === p.name; }); })
                .forEach(function (p) { return utils_1.pushByOrder(properties, p, function (m) { return m.order; }); });
        }
        return properties;
    };
    Property.prototype.convert = function (src, dest, options) {
        var value = this.path === constants_1.CURRENT_PATH ? src : secure_template_1.resolve(this.path, src);
        if (Array.isArray(this.type)) {
            if (!utils_1.isValid(value)) {
                return value;
            }
            var convert_1 = converter_1.getConverter(this.type[0]);
            value = Array.isArray(value) ? value : [value];
            value = value.map(function (item) { return convert_1(item, src, dest, options); });
        }
        else {
            var convert = converter_1.getConverter(this.type);
            value = convert(value, src, dest, options);
        }
        return value;
    };
    return Property;
}());
exports.Property = Property;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(0);
var property_1 = __webpack_require__(2);
var utils_1 = __webpack_require__(1);
var SYSTEM_CONVERTERS = new Map([
    [String, function (value) { return utils_1.isValid(value) ? String(value) : value; }],
    [Boolean, function (value) { return utils_1.isNil(value) ? undefined : Boolean(value); }],
    [Number, function (value) { return utils_1.isNil(value) ? undefined : Number(value); }],
    [Date, function (value) { return utils_1.isValid(value) ? new Date(value) : value; }],
]);
function getConverter(type) {
    if (typeof type === "function") {
        if (type.prototype && Reflect.hasMetadata(constants_1.PROPERTIES_KEY, type.prototype)) {
            return function (value, src, dest, options) { return map(value, type, options); };
        }
        else {
            if (SYSTEM_CONVERTERS.has(type)) {
                return SYSTEM_CONVERTERS.get(type);
            }
            else {
                return type;
            }
        }
    }
    else {
        return function (value) { return value; };
    }
}
exports.getConverter = getConverter;
/**
 * Map an object to an instance of the specified type.
 * @param src Data source object.
 * @param constuctor The type of instance, the constructor function of the class.
 * @param options Mapping options.
 */
function map(src, constuctor, options) {
    var instance = null;
    options = Object.assign({ useDefaultSource: true }, options);
    if (typeof constuctor.prototype[constants_1.MAPPING] === "function") {
        var mappingResult = constuctor.prototype[constants_1.MAPPING](src, options);
        src = mappingResult === undefined ? src : mappingResult;
    }
    if (!utils_1.isNil(src) && typeof src === "object") {
        instance = new constuctor();
        var properties = property_1.Property.getProperties(constuctor.prototype, options);
        properties.forEach(function (property) {
            var result;
            try {
                result = property.convert(src, instance, options);
            }
            catch (error) {
                console.error(error);
            }
            var name = property.name, df = property.default;
            result = utils_1.isValid(result) ? result : df !== undefined ? df : instance[name];
            instance[name] = result;
        });
    }
    if (typeof constuctor.prototype[constants_1.MAPPED] === "function") {
        var result = constuctor.prototype[constants_1.MAPPED].call(instance, src, options);
        if (result !== undefined) {
            return result;
        }
    }
    return instance;
}
exports.map = map;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var decorator_1 = __webpack_require__(5);
exports.mapping = decorator_1.mapping;
var converter_1 = __webpack_require__(3);
exports.map = converter_1.map;
var constants_1 = __webpack_require__(0);
exports.MAPPED = constants_1.MAPPED;
exports.MAPPING = constants_1.MAPPING;
exports.after = constants_1.MAPPED;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(0);
var property_1 = __webpack_require__(2);
var utils_1 = __webpack_require__(1);
/**
 * The required annotations for object mapping which can only be used on instance properties.
 * @param options mapping options
 */
function mapping(options) {
    return function (target, name) {
        var opts = options || {};
        var property = property_1.Property.from(opts, target, name);
        var properties = property_1.Property.getProperties(target, { source: property.source });
        var index = properties.findIndex(function (p) { return p.name === property.name; });
        // tslint:disable-next-line
        ~index && properties.splice(index, 1);
        utils_1.pushByOrder(properties, property, function (item) { return item.order; });
        Reflect.defineMetadata(constants_1.PROPERTIES_KEY, true, target);
        Reflect.defineMetadata(constants_1.PROPERTIES_KEY, properties, target, property.source);
    };
}
exports.mapping = mapping;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("secure-template");

/***/ })
/******/ ])));
//# sourceMappingURL=index.js.map