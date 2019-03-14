!function(e,r){for(var t in r)e[t]=r[t]}(exports,function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=3)}([function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.CURRENT_PATH=".",r.DEFAULT_PROPERTY_SEP=".",r.DEFAULT_PROPERTY_SOURCE="default",r.PROPERTIES_KEY=Symbol("PROPERTIES_KEY")},function(e,r,t){"use strict";function n(e){return null==e}Object.defineProperty(r,"__esModule",{value:!0}),r.validAssign=function(e,r){for(var t in e=e||{},r)void 0!==r[t]&&(e[t]=r[t]);return e},r.pushByOrder=function(e,r,t){for(var n=0,o=e.length;n<o;n++){var i=e[n];if(t(r)<t(i))return void e.splice(n,0,r)}return e.push(r)},r.isNil=n,r.isValid=function(e){return!(n(e)||e!=e&&isNaN(e)||e instanceof Date&&isNaN(e.valueOf()))}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(0),o=t(1),i=[String,Boolean,Number,Date],u=[function(e){return o.isValid(e)?String(e):e},function(e){return o.isNil(e)?void 0:Boolean(e)},function(e){return o.isNil(e)?void 0:Number(e)},function(e){return o.isValid(e)?new Date(e):e}];function a(e,r,t){var i=new r;return null==e||"object"!=typeof e?null:(function(e,r){var t=r&&r.source||n.DEFAULT_PROPERTY_SOURCE,i=e.prototype[n.PROPERTIES_KEY];if(!(i&&t in i))return[];var u=i[n.DEFAULT_PROPERTY_SOURCE];if(t!==n.DEFAULT_PROPERTY_SOURCE){if(!1===(r&&r.useDefaultSource)||!Array.isArray(u))return i[t];u=u.slice(),i[t].forEach(function(e){var r=u.findIndex(function(r){return e.name===r.name});r>=0&&u.splice(r,1),o.pushByOrder(u,e,function(e){return e.order})})}return u}(r,t).forEach(function(r){var n,u,a;try{var f=r.resolvePath(e);a=r.convert(f,e,i,t)}catch(e){console.error(e)}o.isValid(a)?Object.assign(i,((n={})[r.name]=a,n)):"default"in r&&Object.assign(i,((u={})[r.name]=r.default,u))}),i)}r.getConverter=function(e){if("function"==typeof e){if(e.prototype&&n.PROPERTIES_KEY in e.prototype)return function(r,t,n,o){return a(r,e,o)};var r=i.indexOf(e);return r>=0?u[r]:e}return function(e){return e}},r.map=a},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(4);r.mapping=n.mapping;var o=t(2);r.map=o.map},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(0),o=t(5),i=t(1);r.mapping=function(e){return function(r,t){if("function"!=typeof r){var u=e||{},a=o.Property.from(u,r,t),f=r[n.PROPERTIES_KEY]||{};f[a.source]=f[a.source]||[],i.pushByOrder(f[a.source],a,function(e){return e.order}),r[n.PROPERTIES_KEY]=f}else console.warn("Mapping static members is not allowed, it is a dangerous operation.")}}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(6),o=t(0),i=t(2),u=t(1),a=function(){function e(){this.source=o.DEFAULT_PROPERTY_SOURCE,this.order=0}return e.from=function(r,t,n){r="function"==typeof r?{type:r}:r;var i=new e;if(i.name=n,u.validAssign(i,r),r.domain&&(r.path||(i.path=[r.domain,n].join(o.DEFAULT_PROPERTY_SEP))),i.path=i.path||n,!i.type&&"object"==typeof Reflect&&"getMetadata"in Reflect){var a=Reflect.getMetadata("design:type",t,n);i.type=a===Array?[]:a}return i},e.prototype.resolvePath=function(e){return this.path===o.CURRENT_PATH?e:n.resolve(this.path,e)},e.prototype.convert=function(e,r,t,n){if(Array.isArray(this.type)){if(!u.isValid(e))return e;var o=i.getConverter(this.type[0]);e=(e=Array.isArray(e)?e:[e]).map(function(e){return o(e,r,t,n)})}else{e=i.getConverter(this.type)(e,r,t,n)}return e},e}();r.Property=a},function(e,r){!function(e,r){for(var t in r)e[t]=r[t]}(r,function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r,t){"use strict";var n=this&&this.__read||function(e,r){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var n,o,i=t.call(e),u=[];try{for(;(void 0===r||r-- >0)&&!(n=i.next()).done;)u.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(t=i.return)&&t.call(i)}finally{if(o)throw o.error}}return u};function o(e,r){if("string"==typeof e&&r){for(var t=e.trim().split("."),o=0,i=t.length;o<i;o++){var u=t[o],a=u.match(/^([^\[]+)((\[(\d+)\])+)$/);if(a){var f=n(a,3),c=f[1],l=f[2];r=r[c];for(var s=/((?<=\[)(\d+)(?=\]))+/g,p=s.exec(l);null!=p;){var d=Number(p[0]);if(!(Array.isArray(r)&&d<r.length))return;r=r[d],p=s.exec(l)}}else{if(void 0===r[u])break;r=r[u]}}return o===i?r:void 0}}function i(e){return[void 0,null].indexOf(e)>=0||isNaN(e)&&e!=e?"":"string"==typeof e?e.trim():String(e)}function u(e,r){if("string"!=typeof e)throw new TypeError("The template must be a string.");for(var t=[],u=/({*)((?<={)\S+?(?!=\\)(?=}))(}*)/g,a=u.exec(e),f=function(){var f=n(a,4),c=f[0],l=f[1],s=f[2],p=f[3];1===l.length||1===p.length?t.push([a.index,c,function(e,t){var n=o(s,e),u=(t=t||r||i)(n);return l.replace("{","")+u+p.replace("}","")}]):t.push([a.index,c,function(){return l.replace("{{","{")+s+p.replace("}}","}")}]),a=u.exec(e)};null!=a;)f();return function(r,o){if(!r)return e;var i=e.split("");return t.sort(function(e,r){return r[0]-e[0]}).forEach(function(e){var t=n(e,3),u=t[0],a=t[1],f=(0,t[2])(r,o);i.splice(u,a.length,f)}),i.join("")}}Object.defineProperty(r,"__esModule",{value:!0}),r.resolve=o,r.defaultReplace=i,r.format=function(e,r,t){return u(e,t)(r)},r.compile=u}]))}]));
//# sourceMappingURL=index.js.map