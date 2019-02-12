!function(e,r){for(var t in r)e[t]=r[t]}(exports,function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=6)}([,,function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.DEFAULT_PROPERTY_SOURCE="default",r.DEFAULT_PROPERTY_SEP=".",r.PROPERTIES_KEY=Symbol("PROPERTIES_KEY"),r.CURRENT_PATH="."},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.validAssign=function(e,r){for(var t in e=e||{},r)void 0!==r[t]&&(e[t]=r[t]);return e},r.pushByOrder=function(e,r,t){for(var n=0,o=e.length;n<o;n++){var i=e[n];if(t(r)<t(i))return void e.splice(n,0,r)}return e.push(r)}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(2),o=t(3),i=[String,Boolean,Number,Date],a=[function(e){return e&&String(e)},function(e){return Boolean(e)},function(e){return Number(e)},function(e){return e&&new Date(e)}];function u(e,r,t){if(null==e||"object"!=typeof e)return null;var i=new r;return function(e,r){var t=r&&r.source||n.DEFAULT_PROPERTY_SOURCE,i=e.prototype[n.PROPERTIES_KEY];if(!(i&&t in i))return console.warn("The type "+e.name+" has no mapping annotation declared."),[];var a=i[n.DEFAULT_PROPERTY_SOURCE];if(t!==n.DEFAULT_PROPERTY_SOURCE){if(!1===(r&&r.useDefaultSource)||!Array.isArray(a))return i[t];a=a.slice(),i[t].forEach(function(e){var r=a.findIndex(function(r){return e.name===r.name});~r&&a.splice(r,1),o.pushByOrder(a,e,function(e){return e.order})})}return a}(r,t).forEach(function(r){var n,o,a;try{var u=r.resolvePath(e);a=r.convert(u,e,i,t)}catch(e){console.error(e)}void 0!==a?Object.assign(i,((n={})[r.name]=a,n)):r.default&&Object.assign(i,((o={})[r.name]=r.default,o))}),i}r.getConverter=function(e){if("function"==typeof e){if(n.PROPERTIES_KEY in e.prototype)return function(r,t,n,o){return u(r,e,o)};var r=i.indexOf(e);return~r?a[r]:e}return function(e){return e}},r.map=u},,function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(7);r.mapping=n.mapping;var o=t(4);r.map=o.map},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(8),o=t(2),i=t(3);r.mapping=function(e){return function(r,t){if("function"!=typeof r){var a=e||{},u=n.Property.from(a,r,t);r[o.PROPERTIES_KEY]=r[o.PROPERTIES_KEY]||{},r[o.PROPERTIES_KEY][u.source]=r[o.PROPERTIES_KEY][u.source]||[],i.pushByOrder(r[o.PROPERTIES_KEY][u.source],u,function(e){return e.order})}else console.warn("Mapping static members is not allowed, it is a dangerous operation.")}}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(4),o=t(2),i=t(3),a=function(){function e(){this.separator=o.DEFAULT_PROPERTY_SEP,this.source=o.DEFAULT_PROPERTY_SOURCE,this.order=0}return e.from=function(r,t,n){r="function"==typeof r?{type:r}:r;var o=new e;if(o.name=n,i.validAssign(o,r),o.path=o.path||n,!o.type&&Reflect&&"getMetadata"in Reflect){var a=Reflect.getMetadata("design:type",t,n);o.type=a===Array?[]:a}return o.type?Array.isArray(o.type)&&0===o.type.length&&console.warn("The propery "+n+" missing type declaration and it will treated as any[]"):console.warn("The propery "+n+" missing 'type' option and it will be treated as any, you can import module 'reflect-metadata' to get types automatically"),o},e.prototype.resolvePath=function(e){if(e){if(this.path===o.CURRENT_PATH)return e;for(var r=this.path.split(this.separator),t=0,n=r.length;t<n;t++){var i=r[t],a=i.match(/^(.+)\[(\d)\]$/);if(a){var u=a[1],f=a[2];if(!(Array.isArray(e[u])&&e[u].length>f))break;e=e[u][f]}else{if(!(i in e))break;e=e[i]}}return t===n?e:void 0}},e.prototype.convert=function(e,r,t,o){if(Array.isArray(this.type)){if(void 0===e)return e;var i=n.getConverter(this.type[0]);e=(e=Array.isArray(e)?e:[e]).map(function(e){return i(e,r,t,o)})}else{e=n.getConverter(this.type)(e,r,t,o)}return e},e}();r.Property=a}]));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnN0YW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnZlcnRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fubm90YXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Byb3BlcnR5LnRzIl0sIm5hbWVzIjpbImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJleHBvcnRzIiwibW9kdWxlIiwiaSIsImwiLCJtb2R1bGVzIiwiY2FsbCIsIm0iLCJjIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJ0IiwibW9kZSIsIl9fZXNNb2R1bGUiLCJucyIsImNyZWF0ZSIsImtleSIsImJpbmQiLCJuIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiREVGQVVMVF9QUk9QRVJUWV9TT1VSQ0UiLCJERUZBVUxUX1BST1BFUlRZX1NFUCIsIlBST1BFUlRJRVNfS0VZIiwiQ1VSUkVOVF9QQVRIIiwidmFsaWRBc3NpZ24iLCJzb3VyY2UiLCJkZXN0IiwidW5kZWZpbmVkIiwicHVzaEJ5T3JkZXIiLCJhcnJheSIsIml0ZW0iLCJzZWxlY3RvciIsImluZGV4IiwibGVuZ3RoXzEiLCJsZW5ndGgiLCJlbGVtZW50Iiwic3BsaWNlIiwicHVzaCIsImNvbnN0YW50c18xIiwidXRpbHNfMSIsIlNZU1RFTV9UWVBFUyIsIlN0cmluZyIsIkJvb2xlYW4iLCJOdW1iZXIiLCJEYXRlIiwiU1lTVEVNX0NPTlZFUlRFUlMiLCJtYXAiLCJzcmMiLCJjb25zdHVjdG9yIiwib3B0aW9ucyIsImluc3RhbmNlIiwic291cmNlTmFtZSIsInByb3BlcnRpZXMiLCJjb25zb2xlIiwid2FybiIsImRlZmF1bHRQcm9wZXJ0aWVzIiwidXNlRGVmYXVsdFNvdXJjZSIsIkFycmF5IiwiaXNBcnJheSIsInNsaWNlIiwiZm9yRWFjaCIsImZpbmRJbmRleCIsIm9yZGVyIiwiZ2V0UHJvcGVydGllcyIsInJlc3VsdCIsInJlc29sdmVQYXRoIiwiY29udmVydCIsImVycm9yIiwiYXNzaWduIiwiX2EiLCJkZWZhdWx0IiwiX2IiLCJnZXRDb252ZXJ0ZXIiLCJ0eXBlIiwiX3NyYyIsIl9kZXN0IiwiaW5kZXhPZiIsImFubm90YXRpb25fMSIsIm1hcHBpbmciLCJjb252ZXJ0ZXJfMSIsInByb3BlcnR5XzEiLCJ0YXJnZXQiLCJvcHRzIiwiUHJvcGVydHkiLCJmcm9tIiwidGhpcyIsInNlcGFyYXRvciIsInBhdGgiLCJSZWZsZWN0IiwiZGVzaWduVHlwZSIsImdldE1ldGFkYXRhIiwicGF0aGVzIiwic3BsaXQiLCJtYXRjaGVzIiwibWF0Y2giLCJuYW1lXzEiLCJpbmRleF8xIiwiY29udmVydF8xIl0sIm1hcHBpbmdzIjoiNkRBQ0EsSUFBQUEsRUFBQSxHQUdBLFNBQUFDLEVBQUFDLEdBR0EsR0FBQUYsRUFBQUUsR0FDQSxPQUFBRixFQUFBRSxHQUFBQyxRQUdBLElBQUFDLEVBQUFKLEVBQUFFLEdBQUEsQ0FDQUcsRUFBQUgsRUFDQUksR0FBQSxFQUNBSCxRQUFBLElBVUEsT0FOQUksRUFBQUwsR0FBQU0sS0FBQUosRUFBQUQsUUFBQUMsSUFBQUQsUUFBQUYsR0FHQUcsRUFBQUUsR0FBQSxFQUdBRixFQUFBRCxRQTBEQSxPQXJEQUYsRUFBQVEsRUFBQUYsRUFHQU4sRUFBQVMsRUFBQVYsRUFHQUMsRUFBQVUsRUFBQSxTQUFBUixFQUFBUyxFQUFBQyxHQUNBWixFQUFBYSxFQUFBWCxFQUFBUyxJQUNBRyxPQUFBQyxlQUFBYixFQUFBUyxFQUFBLENBQTBDSyxZQUFBLEVBQUFDLElBQUFMLEtB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QyxJQUFJLFNBQUNoQixHQUFjLE9BQUFtRSxFQUFRbkUsRUFBTWlCLEVBQUtyQixFQUFNdUIsU0FDckQsQ0FFTDVDLEVBRGdCMEUsRUFBQVAsYUFBYWEsS0FBS1osS0FDMUJQLENBQVE3RCxFQUFPMEMsRUFBS3JCLEVBQU11QixHQUVwQyxPQUFPNUMsR0FFWDhFLEVBakVBLEdBQWFqRyxFQUFBaUciLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG4iLCJleHBvcnQgY29uc3QgREVGQVVMVF9QUk9QRVJUWV9TT1VSQ0UgPSAnZGVmYXVsdCc7XG5leHBvcnQgY29uc3QgREVGQVVMVF9QUk9QRVJUWV9TRVAgPSAnLic7XG5leHBvcnQgY29uc3QgUFJPUEVSVElFU19LRVkgPSBTeW1ib2woJ1BST1BFUlRJRVNfS0VZJyk7XG5leHBvcnQgY29uc3QgQ1VSUkVOVF9QQVRIID0gJy4nOyIsImV4cG9ydCBmdW5jdGlvbiB2YWxpZEFzc2lnbihzb3VyY2U6IGFueSwgZGVzdDogYW55KSB7XG4gICAgc291cmNlID0gc291cmNlIHx8IHt9O1xuICAgIGZvciAoY29uc3Qga2V5IGluIGRlc3QpIHtcbiAgICAgICAgaWYgKGRlc3Rba2V5XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzb3VyY2Vba2V5XSA9IGRlc3Rba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHVzaEJ5T3JkZXI8VD4oYXJyYXk6IFRbXSwgaXRlbTogVCwgc2VsZWN0b3I6IChpdGVtOiBUKSA9PiBhbnkpIHtcbiAgICBmb3IgKGxldCBpbmRleCA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2luZGV4XTtcbiAgICAgICAgaWYgKHNlbGVjdG9yKGl0ZW0pIDwgc2VsZWN0b3IoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIGFycmF5LnNwbGljZShpbmRleCwgMCwgaXRlbSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5LnB1c2goaXRlbSk7XG59XG4iLCJpbXBvcnQgeyBQcm9wZXJ0eVR5cGUsIElNYXBwaW5nT3B0aW9ucywgSUNvbnZlcnRlciB9IGZyb20gXCIuL2ludGVyZmFjZVwiO1xuaW1wb3J0IHsgREVGQVVMVF9QUk9QRVJUWV9TT1VSQ0UsIFBST1BFUlRJRVNfS0VZIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuL3Byb3BlcnR5XCI7XG5pbXBvcnQgeyBwdXNoQnlPcmRlciB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IFNZU1RFTV9UWVBFUzogQXJyYXk8UHJvcGVydHlUeXBlPGFueT4+ID0gW1N0cmluZywgQm9vbGVhbiwgTnVtYmVyLCBEYXRlXTtcblxuY29uc3QgU1lTVEVNX0NPTlZFUlRFUlM6IEFycmF5PElDb252ZXJ0ZXI8YW55Pj4gPSBbXG4gICh2YWx1ZSkgPT4gdmFsdWUgJiYgU3RyaW5nKHZhbHVlKSxcbiAgKHZhbHVlKSA9PiBCb29sZWFuKHZhbHVlKSxcbiAgKHZhbHVlKSA9PiBOdW1iZXIodmFsdWUpLFxuICAodmFsdWUpID0+IHZhbHVlICYmIG5ldyBEYXRlKHZhbHVlKSxcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb252ZXJ0ZXI8VD4odHlwZT86IFByb3BlcnR5VHlwZTxUPik6IElDb252ZXJ0ZXI8VD4ge1xuICBpZiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoUFJPUEVSVElFU19LRVkgaW4gdHlwZS5wcm90b3R5cGUpIHtcbiAgICAgIHJldHVybiAodmFsdWU6IGFueSwgX3NyYzogYW55LCBfZGVzdDogVCwgb3B0aW9ucz86IElNYXBwaW5nT3B0aW9ucykgPT4gbWFwKHZhbHVlLCB0eXBlIGFzIGFueSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gU1lTVEVNX1RZUEVTLmluZGV4T2YodHlwZSk7XG4gICAgICBpZiAofmluZGV4KSB7XG4gICAgICAgIHJldHVybiBTWVNURU1fQ09OVkVSVEVSU1tpbmRleF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHlwZSBhcyBhbnk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiAodmFsdWU6IGFueSkgPT4gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0UHJvcGVydGllczxUPihjb25zdHVjdG9yOiBhbnksIG9wdGlvbnM/OiBJTWFwcGluZ09wdGlvbnMpIHtcbiAgY29uc3Qgc291cmNlTmFtZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zb3VyY2UgfHwgREVGQVVMVF9QUk9QRVJUWV9TT1VSQ0U7XG4gIGNvbnN0IHByb3BlcnRpZXM6IFJlY29yZDxzdHJpbmcsIEFycmF5PFByb3BlcnR5PFQ+Pj4gPSBjb25zdHVjdG9yLnByb3RvdHlwZVtQUk9QRVJUSUVTX0tFWV07XG4gIGlmICghcHJvcGVydGllcyB8fCAhKHNvdXJjZU5hbWUgaW4gcHJvcGVydGllcykpIHtcbiAgICBjb25zb2xlLndhcm4oYFRoZSB0eXBlICR7Y29uc3R1Y3Rvci5uYW1lfSBoYXMgbm8gbWFwcGluZyBhbm5vdGF0aW9uIGRlY2xhcmVkLmApO1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBsZXQgZGVmYXVsdFByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzW0RFRkFVTFRfUFJPUEVSVFlfU09VUkNFXTtcbiAgaWYgKHNvdXJjZU5hbWUgIT09IERFRkFVTFRfUFJPUEVSVFlfU09VUkNFKSB7XG4gICAgY29uc3QgdXNlRGVmYXVsdFNvdXJjZSA9IChvcHRpb25zICYmIG9wdGlvbnMudXNlRGVmYXVsdFNvdXJjZSkgIT09IGZhbHNlO1xuICAgIGlmICh1c2VEZWZhdWx0U291cmNlICYmIEFycmF5LmlzQXJyYXkoZGVmYXVsdFByb3BlcnRpZXMpKSB7XG4gICAgICBkZWZhdWx0UHJvcGVydGllcyA9IGRlZmF1bHRQcm9wZXJ0aWVzLnNsaWNlKCk7XG4gICAgICBwcm9wZXJ0aWVzW3NvdXJjZU5hbWVdLmZvckVhY2gocCA9PiB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gZGVmYXVsdFByb3BlcnRpZXMuZmluZEluZGV4KG0gPT4gcC5uYW1lID09PSBtLm5hbWUpO1xuICAgICAgICB+aW5kZXggJiYgZGVmYXVsdFByb3BlcnRpZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgcHVzaEJ5T3JkZXIoZGVmYXVsdFByb3BlcnRpZXMsIHAsIHAgPT4gcC5vcmRlcik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHByb3BlcnRpZXNbc291cmNlTmFtZV07XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWZhdWx0UHJvcGVydGllcztcbn1cblxuLyoqXG4gKiBNYXAgYW4gb2JqZWN0IHRvIGFuIGluc3RhbmNlIG9mIHRoZSBzcGVjaWZpZWQgdHlwZS5cbiAqIEBwYXJhbSBzcmMgRGF0YSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIGNvbnN0dWN0b3IgVGhlIHR5cGUgb2YgaW5zdGFuY2UsIHRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBvZiB0aGUgY2xhc3MuXG4gKiBAcGFyYW0gb3B0aW9ucyBNYXBwaW5nIG9wdGlvbnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXA8VCBleHRlbmRzIG5ldyAoLi4uYXJnczogYW55W10pID0+IGFueT5cbiAgKHNyYzogYW55LCBjb25zdHVjdG9yOiBULCBvcHRpb25zPzogSU1hcHBpbmdPcHRpb25zKTogSW5zdGFuY2VUeXBlPFQ+IHwgbnVsbCB7XG4gIGlmIChzcmMgPT09IHVuZGVmaW5lZCB8fCBzcmMgPT09IG51bGwgfHwgdHlwZW9mIHNyYyAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBjb25zdCBpbnN0YW5jZSA9IG5ldyBjb25zdHVjdG9yKCk7XG4gIGNvbnN0IHByb3BlcnRpZXMgPSBnZXRQcm9wZXJ0aWVzKGNvbnN0dWN0b3IsIG9wdGlvbnMpO1xuICBwcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XG4gICAgbGV0IHJlc3VsdDtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdmFsdWUgPSBwcm9wZXJ0eS5yZXNvbHZlUGF0aChzcmMpO1xuICAgICAgcmVzdWx0ID0gcHJvcGVydHkuY29udmVydCh2YWx1ZSwgc3JjLCBpbnN0YW5jZSwgb3B0aW9ucyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH1cbiAgICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oaW5zdGFuY2UsIHsgW3Byb3BlcnR5Lm5hbWVdOiByZXN1bHQgfSk7XG4gICAgfSBlbHNlIGlmIChwcm9wZXJ0eS5kZWZhdWx0KSB7XG4gICAgICBPYmplY3QuYXNzaWduKGluc3RhbmNlLCB7IFtwcm9wZXJ0eS5uYW1lXTogcHJvcGVydHkuZGVmYXVsdCB9KTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gaW5zdGFuY2U7XG59XG4iLCJpbXBvcnQgeyBtYXBwaW5nIH0gZnJvbSAnLi9hbm5vdGF0aW9uJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJy4vY29udmVydGVyJztcblxuZXhwb3J0IHsgbWFwLCBtYXBwaW5nIH07IiwiaW1wb3J0IHsgSVByb3BlcnR5LCBJQ29udmVydGVyIH0gZnJvbSBcIi4vaW50ZXJmYWNlXCI7XG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCIuL3Byb3BlcnR5XCI7XG5pbXBvcnQgeyBQUk9QRVJUSUVTX0tFWSB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgcHVzaEJ5T3JkZXIgfSBmcm9tICcuL3V0aWxzJztcblxuLyoqXG4gKiBUaGUgcmVxdWlyZWQgYW5ub3RhdGlvbnMgZm9yIG9iamVjdCBtYXBwaW5nIHdoaWNoIGNhbiBvbmx5IGJlIHVzZWQgb24gaW5zdGFuY2UgcHJvcGVydGllcy5cbiAqIEBwYXJhbSBvcHRpb25zIG1hcHBpbmcgb3B0aW9uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gbWFwcGluZzxUID0gYW55PihvcHRpb25zPzogSVByb3BlcnR5PFQ+IHwgSUNvbnZlcnRlcjxUPikge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0OiBhbnksIG5hbWU6IHN0cmluZykge1xuICAgICAgICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdNYXBwaW5nIHN0YXRpYyBtZW1iZXJzIGlzIG5vdCBhbGxvd2VkLCBpdCBpcyBhIGRhbmdlcm91cyBvcGVyYXRpb24uJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb3B0czogSVByb3BlcnR5PFQ+ID0gb3B0aW9ucyB8fCB7fSBhcyBhbnk7XG4gICAgICAgIGNvbnN0IHByb3BlcnR5ID0gUHJvcGVydHkuZnJvbShvcHRzLCB0YXJnZXQsIG5hbWUpO1xuICAgICAgICB0YXJnZXRbUFJPUEVSVElFU19LRVldID0gdGFyZ2V0W1BST1BFUlRJRVNfS0VZXSB8fCB7fTtcbiAgICAgICAgdGFyZ2V0W1BST1BFUlRJRVNfS0VZXVtwcm9wZXJ0eS5zb3VyY2VdID0gdGFyZ2V0W1BST1BFUlRJRVNfS0VZXVtwcm9wZXJ0eS5zb3VyY2VdIHx8IFtdO1xuICAgICAgICBwdXNoQnlPcmRlcih0YXJnZXRbUFJPUEVSVElFU19LRVldW3Byb3BlcnR5LnNvdXJjZV0sIHByb3BlcnR5LCBpdGVtID0+IGl0ZW0ub3JkZXIpO1xuICAgIH07XG59XG4iLCJpbXBvcnQgeyBQcm9wZXJ0eVR5cGUsIElQcm9wZXJ0eSwgSU1hcHBpbmdPcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgZ2V0Q29udmVydGVyIH0gZnJvbSAnLi9jb252ZXJ0ZXInO1xuaW1wb3J0IHsgREVGQVVMVF9QUk9QRVJUWV9TT1VSQ0UsIERFRkFVTFRfUFJPUEVSVFlfU0VQLCBDVVJSRU5UX1BBVEggfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyB2YWxpZEFzc2lnbiB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgUHJvcGVydHk8VD4gaW1wbGVtZW50cyBJUHJvcGVydHk8VD4ge1xuICBwYXRoOiBzdHJpbmc7XG4gIHR5cGU6IFByb3BlcnR5VHlwZTxUPjtcbiAgc2VwYXJhdG9yOiBzdHJpbmcgPSBERUZBVUxUX1BST1BFUlRZX1NFUDtcbiAgc291cmNlOiBzdHJpbmcgPSBERUZBVUxUX1BST1BFUlRZX1NPVVJDRTtcbiAgZGVmYXVsdDogYW55O1xuICBvcmRlcjogbnVtYmVyID0gMDtcbiAgbmFtZTogc3RyaW5nO1xuXG4gIHN0YXRpYyBmcm9tPFQ+KG9wdGlvbnM6IElQcm9wZXJ0eTxUPiwgdGFyZ2V0OiBhbnksIG5hbWU6IHN0cmluZykge1xuICAgIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJyA/IHsgdHlwZTogb3B0aW9ucyB9IDogb3B0aW9ucztcbiAgICBjb25zdCBwcm9wZXJ0eSA9IG5ldyBQcm9wZXJ0eSgpO1xuICAgIHByb3BlcnR5Lm5hbWUgPSBuYW1lO1xuICAgIHZhbGlkQXNzaWduKHByb3BlcnR5LCBvcHRpb25zKTtcbiAgICBwcm9wZXJ0eS5wYXRoID0gcHJvcGVydHkucGF0aCB8fCBuYW1lO1xuICAgIGlmICghcHJvcGVydHkudHlwZSAmJiBSZWZsZWN0ICYmICdnZXRNZXRhZGF0YScgaW4gUmVmbGVjdCkge1xuICAgICAgY29uc3QgZGVzaWduVHlwZSA9IChSZWZsZWN0IGFzIGFueSkuZ2V0TWV0YWRhdGEoXCJkZXNpZ246dHlwZVwiLCB0YXJnZXQsIG5hbWUpO1xuICAgICAgcHJvcGVydHkudHlwZSA9IGRlc2lnblR5cGUgPT09IEFycmF5ID8gW10gOiBkZXNpZ25UeXBlO1xuICAgIH1cbiAgICBpZiAoIXByb3BlcnR5LnR5cGUpIHtcbiAgICAgIGNvbnNvbGUud2FybihgVGhlIHByb3BlcnkgJHtuYW1lfSBtaXNzaW5nICd0eXBlJyBvcHRpb24gYW5kIGl0IHdpbGwgYmUgdHJlYXRlZCBhcyBhbnksIGAgK1xuICAgICAgICBgeW91IGNhbiBpbXBvcnQgbW9kdWxlICdyZWZsZWN0LW1ldGFkYXRhJyB0byBnZXQgdHlwZXMgYXV0b21hdGljYWxseWApO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShwcm9wZXJ0eS50eXBlKSAmJiBwcm9wZXJ0eS50eXBlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc29sZS53YXJuKGBUaGUgcHJvcGVyeSAke25hbWV9IG1pc3NpbmcgdHlwZSBkZWNsYXJhdGlvbiBhbmQgaXQgd2lsbCB0cmVhdGVkIGFzIGFueVtdYCk7XG4gICAgfVxuICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgfVxuXG4gIHJlc29sdmVQYXRoKHNyYzogYW55KSB7XG4gICAgaWYgKCFzcmMpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgaWYgKHRoaXMucGF0aCA9PT0gQ1VSUkVOVF9QQVRIKSByZXR1cm4gc3JjO1xuICAgIGNvbnN0IHBhdGhlcyA9IHRoaXMucGF0aC5zcGxpdCh0aGlzLnNlcGFyYXRvcik7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwLCBsZW5ndGggPSBwYXRoZXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgcGF0aCA9IHBhdGhlc1tpbmRleF07XG4gICAgICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXiguKylcXFsoXFxkKVxcXSQvKTtcbiAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgIGNvbnN0IFssIG5hbWUsIGluZGV4XSA9IG1hdGNoZXM7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNyY1tuYW1lXSkgJiYgc3JjW25hbWVdLmxlbmd0aCA+IGluZGV4KSB7XG4gICAgICAgICAgc3JjID0gc3JjW25hbWVdW2luZGV4XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHBhdGggaW4gc3JjKSB7XG4gICAgICAgICAgc3JjID0gc3JjW3BhdGhdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbmRleCA9PT0gbGVuZ3RoID8gc3JjIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgY29udmVydCh2YWx1ZTogYW55LCBzcmM6IGFueSwgZGVzdDogVCwgb3B0aW9ucz86IElNYXBwaW5nT3B0aW9ucykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMudHlwZSkpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdmFsdWU7XG4gICAgICBjb25zdCBjb252ZXJ0ID0gZ2V0Q29udmVydGVyKHRoaXMudHlwZVswXSk7XG4gICAgICB2YWx1ZSA9IEFycmF5LmlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBbdmFsdWVdO1xuICAgICAgdmFsdWUgPSB2YWx1ZS5tYXAoKGl0ZW06IGFueSkgPT4gY29udmVydChpdGVtLCBzcmMsIGRlc3QsIG9wdGlvbnMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29udmVydCA9IGdldENvbnZlcnRlcih0aGlzLnR5cGUpO1xuICAgICAgdmFsdWUgPSBjb252ZXJ0KHZhbHVlLCBzcmMsIGRlc3QsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=