import{_ as Ce,d as Re,r as xe,o as Oe,c as ge,a as $e,w as Ae,b as M,F as Ne,e as _e}from"./index.50ebcd3c.js";var H={exports:{}},oe=function(e,t){return function(){for(var n=new Array(arguments.length),a=0;a<n.length;a++)n[a]=arguments[a];return e.apply(t,n)}},Pe=oe,w=Object.prototype.toString;function J(r){return Array.isArray(r)}function k(r){return typeof r=="undefined"}function Te(r){return r!==null&&!k(r)&&r.constructor!==null&&!k(r.constructor)&&typeof r.constructor.isBuffer=="function"&&r.constructor.isBuffer(r)}function ue(r){return w.call(r)==="[object ArrayBuffer]"}function Ue(r){return w.call(r)==="[object FormData]"}function je(r){var e;return typeof ArrayBuffer!="undefined"&&ArrayBuffer.isView?e=ArrayBuffer.isView(r):e=r&&r.buffer&&ue(r.buffer),e}function Be(r){return typeof r=="string"}function qe(r){return typeof r=="number"}function le(r){return r!==null&&typeof r=="object"}function N(r){if(w.call(r)!=="[object Object]")return!1;var e=Object.getPrototypeOf(r);return e===null||e===Object.prototype}function De(r){return w.call(r)==="[object Date]"}function Le(r){return w.call(r)==="[object File]"}function Fe(r){return w.call(r)==="[object Blob]"}function fe(r){return w.call(r)==="[object Function]"}function ke(r){return le(r)&&fe(r.pipe)}function Ie(r){return w.call(r)==="[object URLSearchParams]"}function Me(r){return r.trim?r.trim():r.replace(/^\s+|\s+$/g,"")}function He(){return typeof navigator!="undefined"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window!="undefined"&&typeof document!="undefined"}function z(r,e){if(!(r===null||typeof r=="undefined"))if(typeof r!="object"&&(r=[r]),J(r))for(var t=0,s=r.length;t<s;t++)e.call(null,r[t],t,r);else for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.call(null,r[n],n,r)}function I(){var r={};function e(n,a){N(r[a])&&N(n)?r[a]=I(r[a],n):N(n)?r[a]=I({},n):J(n)?r[a]=n.slice():r[a]=n}for(var t=0,s=arguments.length;t<s;t++)z(arguments[t],e);return r}function Je(r,e,t){return z(e,function(n,a){t&&typeof n=="function"?r[a]=Pe(n,t):r[a]=n}),r}function ze(r){return r.charCodeAt(0)===65279&&(r=r.slice(1)),r}var h={isArray:J,isArrayBuffer:ue,isBuffer:Te,isFormData:Ue,isArrayBufferView:je,isString:Be,isNumber:qe,isObject:le,isPlainObject:N,isUndefined:k,isDate:De,isFile:Le,isBlob:Fe,isFunction:fe,isStream:ke,isURLSearchParams:Ie,isStandardBrowserEnv:He,forEach:z,merge:I,extend:Je,trim:Me,stripBOM:ze},C=h;function Y(r){return encodeURIComponent(r).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var ce=function(e,t,s){if(!t)return e;var n;if(s)n=s(t);else if(C.isURLSearchParams(t))n=t.toString();else{var a=[];C.forEach(t,function(l,m){l===null||typeof l=="undefined"||(C.isArray(l)?m=m+"[]":l=[l],C.forEach(l,function(f){C.isDate(f)?f=f.toISOString():C.isObject(f)&&(f=JSON.stringify(f)),a.push(Y(m)+"="+Y(f))}))}),n=a.join("&")}if(n){var o=e.indexOf("#");o!==-1&&(e=e.slice(0,o)),e+=(e.indexOf("?")===-1?"?":"&")+n}return e},Ve=h;function P(){this.handlers=[]}P.prototype.use=function(e,t,s){return this.handlers.push({fulfilled:e,rejected:t,synchronous:s?s.synchronous:!1,runWhen:s?s.runWhen:null}),this.handlers.length-1};P.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)};P.prototype.forEach=function(e){Ve.forEach(this.handlers,function(s){s!==null&&e(s)})};var We=P,Xe=h,Ke=function(e,t){Xe.forEach(e,function(n,a){a!==t&&a.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[a])})},de=function(e,t,s,n,a){return e.config=t,s&&(e.code=s),e.request=n,e.response=a,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}},e},he={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},Ge=de,pe=function(e,t,s,n,a){var o=new Error(e);return Ge(o,t,s,n,a)},Ye=pe,Qe=function(e,t,s){var n=s.config.validateStatus;!s.status||!n||n(s.status)?e(s):t(Ye("Request failed with status code "+s.status,s.config,null,s.request,s))},$=h,Ze=$.isStandardBrowserEnv()?function(){return{write:function(t,s,n,a,o,u){var l=[];l.push(t+"="+encodeURIComponent(s)),$.isNumber(n)&&l.push("expires="+new Date(n).toGMTString()),$.isString(a)&&l.push("path="+a),$.isString(o)&&l.push("domain="+o),u===!0&&l.push("secure"),document.cookie=l.join("; ")},read:function(t){var s=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return s?decodeURIComponent(s[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),er=function(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)},rr=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e},tr=er,nr=rr,sr=function(e,t){return e&&!tr(t)?nr(e,t):t},q=h,ar=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],ir=function(e){var t={},s,n,a;return e&&q.forEach(e.split(`
`),function(u){if(a=u.indexOf(":"),s=q.trim(u.substr(0,a)).toLowerCase(),n=q.trim(u.substr(a+1)),s){if(t[s]&&ar.indexOf(s)>=0)return;s==="set-cookie"?t[s]=(t[s]?t[s]:[]).concat([n]):t[s]=t[s]?t[s]+", "+n:n}}),t},Q=h,or=Q.isStandardBrowserEnv()?function(){var e=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a"),s;function n(a){var o=a;return e&&(t.setAttribute("href",o),o=t.href),t.setAttribute("href",o),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:t.pathname.charAt(0)==="/"?t.pathname:"/"+t.pathname}}return s=n(window.location.href),function(o){var u=Q.isString(o)?n(o):o;return u.protocol===s.protocol&&u.host===s.host}}():function(){return function(){return!0}}();function V(r){this.message=r}V.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")};V.prototype.__CANCEL__=!0;var T=V,A=h,ur=Qe,lr=Ze,fr=ce,cr=sr,dr=ir,hr=or,D=pe,pr=he,mr=T,Z=function(e){return new Promise(function(s,n){var a=e.data,o=e.headers,u=e.responseType,l;function m(){e.cancelToken&&e.cancelToken.unsubscribe(l),e.signal&&e.signal.removeEventListener("abort",l)}A.isFormData(a)&&delete o["Content-Type"];var i=new XMLHttpRequest;if(e.auth){var f=e.auth.username||"",b=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.Authorization="Basic "+btoa(f+":"+b)}var d=cr(e.baseURL,e.url);i.open(e.method.toUpperCase(),fr(d,e.params,e.paramsSerializer),!0),i.timeout=e.timeout;function K(){if(!!i){var v="getAllResponseHeaders"in i?dr(i.getAllResponseHeaders()):null,S=!u||u==="text"||u==="json"?i.responseText:i.response,E={data:S,status:i.status,statusText:i.statusText,headers:v,config:e,request:i};ur(function(B){s(B),m()},function(B){n(B),m()},E),i=null}}if("onloadend"in i?i.onloadend=K:i.onreadystatechange=function(){!i||i.readyState!==4||i.status===0&&!(i.responseURL&&i.responseURL.indexOf("file:")===0)||setTimeout(K)},i.onabort=function(){!i||(n(D("Request aborted",e,"ECONNABORTED",i)),i=null)},i.onerror=function(){n(D("Network Error",e,null,i)),i=null},i.ontimeout=function(){var S=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",E=e.transitional||pr;e.timeoutErrorMessage&&(S=e.timeoutErrorMessage),n(D(S,e,E.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",i)),i=null},A.isStandardBrowserEnv()){var G=(e.withCredentials||hr(d))&&e.xsrfCookieName?lr.read(e.xsrfCookieName):void 0;G&&(o[e.xsrfHeaderName]=G)}"setRequestHeader"in i&&A.forEach(o,function(S,E){typeof a=="undefined"&&E.toLowerCase()==="content-type"?delete o[E]:i.setRequestHeader(E,S)}),A.isUndefined(e.withCredentials)||(i.withCredentials=!!e.withCredentials),u&&u!=="json"&&(i.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&i.addEventListener("progress",e.onDownloadProgress),typeof e.onUploadProgress=="function"&&i.upload&&i.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(l=function(v){!i||(n(!v||v&&v.type?new mr("canceled"):v),i.abort(),i=null)},e.cancelToken&&e.cancelToken.subscribe(l),e.signal&&(e.signal.aborted?l():e.signal.addEventListener("abort",l))),a||(a=null),i.send(a)})},c=h,ee=Ke,vr=de,br=he,yr={"Content-Type":"application/x-www-form-urlencoded"};function re(r,e){!c.isUndefined(r)&&c.isUndefined(r["Content-Type"])&&(r["Content-Type"]=e)}function wr(){var r;return(typeof XMLHttpRequest!="undefined"||typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]")&&(r=Z),r}function Er(r,e,t){if(c.isString(r))try{return(e||JSON.parse)(r),c.trim(r)}catch(s){if(s.name!=="SyntaxError")throw s}return(t||JSON.stringify)(r)}var U={transitional:br,adapter:wr(),transformRequest:[function(e,t){return ee(t,"Accept"),ee(t,"Content-Type"),c.isFormData(e)||c.isArrayBuffer(e)||c.isBuffer(e)||c.isStream(e)||c.isFile(e)||c.isBlob(e)?e:c.isArrayBufferView(e)?e.buffer:c.isURLSearchParams(e)?(re(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):c.isObject(e)||t&&t["Content-Type"]==="application/json"?(re(t,"application/json"),Er(e)):e}],transformResponse:[function(e){var t=this.transitional||U.transitional,s=t&&t.silentJSONParsing,n=t&&t.forcedJSONParsing,a=!s&&this.responseType==="json";if(a||n&&c.isString(e)&&e.length)try{return JSON.parse(e)}catch(o){if(a)throw o.name==="SyntaxError"?vr(o,this,"E_JSON_PARSE"):o}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};c.forEach(["delete","get","head"],function(e){U.headers[e]={}});c.forEach(["post","put","patch"],function(e){U.headers[e]=c.merge(yr)});var W=U,Sr=h,Cr=W,Rr=function(e,t,s){var n=this||Cr;return Sr.forEach(s,function(o){e=o.call(n,e,t)}),e},me=function(e){return!!(e&&e.__CANCEL__)},te=h,L=Rr,xr=me,Or=W,gr=T;function F(r){if(r.cancelToken&&r.cancelToken.throwIfRequested(),r.signal&&r.signal.aborted)throw new gr("canceled")}var $r=function(e){F(e),e.headers=e.headers||{},e.data=L.call(e,e.data,e.headers,e.transformRequest),e.headers=te.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),te.forEach(["delete","get","head","post","put","patch","common"],function(n){delete e.headers[n]});var t=e.adapter||Or.adapter;return t(e).then(function(n){return F(e),n.data=L.call(e,n.data,n.headers,e.transformResponse),n},function(n){return xr(n)||(F(e),n&&n.response&&(n.response.data=L.call(e,n.response.data,n.response.headers,e.transformResponse))),Promise.reject(n)})},p=h,ve=function(e,t){t=t||{};var s={};function n(i,f){return p.isPlainObject(i)&&p.isPlainObject(f)?p.merge(i,f):p.isPlainObject(f)?p.merge({},f):p.isArray(f)?f.slice():f}function a(i){if(p.isUndefined(t[i])){if(!p.isUndefined(e[i]))return n(void 0,e[i])}else return n(e[i],t[i])}function o(i){if(!p.isUndefined(t[i]))return n(void 0,t[i])}function u(i){if(p.isUndefined(t[i])){if(!p.isUndefined(e[i]))return n(void 0,e[i])}else return n(void 0,t[i])}function l(i){if(i in t)return n(e[i],t[i]);if(i in e)return n(void 0,e[i])}var m={url:o,method:o,data:o,baseURL:u,transformRequest:u,transformResponse:u,paramsSerializer:u,timeout:u,timeoutMessage:u,withCredentials:u,adapter:u,responseType:u,xsrfCookieName:u,xsrfHeaderName:u,onUploadProgress:u,onDownloadProgress:u,decompress:u,maxContentLength:u,maxBodyLength:u,transport:u,httpAgent:u,httpsAgent:u,cancelToken:u,socketPath:u,responseEncoding:u,validateStatus:l};return p.forEach(Object.keys(e).concat(Object.keys(t)),function(f){var b=m[f]||a,d=b(f);p.isUndefined(d)&&b!==l||(s[f]=d)}),s},be={version:"0.26.1"},Ar=be.version,X={};["object","boolean","number","function","string","symbol"].forEach(function(r,e){X[r]=function(s){return typeof s===r||"a"+(e<1?"n ":" ")+r}});var ne={};X.transitional=function(e,t,s){function n(a,o){return"[Axios v"+Ar+"] Transitional option '"+a+"'"+o+(s?". "+s:"")}return function(a,o,u){if(e===!1)throw new Error(n(o," has been removed"+(t?" in "+t:"")));return t&&!ne[o]&&(ne[o]=!0,console.warn(n(o," has been deprecated since v"+t+" and will be removed in the near future"))),e?e(a,o,u):!0}};function Nr(r,e,t){if(typeof r!="object")throw new TypeError("options must be an object");for(var s=Object.keys(r),n=s.length;n-- >0;){var a=s[n],o=e[a];if(o){var u=r[a],l=u===void 0||o(u,a,r);if(l!==!0)throw new TypeError("option "+a+" must be "+l);continue}if(t!==!0)throw Error("Unknown option "+a)}}var _r={assertOptions:Nr,validators:X},ye=h,Pr=ce,se=We,ae=$r,j=ve,we=_r,R=we.validators;function O(r){this.defaults=r,this.interceptors={request:new se,response:new se}}O.prototype.request=function(e,t){typeof e=="string"?(t=t||{},t.url=e):t=e||{},t=j(this.defaults,t),t.method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var s=t.transitional;s!==void 0&&we.assertOptions(s,{silentJSONParsing:R.transitional(R.boolean),forcedJSONParsing:R.transitional(R.boolean),clarifyTimeoutError:R.transitional(R.boolean)},!1);var n=[],a=!0;this.interceptors.request.forEach(function(d){typeof d.runWhen=="function"&&d.runWhen(t)===!1||(a=a&&d.synchronous,n.unshift(d.fulfilled,d.rejected))});var o=[];this.interceptors.response.forEach(function(d){o.push(d.fulfilled,d.rejected)});var u;if(!a){var l=[ae,void 0];for(Array.prototype.unshift.apply(l,n),l=l.concat(o),u=Promise.resolve(t);l.length;)u=u.then(l.shift(),l.shift());return u}for(var m=t;n.length;){var i=n.shift(),f=n.shift();try{m=i(m)}catch(b){f(b);break}}try{u=ae(m)}catch(b){return Promise.reject(b)}for(;o.length;)u=u.then(o.shift(),o.shift());return u};O.prototype.getUri=function(e){return e=j(this.defaults,e),Pr(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")};ye.forEach(["delete","get","head","options"],function(e){O.prototype[e]=function(t,s){return this.request(j(s||{},{method:e,url:t,data:(s||{}).data}))}});ye.forEach(["post","put","patch"],function(e){O.prototype[e]=function(t,s,n){return this.request(j(n||{},{method:e,url:t,data:s}))}});var Tr=O,Ur=T;function x(r){if(typeof r!="function")throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(n){e=n});var t=this;this.promise.then(function(s){if(!!t._listeners){var n,a=t._listeners.length;for(n=0;n<a;n++)t._listeners[n](s);t._listeners=null}}),this.promise.then=function(s){var n,a=new Promise(function(o){t.subscribe(o),n=o}).then(s);return a.cancel=function(){t.unsubscribe(n)},a},r(function(n){t.reason||(t.reason=new Ur(n),e(t.reason))})}x.prototype.throwIfRequested=function(){if(this.reason)throw this.reason};x.prototype.subscribe=function(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]};x.prototype.unsubscribe=function(e){if(!!this._listeners){var t=this._listeners.indexOf(e);t!==-1&&this._listeners.splice(t,1)}};x.source=function(){var e,t=new x(function(n){e=n});return{token:t,cancel:e}};var jr=x,Br=function(e){return function(s){return e.apply(null,s)}},qr=h,Dr=function(e){return qr.isObject(e)&&e.isAxiosError===!0},ie=h,Lr=oe,_=Tr,Fr=ve,kr=W;function Ee(r){var e=new _(r),t=Lr(_.prototype.request,e);return ie.extend(t,_.prototype,e),ie.extend(t,e),t.create=function(n){return Ee(Fr(r,n))},t}var y=Ee(kr);y.Axios=_;y.Cancel=T;y.CancelToken=jr;y.isCancel=me;y.VERSION=be.version;y.all=function(e){return Promise.all(e)};y.spread=Br;y.isAxiosError=Dr;H.exports=y;H.exports.default=y;var Ir=H.exports;const g=Ir.create();g.interceptors.request.use(r=>r,r=>{Promise.reject(r)});g.interceptors.response.use(async r=>{console.log(r)},r=>Promise.reject(r));const Mr=(r,e)=>g({url:"/api/auth/login",method:"post",data:{username:r,password:e}});var Hr=Object.freeze(Object.defineProperty({__proto__:null,login:Mr},Symbol.toStringTag,{value:"Module"}));const Jr=(r,e)=>g({url:"/api/auth/login",method:"post",data:{username:r,password:e}});var zr=Object.freeze(Object.defineProperty({__proto__:null,login:Jr},Symbol.toStringTag,{value:"Module"})),Vr=Object.assign({},Hr,zr);const Wr=Re({name:"RequestPage",setup(){return{requestRes:async()=>{let t=await g({url:"/api/xxx",method:"get"});console.log(t)},requestResAPI:async()=>{let t=await Vr.login("zhangsan","123456");console.log(t)}}}}),Xr=M("h2",null," \u8FD9\u91CC\u662Frequest\u8BF7\u6C42\u9875\u9762 ",-1),Kr=M("br",null,null,-1),Gr=_e("\u70B9\u51FB\u8DF3\u8F6C\u81F3\u9996\u9875");function Yr(r,e,t,s,n,a){const o=xe("router-link");return Oe(),ge(Ne,null,[Xr,Kr,$e(o,{to:"/"},{default:Ae(()=>[Gr]),_:1}),M("button",{onClick:e[0]||(e[0]=u=>r.requestRes())})],64)}var Zr=Ce(Wr,[["render",Yr]]);export{Zr as default};
