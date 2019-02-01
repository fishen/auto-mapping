!function i(a,u,s){function c(t,e){if(!u[t]){if(!a[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(f)return f(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var o=u[t]={exports:{}};a[t][0].call(o.exports,function(e){return c(a[t][1][e]||e)},o,o.exports,i,a,u,s)}return u[t].exports}for(var f="function"==typeof require&&require,e=0;e<s.length;e++)c(s[e]);return c}({1:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i=e("./property"),a=e("./constants"),u=e("./utils");r.mapping=function(o){return function(e,t){if("function"!=typeof e){var r=o||{},n=i.Property.from(r,e,t);e[a.PROPERTIES_KEY]=e[a.PROPERTIES_KEY]||{},e[a.PROPERTIES_KEY][n.source]=e[a.PROPERTIES_KEY][n.source]||[],u.pushByOrder(e[a.PROPERTIES_KEY][n.source],n,function(e){return e.order})}else console.warn("Mapping static members is not allowed, it is a dangerous operation.")}}},{"./constants":2,"./property":5,"./utils":6}],2:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.DEFAULT_PROPERTY_SOURCE="default",r.DEFAULT_PROPERTY_SEP=".",r.PROPERTIES_KEY=Symbol("PROPERTIES_KEY")},{}],3:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("./constants"),i=[String,Boolean,Number,Date],a=[function(e){return e&&String(e)},function(e){return Boolean(e)},function(e){return Number(e)},function(e){return e&&new Date(e)}];function u(i,e,a){if(null==i||"object"!=typeof i)return null;var t=a&&a.source||n.DEFAULT_PROPERTY_SOURCE,u=new e,r=e.prototype[n.PROPERTIES_KEY];return r&&t in r?r[t].forEach(function(e){var t,r,n;try{var o=e.resolvePath(i);n=e.convert(o,i,u,a)}catch(e){console.error(e)}void 0!==n?Object.assign(u,((t={})[e.name]=n,t)):e.default&&Object.assign(u,((r={})[e.name]=e.default,r))}):console.warn("The type "+e.name+" has no mapping annotation declared."),u}r.getConverter=function(o){if("function"!=typeof o)return function(e){return e};if(n.PROPERTIES_KEY in o.prototype)return function(e,t,r,n){return u(e,o,n)};var e=i.indexOf(o);return~e?a[e]:o},r.map=u},{"./constants":2}],4:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("./annotation");r.mapping=n.mapping;var o=e("./converter");r.map=o.map},{"./annotation":1,"./converter":3}],5:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("./converter"),n=e("./constants"),u=e("./utils"),o=function(){function i(){this.separator=n.DEFAULT_PROPERTY_SEP,this.source=n.DEFAULT_PROPERTY_SOURCE,this.order=0}return i.from=function(e,t,r){e="function"==typeof e?{type:e}:e;var n=new i;if(n.name=r,u.validAssign(n,e),n.path=n.path||r,!n.type&&Reflect&&"getMetadata"in Reflect){var o=Reflect.getMetadata("design:type",t,r);n.type=o===Array?[]:o}return n.type?Array.isArray(n.type)&&0===n.type.length&&console.warn("The propery "+r+" missing type declaration and it will treated as any[]"):console.warn("The propery "+r+" missing 'type' option and it will be treated as any, you can import module 'reflect-metadata' to get types automatically"),n},i.prototype.resolvePath=function(e){if(e){for(var t=this.path.split(this.separator),r=0,n=t.length;r<n;r++){var o=t[r],i=o.match(/^(.+)\[(\d)\]$/);if(i){var a=i[1],u=i[2];if(!(Array.isArray(e[a])&&e[a].length>u))break;e=e[a][u]}else{if(!(o in e))break;e=e[o]}}return r===n?e:void 0}},i.prototype.convert=function(e,t,r,n){if(Array.isArray(this.type)){var o=a.getConverter(this.type[0]);e=(e=Array.isArray(e)?e:[e]).map(function(e){return o(e,t,r,n)})}else{e=a.getConverter(this.type)(e,t,r,n)}return e},i}();r.Property=o},{"./constants":2,"./converter":3,"./utils":6}],6:[function(e,t,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.validAssign=function(e,t){for(var r in e=e||{},t)void 0!==t[r]&&(e[r]=t[r]);return e},r.pushByOrder=function(e,t,r){for(var n=0,o=e.length;n<o;n++){var i=e[n];if(r(t)<r(i))return void e.splice(n,0,t)}return e.push(t)}},{}]},{},[4]);
//# sourceMappingURL=index.js.map
