!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;"undefined"!=typeof window?t=window:"undefined"!=typeof global?t=global:"undefined"!=typeof self&&(t=self),t.TB=e()}}(function(){var e,t,r;return function n(e,t,r){function i(s,f){if(!t[s]){if(!e[s]){var a=typeof require=="function"&&require;if(!f&&a)return a(s,!0);if(o)return o(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var c=t[s]={exports:{}};e[s][0].call(c.exports,function(t){var r=e[s][1][t];return i(r?r:t)},c,c.exports,n,e,t,r)}return t[s].exports}var o=typeof require=="function"&&require;for(var s=0;s<r.length;s++)i(r[s]);return i}({1:[function(e,t,r){/*
 * Ticketbase client
 * @license MIT
 */
var n={};n.setKey=function(e){n._key=e;return n};n.getKey=function(){if(n._key)return n._key;throw new Error("Ticketbase: No API key. use TB.setKey() first")};n.base="http://api.ticketbase.com/v1";n._request=e("then-request");n.request=function(e,t,r){var i;try{i=n.getKey()}catch(o){return Promise.reject(o)}var s={qs:{api_key:i},json:r};var f=n.base+t;return n._request(e,f,s).then(function(e){if(e.statusCode===0){var t=new Error("Ticketbase: CORS error: "+"this site is not allowed to access the Ticketbase API.");throw t}if(!/^2../.test(e.status)){var t=new Error("Ticketbase: "+e.headers.status);t.body=r(e.body,e.headers["content-type"]);t.statusCode=e.statusCode;t.headers=e.headers;throw t}function r(e,t){if(t==="application/json"){return JSON.parse(e.toString())}else{return e.toString()}}return e.getBody()})};var i=n.Scope=function o(){};n.event=function(){return new i};t.exports=n},{"then-request":3}],2:[function(e,t,r){var n=t.exports={};var i=[];var o=false;function s(){if(o){return}o=true;var e;var t=i.length;while(t){e=i;i=[];var r=-1;while(++r<t){e[r]()}t=i.length}o=false}n.nextTick=function(e){i.push(e);if(!o){setTimeout(s,0)}};n.title="browser";n.browser=true;n.env={};n.argv=[];n.version="";function f(){}n.on=f;n.addListener=f;n.once=f;n.off=f;n.removeListener=f;n.removeAllListeners=f;n.emit=f;n.binding=function(e){throw new Error("process.binding is not supported")};n.cwd=function(){return"/"};n.chdir=function(e){throw new Error("process.chdir is not supported")};n.umask=function(){return 0}},{}],3:[function(e,t,r){"use strict";var n=e("promise");var i=e("http-response-object");var o=e("./lib/handle-qs.js");t.exports=s;function s(e,t,r,s){var f=new n(function(n,f){var a=new window.XMLHttpRequest;if(typeof e!=="string"){throw new TypeError("The method must be a string.")}if(typeof t!=="string"){throw new TypeError("The URL/path must be a string.")}if(typeof r==="function"){s=r;r={}}if(r===null||r===undefined){r={}}if(typeof r!=="object"){throw new TypeError("Options must be an object (or null).")}if(typeof s!=="function"){s=undefined}e=e.toUpperCase();r.headers=r.headers||{};var u;var c=!!((u=/^([\w-]+:)?\/\/([^\/]+)/.exec(r.uri))&&u[2]!=window.location.host);if(!c)r.headers["X-Requested-With"]="XMLHttpRequest";if(r.qs){t=o(t,r.qs)}if(r.json){r.body=JSON.stringify(r.json);r.headers["content-type"]="application/json"}a.onreadystatechange=function(){if(a.readyState===4){var e={};a.getAllResponseHeaders().split("\r\n").forEach(function(t){var r=t.split(":");if(r.length>1){e[r[0].toLowerCase()]=r.slice(1).join(":").trim()}});n(new i(a.status,e,a.responseText))}};a.open(e,t,true);for(var p in r.headers){a.setRequestHeader(p.toLowerCase(),r.headers[p])}a.send(r.body?r.body:null)});f.getBody=function(){return f.then(function(e){return e.getBody()})};return f.nodeify(s)}},{"./lib/handle-qs.js":4,"http-response-object":5,promise:6}],4:[function(e,t,r){"use strict";var n=e("qs").parse;var i=e("qs").stringify;t.exports=o;function o(e,t){e=e.split("?");var r=e[0];var o=(e[1]||"").split("#")[0];var s=e[1]&&e[1].split("#").length>1?"#"+e[1].split("#")[1]:"";var f=n(o);for(var a in t){f[a]=t[a]}o=i(f);if(o!==""){o="?"+o}return r+o+s}},{qs:12}],5:[function(e,t,r){"use strict";t.exports=n;function n(e,t,r){if(typeof e!=="number"){throw new TypeError("statusCode must be a number but was "+typeof e)}if(t===null){throw new TypeError("headers cannot be null")}if(typeof t!=="object"){throw new TypeError("headers must be an object but was "+typeof t)}this.statusCode=e;this.headers={};for(var n in t){this.headers[n.toLowerCase()]=t[n]}this.body=r}n.prototype.getBody=function(e){if(this.statusCode>=300){var t=new Error("Server responded with status code "+this.statusCode+":\n"+this.body.toString());t.statusCode=this.statusCode;t.headers=this.headers;t.body=this.body;throw t}return e?this.body.toString(e):this.body}},{}],6:[function(e,t,r){"use strict";t.exports=e("./lib/core.js");e("./lib/done.js");e("./lib/es6-extensions.js");e("./lib/node-extensions.js")},{"./lib/core.js":7,"./lib/done.js":8,"./lib/es6-extensions.js":9,"./lib/node-extensions.js":10}],7:[function(e,t,r){"use strict";var n=e("asap");t.exports=i;function i(e){if(typeof this!=="object")throw new TypeError("Promises must be constructed via new");if(typeof e!=="function")throw new TypeError("not a function");var t=null;var r=null;var i=[];var f=this;this.then=function(e,t){return new f.constructor(function(r,n){a(new o(e,t,r,n))})};function a(e){if(t===null){i.push(e);return}n(function(){var n=t?e.onFulfilled:e.onRejected;if(n===null){(t?e.resolve:e.reject)(r);return}var i;try{i=n(r)}catch(o){e.reject(o);return}e.resolve(i)})}function u(e){try{if(e===f)throw new TypeError("A promise cannot be resolved with itself.");if(e&&(typeof e==="object"||typeof e==="function")){var n=e.then;if(typeof n==="function"){s(n.bind(e),u,c);return}}t=true;r=e;p()}catch(i){c(i)}}function c(e){t=false;r=e;p()}function p(){for(var e=0,t=i.length;e<t;e++)a(i[e]);i=null}s(e,u,c)}function o(e,t,r,n){this.onFulfilled=typeof e==="function"?e:null;this.onRejected=typeof t==="function"?t:null;this.resolve=r;this.reject=n}function s(e,t,r){var n=false;try{e(function(e){if(n)return;n=true;t(e)},function(e){if(n)return;n=true;r(e)})}catch(i){if(n)return;n=true;r(i)}}},{asap:11}],8:[function(e,t,r){"use strict";var n=e("./core.js");var i=e("asap");t.exports=n;n.prototype.done=function(e,t){var r=arguments.length?this.then.apply(this,arguments):this;r.then(null,function(e){i(function(){throw e})})}},{"./core.js":7,asap:11}],9:[function(e,t,r){"use strict";var n=e("./core.js");var i=e("asap");t.exports=n;function o(e){this.then=function(t){if(typeof t!=="function")return this;return new n(function(r,n){i(function(){try{r(t(e))}catch(i){n(i)}})})}}o.prototype=n.prototype;var s=new o(true);var f=new o(false);var a=new o(null);var u=new o(undefined);var c=new o(0);var p=new o("");n.resolve=function(e){if(e instanceof n)return e;if(e===null)return a;if(e===undefined)return u;if(e===true)return s;if(e===false)return f;if(e===0)return c;if(e==="")return p;if(typeof e==="object"||typeof e==="function"){try{var t=e.then;if(typeof t==="function"){return new n(t.bind(e))}}catch(r){return new n(function(e,t){t(r)})}}return new o(e)};n.all=function(e){var t=Array.prototype.slice.call(e);return new n(function(e,r){if(t.length===0)return e([]);var n=t.length;function i(o,s){try{if(s&&(typeof s==="object"||typeof s==="function")){var f=s.then;if(typeof f==="function"){f.call(s,function(e){i(o,e)},r);return}}t[o]=s;if(--n===0){e(t)}}catch(a){r(a)}}for(var o=0;o<t.length;o++){i(o,t[o])}})};n.reject=function(e){return new n(function(t,r){r(e)})};n.race=function(e){return new n(function(t,r){e.forEach(function(e){n.resolve(e).then(t,r)})})};n.prototype["catch"]=function(e){return this.then(null,e)}},{"./core.js":7,asap:11}],10:[function(e,t,r){"use strict";var n=e("./core.js");var i=e("asap");t.exports=n;n.denodeify=function(e,t){t=t||Infinity;return function(){var r=this;var i=Array.prototype.slice.call(arguments);return new n(function(n,o){while(i.length&&i.length>t){i.pop()}i.push(function(e,t){if(e)o(e);else n(t)});var s=e.apply(r,i);if(s&&(typeof s==="object"||typeof s==="function")&&typeof s.then==="function"){n(s)}})}};n.nodeify=function(e){return function(){var t=Array.prototype.slice.call(arguments);var r=typeof t[t.length-1]==="function"?t.pop():null;var o=this;try{return e.apply(this,arguments).nodeify(r,o)}catch(s){if(r===null||typeof r=="undefined"){return new n(function(e,t){t(s)})}else{i(function(){r.call(o,s)})}}}};n.prototype.nodeify=function(e,t){if(typeof e!="function")return this;this.then(function(r){i(function(){e.call(t,null,r)})},function(r){i(function(){e.call(t,r)})})}},{"./core.js":7,asap:11}],11:[function(e,t,r){(function(e){var r={task:void 0,next:null};var n=r;var i=false;var o=void 0;var s=false;function f(){while(r.next){r=r.next;var e=r.task;r.task=void 0;var t=r.domain;if(t){r.domain=void 0;t.enter()}try{e()}catch(n){if(s){if(t){t.exit()}setTimeout(f,0);if(t){t.enter()}throw n}else{setTimeout(function(){throw n},0)}}if(t){t.exit()}}i=false}if(typeof e!=="undefined"&&e.nextTick){s=true;o=function(){e.nextTick(f)}}else if(typeof setImmediate==="function"){if(typeof window!=="undefined"){o=setImmediate.bind(window,f)}else{o=function(){setImmediate(f)}}}else if(typeof MessageChannel!=="undefined"){var a=new MessageChannel;a.port1.onmessage=f;o=function(){a.port2.postMessage(0)}}else{o=function(){setTimeout(f,0)}}function u(t){n=n.next={task:t,domain:s&&e.domain,next:null};if(!i){i=true;o()}}t.exports=u}).call(this,e("_process"))},{_process:2}],12:[function(e,t,r){t.exports=e("./lib/")},{"./lib/":13}],13:[function(e,t,r){var n=e("./stringify");var i=e("./parse");var o={};t.exports={stringify:n,parse:i}},{"./parse":14,"./stringify":15}],14:[function(e,t,r){var n=e("./utils");var i={delimiter:"&",depth:5,arrayLimit:20,parameterLimit:1e3};i.parseValues=function(e,t){var r={};var i=e.split(t.delimiter,t.parameterLimit===Infinity?undefined:t.parameterLimit);for(var o=0,s=i.length;o<s;++o){var f=i[o];var a=f.indexOf("]=")===-1?f.indexOf("="):f.indexOf("]=")+1;if(a===-1){r[n.decode(f)]=""}else{var u=n.decode(f.slice(0,a));var c=n.decode(f.slice(a+1));if(!r.hasOwnProperty(u)){r[u]=c}else{r[u]=[].concat(r[u]).concat(c)}}}return r};i.parseObject=function(e,t,r){if(!e.length){return t}var n=e.shift();var o={};if(n==="[]"){o=[];o=o.concat(i.parseObject(e,t,r))}else{var s=n[0]==="["&&n[n.length-1]==="]"?n.slice(1,n.length-1):n;var f=parseInt(s,10);var a=""+f;if(!isNaN(f)&&n!==s&&a===s&&f>=0&&f<=r.arrayLimit){o=[];o[f]=i.parseObject(e,t,r)}else{o[s]=i.parseObject(e,t,r)}}return o};i.parseKeys=function(e,t,r){if(!e){return}var n=/^([^\[\]]*)/;var o=/(\[[^\[\]]*\])/g;var s=n.exec(e);if(Object.prototype.hasOwnProperty(s[1])){return}var f=[];if(s[1]){f.push(s[1])}var a=0;while((s=o.exec(e))!==null&&a<r.depth){++a;if(!Object.prototype.hasOwnProperty(s[1].replace(/\[|\]/g,""))){f.push(s[1])}}if(s){f.push("["+e.slice(s.index)+"]")}return i.parseObject(f,t,r)};t.exports=function(e,t){if(e===""||e===null||typeof e==="undefined"){return{}}t=t||{};t.delimiter=typeof t.delimiter==="string"||n.isRegExp(t.delimiter)?t.delimiter:i.delimiter;t.depth=typeof t.depth==="number"?t.depth:i.depth;t.arrayLimit=typeof t.arrayLimit==="number"?t.arrayLimit:i.arrayLimit;t.parameterLimit=typeof t.parameterLimit==="number"?t.parameterLimit:i.parameterLimit;var r=typeof e==="string"?i.parseValues(e,t):e;var o={};var s=Object.keys(r);for(var f=0,a=s.length;f<a;++f){var u=s[f];var c=i.parseKeys(u,r[u],t);o=n.merge(o,c)}return n.compact(o)}},{"./utils":16}],15:[function(e,t,r){var n=e("./utils");var i={delimiter:"&",indices:true};i.stringify=function(e,t,r){if(n.isBuffer(e)){e=e.toString()}else if(e instanceof Date){e=e.toISOString()}else if(e===null){e=""}if(typeof e==="string"||typeof e==="number"||typeof e==="boolean"){return[encodeURIComponent(t)+"="+encodeURIComponent(e)]}var o=[];if(typeof e==="undefined"){return o}var s=Object.keys(e);for(var f=0,a=s.length;f<a;++f){var u=s[f];if(!r.indices&&Array.isArray(e)){o=o.concat(i.stringify(e[u],t,r))}else{o=o.concat(i.stringify(e[u],t+"["+u+"]",r))}}return o};t.exports=function(e,t){t=t||{};var r=typeof t.delimiter==="undefined"?i.delimiter:t.delimiter;t.indices=typeof t.indices==="boolean"?t.indices:i.indices;var n=[];if(typeof e!=="object"||e===null){return""}var o=Object.keys(e);for(var s=0,f=o.length;s<f;++s){var a=o[s];n=n.concat(i.stringify(e[a],a,t))}return n.join(r)}},{"./utils":16}],16:[function(e,t,r){var n={};r.arrayToObject=function(e){var t={};for(var r=0,n=e.length;r<n;++r){if(typeof e[r]!=="undefined"){t[r]=e[r]}}return t};r.merge=function(e,t){if(!t){return e}if(typeof t!=="object"){if(Array.isArray(e)){e.push(t)}else{e[t]=true}return e}if(typeof e!=="object"){e=[e].concat(t);return e}if(Array.isArray(e)&&!Array.isArray(t)){e=r.arrayToObject(e)}var n=Object.keys(t);for(var i=0,o=n.length;i<o;++i){var s=n[i];var f=t[s];if(!e[s]){e[s]=f}else{e[s]=r.merge(e[s],f)}}return e};r.decode=function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(t){return e}};r.compact=function(e,t){if(typeof e!=="object"||e===null){return e}t=t||[];var n=t.indexOf(e);if(n!==-1){return t[n]}t.push(e);if(Array.isArray(e)){var i=[];for(var o=0,s=e.length;o<s;++o){if(typeof e[o]!=="undefined"){i.push(e[o])}}return i}var f=Object.keys(e);for(o=0,s=f.length;o<s;++o){var a=f[o];e[a]=r.compact(e[a],t)}return e};r.isRegExp=function(e){return Object.prototype.toString.call(e)==="[object RegExp]"};r.isBuffer=function(e){if(e===null||typeof e==="undefined"){return false}return!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))}},{}]},{},[1])(1)});