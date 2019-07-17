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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CURRENT_PATH = ".";
exports.DEFAULT_PROPERTY_SEP = ".";
exports.DEFAULT_PROPERTY_SOURCE = "default";
exports.PROPERTIES_KEY = Symbol("PROPERTIES_KEY");
exports.BEFORE_KEY = Symbol("BEFORE_KEY");
exports.AFTER_KEY = Symbol("AFTER_KEY");


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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(0);
var utils_1 = __webpack_require__(1);
var SYSTEM_CONVERTERS = new Map();
SYSTEM_CONVERTERS.set(String, function (value) { return utils_1.isValid(value) ? String(value) : value; });
SYSTEM_CONVERTERS.set(Boolean, function (value) { return utils_1.isNil(value) ? undefined : Boolean(value); });
SYSTEM_CONVERTERS.set(Number, function (value) { return utils_1.isNil(value) ? undefined : Number(value); });
SYSTEM_CONVERTERS.set(Date, function (value) { return utils_1.isValid(value) ? new Date(value) : value; });
function getConverter(type) {
    if (typeof type === "function") {
        if (type.prototype && constants_1.PROPERTIES_KEY in type.prototype) {
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
function getProperties(constuctor, options) {
    var sourceName = options && options.source || constants_1.DEFAULT_PROPERTY_SOURCE;
    var properties;
    properties = constuctor[constants_1.PROPERTIES_KEY] || constuctor.prototype[constants_1.PROPERTIES_KEY];
    if (!properties || !(sourceName in properties)) {
        return [];
    }
    var defaultProperties = properties[constants_1.DEFAULT_PROPERTY_SOURCE];
    if (sourceName !== constants_1.DEFAULT_PROPERTY_SOURCE) {
        var useDefaultSource = (options && options.useDefaultSource) !== false;
        if (useDefaultSource && Array.isArray(defaultProperties)) {
            defaultProperties = defaultProperties.slice();
            properties[sourceName].forEach(function (p) {
                var index = defaultProperties.findIndex(function (m) { return p.name === m.name; });
                if (index >= 0) {
                    defaultProperties.splice(index, 1);
                }
                utils_1.pushByOrder(defaultProperties, p, function (m) { return m.order; });
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
    var instance = null;
    if (!utils_1.isNil(src) && typeof src === "object") {
        instance = new constuctor();
        var properties = getProperties(constuctor, options);
        properties.forEach(function (property) {
            var _a, _b;
            var result;
            try {
                var value = property.resolvePath(src);
                result = property.convert(value, src, instance, options);
            }
            catch (error) {
                console.error(error);
            }
            if (utils_1.isValid(result)) {
                Object.assign(instance, (_a = {}, _a[property.name] = result, _a));
            }
            else if ("default" in property) {
                Object.assign(instance, (_b = {}, _b[property.name] = property.default, _b));
            }
        });
    }
    if (typeof constuctor.prototype[constants_1.AFTER_KEY] === "function") {
        var result = constuctor.prototype[constants_1.AFTER_KEY].call(instance, src, options);
        if (result !== undefined) {
            return result;
        }
    }
    return instance;
}
exports.map = map;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var decorator_1 = __webpack_require__(4);
exports.mapping = decorator_1.mapping;
var converter_1 = __webpack_require__(2);
exports.map = converter_1.map;
var constants_1 = __webpack_require__(0);
exports.after = constants_1.AFTER_KEY;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(0);
var property_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(1);
/**
 * The required annotations for object mapping which can only be used on instance properties.
 * @param options mapping options
 */
function mapping(options) {
    return function (target, name) {
        if (typeof target === "function" && constants_1.PROPERTIES_KEY in target.prototype) {
            var props_1 = target.prototype[constants_1.PROPERTIES_KEY];
            target[constants_1.PROPERTIES_KEY] = Object.keys(props_1)
                .reduce(function (result, key) {
                result[key] = props_1[key].slice();
                return result;
            }, {});
            return;
        }
        var opts = options || {};
        var property = property_1.Property.from(opts, target, name);
        var properties = target[constants_1.PROPERTIES_KEY] || {};
        properties[property.source] = properties[property.source] || [];
        utils_1.pushByOrder(properties[property.source], property, function (item) { return item.order; });
        target[constants_1.PROPERTIES_KEY] = properties;
    };
}
exports.mapping = mapping;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var secure_template_1 = __webpack_require__(6);
var constants_1 = __webpack_require__(0);
var converter_1 = __webpack_require__(2);
var utils_1 = __webpack_require__(1);
var Property = /** @class */ (function () {
    function Property() {
        this.source = constants_1.DEFAULT_PROPERTY_SOURCE;
        this.order = 0;
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
        if (!property.type && typeof Reflect === "object" && "getMetadata" in Reflect) {
            var designType = Reflect.getMetadata("design:type", target, name);
            property.type = designType === Array ? [] : designType;
        }
        return property;
    };
    Property.prototype.resolvePath = function (src) {
        if (this.path === constants_1.CURRENT_PATH) {
            return src;
        }
        else {
            return secure_template_1.resolve(this.path, src);
        }
    };
    Property.prototype.convert = function (value, src, dest, options) {
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
/* 6 */
/***/ (function(module, exports) {

module.exports = require("secure-template");

/***/ })
/******/ ])));
//# sourceMappingURL=index.js.map