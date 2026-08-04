import{o as Ng,R as Cu}from"./vendor-x0RX-orb.js";const kg=()=>{};var Hl={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ld=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let s=r.charCodeAt(n);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Og=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const s=r[t++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const i=r[t++];e[n++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=r[t++],o=r[t++],u=r[t++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|u&63)-65536;e[n++]=String.fromCharCode(55296+(c>>10)),e[n++]=String.fromCharCode(56320+(c&1023))}else{const i=r[t++],o=r[t++];e[n++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Md={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<r.length;s+=3){const i=r[s],o=s+1<r.length,u=o?r[s+1]:0,c=s+2<r.length,h=c?r[s+2]:0,f=i>>2,p=(i&3)<<4|u>>4;let I=(u&15)<<2|h>>6,b=h&63;c||(b=64,o||(I=64)),n.push(t[f],t[p],t[I],t[b])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(Ld(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):Og(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<r.length;){const i=t[r.charAt(s++)],u=s<r.length?t[r.charAt(s)]:0;++s;const h=s<r.length?t[r.charAt(s)]:64;++s;const p=s<r.length?t[r.charAt(s)]:64;if(++s,i==null||u==null||h==null||p==null)throw new Lg;const I=i<<2|u>>4;if(n.push(I),h!==64){const b=u<<4&240|h>>2;if(n.push(b),p!==64){const C=h<<6&192|p;n.push(C)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Lg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Mg=function(r){const e=Ld(r);return Md.encodeByteArray(e,!0)},ho=function(r){return Mg(r).replace(/\./g,"")},Ud=function(r){try{return Md.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fd(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ug=()=>Fd().__FIREBASE_DEFAULTS__,Fg=()=>{if(typeof process>"u"||typeof Hl>"u")return;const r=Hl.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Bg=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&Ud(r[1]);return e&&JSON.parse(e)},Mo=()=>{try{return kg()||Ug()||Fg()||Bg()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Bd=r=>{var e,t;return(t=(e=Mo())==null?void 0:e.emulatorHosts)==null?void 0:t[r]},qg=r=>{const e=Bd(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},qd=()=>{var r;return(r=Mo())==null?void 0:r.config},$d=r=>{var e;return(e=Mo())==null?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jd{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $g(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",s=r.iat||0,i=r.sub||r.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${n}`,aud:n,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...r};return[ho(JSON.stringify(t)),ho(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function we(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function jg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(we())}function zd(){var e;const r=(e=Mo())==null?void 0:e.forceEnvironment;if(r==="node")return!0;if(r==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function zg(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Kg(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function Gg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Hg(){const r=we();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function Kd(){return!zd()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Gd(){return!zd()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function Hd(){try{return typeof indexedDB=="object"}catch{return!1}}function Wg(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(n);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var i;e(((i=s.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qg="FirebaseError";class Ot extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=Qg,Object.setPrototypeOf(this,Ot.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,si.prototype.create)}}class si{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?Yg(i,n):"Error",u=`${this.serviceName}: ${o} (${s}).`;return new Ot(s,u,n)}}function Yg(r,e){return r.replace(Jg,(t,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const Jg=/\{\$([^}]+)}/g;function Xg(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function $n(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const s of t){if(!n.includes(s))return!1;const i=r[s],o=e[s];if(Wl(i)&&Wl(o)){if(!$n(i,o))return!1}else if(i!==o)return!1}for(const s of n)if(!t.includes(s))return!1;return!0}function Wl(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ii(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function gs(r){const e={};return r.replace(/^\?/,"").split("&").forEach(n=>{if(n){const[s,i]=n.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function _s(r){const e=r.indexOf("?");if(!e)return"";const t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}function Zg(r,e){const t=new e_(r,e);return t.subscribe.bind(t)}class e_{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let s;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");t_(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:n},s.next===void 0&&(s.next=Ma),s.error===void 0&&(s.error=Ma),s.complete===void 0&&(s.complete=Ma);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function t_(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function Ma(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xe(r){return r&&r._delegate?r._delegate:r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oi(r){try{return(r.startsWith("http://")||r.startsWith("https://")?new URL(r).hostname:r).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Wd(r){return(await fetch(r,{credentials:"include"})).ok}class jn{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new jd;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),n=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(n)return null;throw s}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(s_(e))try{this.getOrInitializeService({instanceIdentifier:Pn})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});n.resolve(i)}catch{}}}}clearInstance(e=Pn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Pn){return this.instances.has(e)}getOptions(e=Pn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[i,o]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(i);n===u&&o.resolve(s)}return s}onInit(e,t){const n=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(n)??new Set;s.add(e),this.onInitCallbacks.set(n,s);const i=this.instances.get(n);return i&&e(i,n),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const s of n)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:r_(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Pn){return this.component?this.component.multipleInstances?e:Pn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function r_(r){return r===Pn?void 0:r}function s_(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i_{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new n_(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var J;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(J||(J={}));const o_={debug:J.DEBUG,verbose:J.VERBOSE,info:J.INFO,warn:J.WARN,error:J.ERROR,silent:J.SILENT},a_=J.INFO,u_={[J.DEBUG]:"log",[J.VERBOSE]:"log",[J.INFO]:"info",[J.WARN]:"warn",[J.ERROR]:"error"},c_=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),s=u_[e];if(s)console[s](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class xu{constructor(e){this.name=e,this._logLevel=a_,this._logHandler=c_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in J))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?o_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,J.DEBUG,...e),this._logHandler(this,J.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,J.VERBOSE,...e),this._logHandler(this,J.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,J.INFO,...e),this._logHandler(this,J.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,J.WARN,...e),this._logHandler(this,J.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,J.ERROR,...e),this._logHandler(this,J.ERROR,...e)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(h_(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function h_(r){const e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Qa="@firebase/app",Ql="0.15.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const St=new xu("@firebase/app"),d_="@firebase/app-compat",f_="@firebase/analytics-compat",p_="@firebase/analytics",m_="@firebase/app-check-compat",g_="@firebase/app-check",__="@firebase/auth",y_="@firebase/auth-compat",I_="@firebase/database",E_="@firebase/data-connect",T_="@firebase/database-compat",w_="@firebase/functions",v_="@firebase/functions-compat",A_="@firebase/installations",R_="@firebase/installations-compat",P_="@firebase/messaging",b_="@firebase/messaging-compat",S_="@firebase/performance",V_="@firebase/performance-compat",C_="@firebase/remote-config",x_="@firebase/remote-config-compat",D_="@firebase/storage",N_="@firebase/storage-compat",k_="@firebase/firestore",O_="@firebase/ai",L_="@firebase/firestore-compat",M_="firebase",U_="12.16.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ya="[DEFAULT]",F_={[Qa]:"fire-core",[d_]:"fire-core-compat",[p_]:"fire-analytics",[f_]:"fire-analytics-compat",[g_]:"fire-app-check",[m_]:"fire-app-check-compat",[__]:"fire-auth",[y_]:"fire-auth-compat",[I_]:"fire-rtdb",[E_]:"fire-data-connect",[T_]:"fire-rtdb-compat",[w_]:"fire-fn",[v_]:"fire-fn-compat",[A_]:"fire-iid",[R_]:"fire-iid-compat",[P_]:"fire-fcm",[b_]:"fire-fcm-compat",[S_]:"fire-perf",[V_]:"fire-perf-compat",[C_]:"fire-rc",[x_]:"fire-rc-compat",[D_]:"fire-gcs",[N_]:"fire-gcs-compat",[k_]:"fire-fst",[L_]:"fire-fst-compat",[O_]:"fire-vertex","fire-js":"fire-js",[M_]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Os=new Map,B_=new Map,Ja=new Map;function Yl(r,e){try{r.container.addComponent(e)}catch(t){St.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function Tr(r){const e=r.name;if(Ja.has(e))return St.debug(`There were multiple attempts to register component ${e}.`),!1;Ja.set(e,r);for(const t of Os.values())Yl(t,r);for(const t of B_.values())Yl(t,r);return!0}function Du(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function je(r){return r==null?!1:r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const q_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},rn=new si("app","Firebase",q_);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $_{constructor(e,t,n){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new jn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw rn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Br=U_;function j_(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n={name:Ya,automaticDataCollectionEnabled:!0,...e},s=n.name;if(typeof s!="string"||!s)throw rn.create("bad-app-name",{appName:String(s)});if(t||(t=qd()),!t)throw rn.create("no-options");const i=Os.get(s);if(i){if($n(t,i.options)&&$n(n,i.config))return i;throw rn.create("duplicate-app",{appName:s})}const o=new i_(s);for(const c of Ja.values())o.addComponent(c);const u=new $_(t,n,o);return Os.set(s,u),u}function Qd(r=Ya){const e=Os.get(r);if(!e&&r===Ya&&qd())return j_();if(!e)throw rn.create("no-app",{appName:r});return e}function OR(){return Array.from(Os.values())}function sn(r,e,t){let n=F_[r]??r;t&&(n+=`-${t}`);const s=n.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${n}" with version "${e}":`];s&&o.push(`library name "${n}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),St.warn(o.join(" "));return}Tr(new jn(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z_="firebase-heartbeat-database",K_=1,Ls="firebase-heartbeat-store";let Ua=null;function Yd(){return Ua||(Ua=Ng(z_,K_,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(Ls)}catch(t){console.warn(t)}}}}).catch(r=>{throw rn.create("idb-open",{originalErrorMessage:r.message})})),Ua}async function G_(r){try{const t=(await Yd()).transaction(Ls),n=await t.objectStore(Ls).get(Jd(r));return await t.done,n}catch(e){if(e instanceof Ot)St.warn(e.message);else{const t=rn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});St.warn(t.message)}}}async function Jl(r,e){try{const n=(await Yd()).transaction(Ls,"readwrite");await n.objectStore(Ls).put(e,Jd(r)),await n.done}catch(t){if(t instanceof Ot)St.warn(t.message);else{const n=rn.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});St.warn(n.message)}}}function Jd(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const H_=1024,W_=30;class Q_{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new J_(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Xl();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats.length>W_){const o=X_(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){St.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Xl(),{heartbeatsToSend:n,unsentEntries:s}=Y_(this._heartbeatsCache.heartbeats),i=ho(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return St.warn(t),""}}}function Xl(){return new Date().toISOString().substring(0,10)}function Y_(r,e=H_){const t=[];let n=r.slice();for(const s of r){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Zl(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Zl(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class J_{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Hd()?Wg().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await G_(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Jl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Jl(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function Zl(r){return ho(JSON.stringify({version:2,heartbeats:r})).length}function X_(r){if(r.length===0)return-1;let e=0,t=r[0].date;for(let n=1;n<r.length;n++)r[n].date<t&&(t=r[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z_(r){Tr(new jn("platform-logger",e=>new l_(e),"PRIVATE")),Tr(new jn("heartbeat",e=>new Q_(e),"PRIVATE")),sn(Qa,Ql,r),sn(Qa,Ql,"esm2020"),sn("fire-js","")}Z_("");var ey="firebase",ty="12.16.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */sn(ey,ty,"app");function Xd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ny=Xd,Zd=new si("auth","Firebase",Xd());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fo=new xu("@firebase/auth");function ry(r,...e){fo.logLevel<=J.WARN&&fo.warn(`Auth (${Br}): ${r}`,...e)}function Yi(r,...e){fo.logLevel<=J.ERROR&&fo.error(`Auth (${Br}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(r,...e){throw ku(r,...e)}function ht(r,...e){return ku(r,...e)}function Nu(r,e,t){const n={...ny(),[e]:t};return new si("auth","Firebase",n).create(e,{appName:r.name})}function yt(r){return Nu(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function sy(r,e,t){const n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&ot(r,"argument-error"),Nu(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function ku(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return Zd.create(r,...e)}function j(r,e,...t){if(!r)throw ku(e,...t)}function At(r){const e="INTERNAL ASSERTION FAILED: "+r;throw Yi(e),new Error(e)}function Vt(r,e){r||At(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xa(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.href)||""}function iy(){return eh()==="http:"||eh()==="https:"}function eh(){var r;return typeof self<"u"&&((r=self.location)==null?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oy(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(iy()||Kg()||"connection"in navigator)?navigator.onLine:!0}function ay(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ai{constructor(e,t){this.shortDelay=e,this.longDelay=t,Vt(t>e,"Short delay should be less than long delay!"),this.isMobile=jg()||Gg()}get(){return oy()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ou(r,e){Vt(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ef{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;At("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;At("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;At("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uy={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cy=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],ly=new ai(3e4,6e4);function gn(r,e){return r.tenantId&&!e.tenantId?{...e,tenantId:r.tenantId}:e}async function _n(r,e,t,n,s={}){return tf(r,s,async()=>{let i={},o={};n&&(e==="GET"?o=n:i={body:JSON.stringify(n)});const u=ii({...o,key:r.config.apiKey}).slice(1),c=await r._getAdditionalHeaders();c["Content-Type"]="application/json",r.languageCode&&(c["X-Firebase-Locale"]=r.languageCode);const h={method:e,headers:c,...i};return zg()||(h.referrerPolicy="strict-origin-when-cross-origin"),r.emulatorConfig&&oi(r.emulatorConfig.host)&&(h.credentials="include"),ef.fetch()(await nf(r,r.config.apiHost,t,u),h)})}async function tf(r,e,t){r._canInitEmulator=!1;const n={...uy,...e};try{const s=new dy(r),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Bi(r,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const u=i.ok?o.errorMessage:o.error.message,[c,h]=u.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Bi(r,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Bi(r,"email-already-in-use",o);if(c==="USER_DISABLED")throw Bi(r,"user-disabled",o);const f=n[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Nu(r,f,h);ot(r,f)}}catch(s){if(s instanceof Ot)throw s;ot(r,"network-request-failed",{message:String(s)})}}async function ui(r,e,t,n,s={}){const i=await _n(r,e,t,n,s);return"mfaPendingCredential"in i&&ot(r,"multi-factor-auth-required",{_serverResponse:i}),i}async function nf(r,e,t,n){const s=`${e}${t}?${n}`,i=r,o=i.config.emulator?Ou(r.config,s):`${r.config.apiScheme}://${s}`;return cy.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function hy(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class dy{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(ht(this.auth,"network-request-failed")),ly.get())})}}function Bi(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const s=ht(r,e,n);return s.customData._tokenResponse=t,s}function th(r){return r!==void 0&&r.enterprise!==void 0}class fy{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return hy(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function py(r,e){return _n(r,"GET","/v2/recaptchaConfig",gn(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function my(r,e){return _n(r,"POST","/v1/accounts:delete",e)}async function po(r,e){return _n(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vs(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function gy(r,e=!1){const t=Xe(r),n=await t.getIdToken(e),s=Lu(n);j(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:n,authTime:vs(Fa(s.auth_time)),issuedAtTime:vs(Fa(s.iat)),expirationTime:vs(Fa(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Fa(r){return Number(r)*1e3}function Lu(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return Yi("JWT malformed, contained fewer than 3 sections"),null;try{const s=Ud(t);return s?JSON.parse(s):(Yi("Failed to decode base64 JWT payload"),null)}catch(s){return Yi("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function nh(r){const e=Lu(r);return j(e,"internal-error"),j(typeof e.exp<"u","internal-error"),j(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ms(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof Ot&&_y(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function _y({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yy{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const n=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,n)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=vs(this.lastLoginAt),this.creationTime=vs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mo(r){var p;const e=r.auth,t=await r.getIdToken(),n=await Ms(r,po(e,{idToken:t}));j(n==null?void 0:n.users.length,e,"internal-error");const s=n.users[0];r._notifyReloadListener(s);const i=(p=s.providerUserInfo)!=null&&p.length?rf(s.providerUserInfo):[],o=Ey(r.providerData,i),u=r.isAnonymous,c=!(r.email&&s.passwordHash)&&!(o!=null&&o.length),h=u?c:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Za(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(r,f)}async function Iy(r){const e=Xe(r);await mo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Ey(r,e){return[...r.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function rf(r){return r.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ty(r,e){const t=await tf(r,{},async()=>{const n=ii({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=r.config,o=await nf(r,s,"/v1/token",`key=${i}`),u=await r._getAdditionalHeaders();u["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:u,body:n};return r.emulatorConfig&&oi(r.emulatorConfig.host)&&(c.credentials="include"),ef.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function wy(r,e){return _n(r,"POST","/v2/accounts:revokeToken",gn(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){j(e.idToken,"internal-error"),j(typeof e.idToken<"u","internal-error"),j(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):nh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){j(e.length!==0,"internal-error");const t=nh(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(j(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:s,expiresIn:i}=await Ty(e,t);this.updateTokensAndExpiration(n,s,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:s,expirationTime:i}=t,o=new _r;return n&&(j(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),s&&(j(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(j(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new _r,this.toJSON())}_performRefresh(){return At("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zt(r,e){j(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class lt{constructor({uid:e,auth:t,stsTokenManager:n,...s}){this.providerId="firebase",this.proactiveRefresh=new yy(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Za(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Ms(this,this.stsTokenManager.getToken(this.auth,e));return j(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return gy(this,e)}reload(){return Iy(this)}_assign(e){this!==e&&(j(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new lt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){j(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await mo(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(je(this.auth.app))return Promise.reject(yt(this.auth));const e=await this.getIdToken();return await Ms(this,my(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const n=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,u=t.tenantId??void 0,c=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:p,emailVerified:I,isAnonymous:b,providerData:C,stsTokenManager:L}=t;j(p&&L,e,"internal-error");const M=_r.fromJSON(this.name,L);j(typeof p=="string",e,"internal-error"),zt(n,e.name),zt(s,e.name),j(typeof I=="boolean",e,"internal-error"),j(typeof b=="boolean",e,"internal-error"),zt(i,e.name),zt(o,e.name),zt(u,e.name),zt(c,e.name),zt(h,e.name),zt(f,e.name);const z=new lt({uid:p,auth:e,email:s,emailVerified:I,displayName:n,isAnonymous:b,photoURL:o,phoneNumber:i,tenantId:u,stsTokenManager:M,createdAt:h,lastLoginAt:f});return C&&Array.isArray(C)&&(z.providerData=C.map(K=>({...K}))),c&&(z._redirectEventId=c),z}static async _fromIdTokenResponse(e,t,n=!1){const s=new _r;s.updateFromServerResponse(t);const i=new lt({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await mo(i),i}static async _fromGetAccountInfoResponse(e,t,n){const s=t.users[0];j(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?rf(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),u=new _r;u.updateFromIdToken(n);const c=new lt({uid:s.localId,auth:e,stsTokenManager:u,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Za(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,h),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rh=new Map;function Rt(r){Vt(r instanceof Function,"Expected a class definition");let e=rh.get(r);return e?(Vt(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,rh.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}sf.type="NONE";const sh=sf;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ji(r,e,t){return`firebase:${r}:${e}:${t}`}class yr{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:s,name:i}=this.auth;this.fullUserKey=Ji(this.userKey,s.apiKey,i),this.fullPersistenceKey=Ji("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await po(this.auth,{idToken:e}).catch(()=>{});return t?lt._fromGetAccountInfoResponse(this.auth,t,e):null}return lt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new yr(Rt(sh),e,n);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Rt(sh);const o=Ji(n,e.config.apiKey,e.name);let u=null;for(const h of t)try{const f=await h._get(o);if(f){let p;if(typeof f=="string"){const I=await po(e,{idToken:f}).catch(()=>{});if(!I)break;p=await lt._fromGetAccountInfoResponse(e,I,f)}else p=lt._fromJSON(e,f);h!==i&&(u=p),i=h;break}}catch{}const c=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new yr(i,e,n):(i=c[0],u&&await i._set(o,u.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new yr(i,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ih(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(cf(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(of(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(hf(e))return"Blackberry";if(df(e))return"Webos";if(af(e))return"Safari";if((e.includes("chrome/")||uf(e))&&!e.includes("edge/"))return"Chrome";if(lf(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function of(r=we()){return/firefox\//i.test(r)}function af(r=we()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function uf(r=we()){return/crios\//i.test(r)}function cf(r=we()){return/iemobile/i.test(r)}function lf(r=we()){return/android/i.test(r)}function hf(r=we()){return/blackberry/i.test(r)}function df(r=we()){return/webos/i.test(r)}function Mu(r=we()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function vy(r=we()){var e;return Mu(r)&&!!((e=window.navigator)!=null&&e.standalone)}function Ay(){return Hg()&&document.documentMode===10}function ff(r=we()){return Mu(r)||lf(r)||df(r)||hf(r)||/windows phone/i.test(r)||cf(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pf(r,e=[]){let t;switch(r){case"Browser":t=ih(we());break;case"Worker":t=`${ih(we())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Br}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ry{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=i=>new Promise((o,u)=>{try{const c=e(i);o(c)}catch(c){u(c)}});n.onAbort=t,this.queue.push(n);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Py(r,e={}){return _n(r,"GET","/v2/passwordPolicy",gn(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const by=6;class Sy{constructor(e){var n;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??by,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((n=e.allowedNonAlphanumericCharacters)==null?void 0:n.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let s=0;s<e.length;s++)n=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vy{constructor(e,t,n,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new oh(this),this.idTokenSubscription=new oh(this),this.beforeStateQueue=new Ry(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Zd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Rt(t)),this._initializationPromise=this.queue(async()=>{var n,s,i;if(!this._deleted&&(this.persistenceManager=await yr.create(this,e),(n=this._resolvePersistenceManagerAvailable)==null||n.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await po(this,{idToken:e}),n=await lt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(je(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(u,u))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let n=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,u=n==null?void 0:n._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===u)&&(c!=null&&c.user)&&(n=c.user,s=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(n)}catch(o){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return j(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await mo(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ay()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(je(this.app))return Promise.reject(yt(this));const t=e?Xe(e):null;return t&&j(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&j(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return je(this.app)?Promise.reject(yt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return je(this.app)?Promise.reject(yt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Rt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Py(this),t=new Sy(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new si("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await wy(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Rt(e)||this._popupRedirectResolver;j(t,this,"argument-error"),this.redirectPersistenceManager=await yr.create(this,[Rt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)==null?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(j(u,this,"internal-error"),u.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,n,s);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return j(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=pf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const n=await this._getAppCheckToken();return n&&(e["X-Firebase-AppCheck"]=n),e}async _getAppCheckToken(){var t;if(je(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&ry(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Lt(r){return Xe(r)}class oh{constructor(e){this.auth=e,this.observer=null,this.addObserver=Zg(t=>this.observer=t)}get next(){return j(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Uo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Cy(r){Uo=r}function mf(r){return Uo.loadJS(r)}function xy(){return Uo.recaptchaEnterpriseScript}function Dy(){return Uo.gapiScript}function Ny(r){return`__${r}${Math.floor(Math.random()*1e6)}`}class ky{constructor(){this.enterprise=new Oy}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Oy{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Ly="recaptcha-enterprise",gf="NO_RECAPTCHA",ah="onFirebaseAuthREInstanceReady";class Qt{constructor(e){this.type=Ly,this.auth=Lt(e)}async verify(e="verify",t=!1){async function n(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,u)=>{py(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{const h=new fy(c);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(c=>{u(c)})})}function s(i,o,u){const c=window.grecaptcha;th(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(gf)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new ky().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{n(this.auth).then(async u=>{if(!t&&th(window.grecaptcha)&&Qt.scriptInjectionDeferred)await Qt.scriptInjectionDeferred.promise,s(u,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=xy();c.length!==0&&(c+=u+`&onload=${ah}`),Qt.scriptInjectionDeferred=new jd,window[ah]=()=>{var h;(h=Qt.scriptInjectionDeferred)==null||h.resolve()},mf(c).then(()=>{var h;return(h=Qt.scriptInjectionDeferred)==null?void 0:h.promise}).then(()=>{s(u,i,o)}).catch(h=>{o(h)})}}).catch(u=>{o(u)})})}}Qt.scriptInjectionDeferred=null;async function uh(r,e,t,n=!1,s=!1){const i=new Qt(r);let o;if(s)o=gf;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const u={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in u){const c=u.phoneEnrollmentInfo.phoneNumber,h=u.phoneEnrollmentInfo.recaptchaToken;Object.assign(u,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in u){const c=u.phoneSignInInfo.recaptchaToken;Object.assign(u,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return u}return n?Object.assign(u,{captchaResp:o}):Object.assign(u,{captchaResponse:o}),Object.assign(u,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(u,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),u}async function eu(r,e,t,n,s){var i;if((i=r._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await uh(r,e,t,t==="getOobCode");return n(r,o)}else return n(r,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const u=await uh(r,e,t,t==="getOobCode");return n(r,u)}else return Promise.reject(o)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function My(r,e){const t=Du(r,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if($n(i,e??{}))return s;ot(s,"already-initialized")}return t.initialize({options:e})}function Uy(r,e){const t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(Rt);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}function Fy(r,e,t){const n=Lt(r);j(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const s=!1,i=_f(e),{host:o,port:u}=By(e),c=u===null?"":`:${u}`,h={url:`${i}//${o}${c}/`},f=Object.freeze({host:o,port:u,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!n._canInitEmulator){j(n.config.emulator&&n.emulatorConfig,n,"emulator-config-failed"),j($n(h,n.config.emulator)&&$n(f,n.emulatorConfig),n,"emulator-config-failed");return}n.config.emulator=h,n.emulatorConfig=f,n.settings.appVerificationDisabledForTesting=!0,oi(o)?Wd(`${i}//${o}${c}`):qy()}function _f(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function By(r){const e=_f(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(n);if(s){const i=s[1];return{host:i,port:ch(n.substr(i.length+1))}}else{const[i,o]=n.split(":");return{host:i,port:ch(o)}}}function ch(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function qy(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uu{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return At("not implemented")}_getIdTokenResponse(e){return At("not implemented")}_linkToIdToken(e,t){return At("not implemented")}_getReauthenticationResolver(e){return At("not implemented")}}async function $y(r,e){return _n(r,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jy(r,e){return ui(r,"POST","/v1/accounts:signInWithPassword",gn(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zy(r,e){return ui(r,"POST","/v1/accounts:signInWithEmailLink",gn(r,e))}async function Ky(r,e){return ui(r,"POST","/v1/accounts:signInWithEmailLink",gn(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Us extends Uu{constructor(e,t,n,s=null){super("password",n),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new Us(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Us(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return eu(e,t,"signInWithPassword",jy);case"emailLink":return zy(e,{email:this._email,oobCode:this._password});default:ot(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return eu(e,n,"signUpPassword",$y);case"emailLink":return Ky(e,{idToken:t,email:this._email,oobCode:this._password});default:ot(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ir(r,e){return ui(r,"POST","/v1/accounts:signInWithIdp",gn(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gy="http://localhost";class zn extends Uu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new zn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ot("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s,...i}=t;if(!n||!s)return null;const o=new zn(n,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Ir(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,Ir(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ir(e,t)}buildRequest(){const e={requestUri:Gy,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ii(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hy(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Wy(r){const e=gs(_s(r)).link,t=e?gs(_s(e)).deep_link_id:null,n=gs(_s(r)).deep_link_id;return(n?gs(_s(n)).link:null)||n||t||e||r}class Fu{constructor(e){const t=gs(_s(e)),n=t.apiKey??null,s=t.oobCode??null,i=Hy(t.mode??null);j(n&&s&&i,"argument-error"),this.apiKey=n,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=Wy(e);try{return new Fu(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qr{constructor(){this.providerId=qr.PROVIDER_ID}static credential(e,t){return Us._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=Fu.parseLink(t);return j(n,"argument-error"),Us._fromEmailAndCode(e,n.code,n.tenantId)}}qr.PROVIDER_ID="password";qr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";qr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bu{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci extends Bu{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt extends ci{constructor(){super("facebook.com")}static credential(e){return zn._fromParams({providerId:Yt.PROVIDER_ID,signInMethod:Yt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Yt.credentialFromTaggedObject(e)}static credentialFromError(e){return Yt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Yt.credential(e.oauthAccessToken)}catch{return null}}}Yt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Yt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt extends ci{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return zn._fromParams({providerId:Jt.PROVIDER_ID,signInMethod:Jt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Jt.credentialFromTaggedObject(e)}static credentialFromError(e){return Jt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return Jt.credential(t,n)}catch{return null}}}Jt.GOOGLE_SIGN_IN_METHOD="google.com";Jt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt extends ci{constructor(){super("github.com")}static credential(e){return zn._fromParams({providerId:Xt.PROVIDER_ID,signInMethod:Xt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Xt.credentialFromTaggedObject(e)}static credentialFromError(e){return Xt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Xt.credential(e.oauthAccessToken)}catch{return null}}}Xt.GITHUB_SIGN_IN_METHOD="github.com";Xt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt extends ci{constructor(){super("twitter.com")}static credential(e,t){return zn._fromParams({providerId:Zt.PROVIDER_ID,signInMethod:Zt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Zt.credentialFromTaggedObject(e)}static credentialFromError(e){return Zt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Zt.credential(t,n)}catch{return null}}}Zt.TWITTER_SIGN_IN_METHOD="twitter.com";Zt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yf(r,e){return ui(r,"POST","/v1/accounts:signUp",gn(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,s=!1){const i=await lt._fromIdTokenResponse(e,n,s),o=lh(n);return new Ct({user:i,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const s=lh(n);return new Ct({user:e,providerId:s,_tokenResponse:n,operationType:t})}}function lh(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function LR(r){var s;if(je(r.app))return Promise.reject(yt(r));const e=Lt(r);if(await e._initializationPromise,(s=e.currentUser)!=null&&s.isAnonymous)return new Ct({user:e.currentUser,providerId:null,operationType:"signIn"});const t=await yf(e,{returnSecureToken:!0}),n=await Ct._fromIdTokenResponse(e,"signIn",t,!0);return await e._updateCurrentUser(n.user),n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go extends Ot{constructor(e,t,n,s){super(t.code,t.message),this.operationType=n,this.user=s,Object.setPrototypeOf(this,go.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,s){return new go(e,t,n,s)}}function If(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?go._fromErrorAndOperation(r,i,e,n):i})}async function Qy(r,e,t=!1){const n=await Ms(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return Ct._forOperation(r,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Yy(r,e,t=!1){const{auth:n}=r;if(je(n.app))return Promise.reject(yt(n));const s="reauthenticate";try{const i=await Ms(r,If(n,s,e,r),t);j(i.idToken,n,"internal-error");const o=Lu(i.idToken);j(o,n,"internal-error");const{sub:u}=o;return j(r.uid===u,n,"user-mismatch"),Ct._forOperation(r,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&ot(n,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ef(r,e,t=!1){if(je(r.app))return Promise.reject(yt(r));const n="signIn",s=await If(r,n,e),i=await Ct._fromIdTokenResponse(r,n,s);return t||await r._updateCurrentUser(i.user),i}async function Jy(r,e){return Ef(Lt(r),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Tf(r){const e=Lt(r);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function MR(r,e,t){if(je(r.app))return Promise.reject(yt(r));const n=Lt(r),o=await eu(n,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",yf).catch(c=>{throw c.code==="auth/password-does-not-meet-requirements"&&Tf(r),c}),u=await Ct._fromIdTokenResponse(n,"signIn",o);return await n._updateCurrentUser(u.user),u}function UR(r,e,t){return je(r.app)?Promise.reject(yt(r)):Jy(Xe(r),qr.credential(e,t)).catch(async n=>{throw n.code==="auth/password-does-not-meet-requirements"&&Tf(r),n})}function Xy(r,e,t,n){return Xe(r).onIdTokenChanged(e,t,n)}function Zy(r,e,t){return Xe(r).beforeAuthStateChanged(e,t)}function FR(r,e,t,n){return Xe(r).onAuthStateChanged(e,t,n)}function BR(r){return Xe(r).signOut()}const _o="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(_o,"1"),this.storage.removeItem(_o),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eI=1e3,tI=10;class vf extends wf{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ff(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),s=this.localCache[t];n!==s&&e(t,s,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,u,c)=>{this.notifyListeners(o,c)});return}const n=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},i=this.storage.getItem(n);Ay()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,tI):s()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},eI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}vf.type="LOCAL";const nI=vf;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Af extends wf{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Af.type="SESSION";const Rf=Af;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rI(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const n=new Fo(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const u=Array.from(o).map(async h=>h(t.origin,i)),c=await rI(u);t.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Fo.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qu(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((u,c)=>{const h=qu("",20);s.port1.start();const f=setTimeout(()=>{c(new Error("unsupported_event"))},n);o={messageChannel:s,onMessage(p){const I=p;if(I.data.eventId===h)switch(I.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),u(I.data.response);break;default:clearTimeout(f),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function It(){return window}function iI(r){It().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pf(){return typeof It().WorkerGlobalScope<"u"&&typeof It().importScripts=="function"}async function oI(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function aI(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)==null?void 0:r.controller)||null}function uI(){return Pf()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bf="firebaseLocalStorageDb",cI=1,yo="firebaseLocalStorage",Sf="fbase_key";class li{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Bo(r,e){return r.transaction([yo],e?"readwrite":"readonly").objectStore(yo)}function lI(){const r=indexedDB.deleteDatabase(bf);return new li(r).toPromise()}function Vf(){const r=indexedDB.open(bf,cI);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(yo,{keyPath:Sf})}catch(s){t(s)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(yo)?e(n):(n.close(),await lI(),e(await Vf()))})})}async function hh(r,e,t){const n=Bo(r,!0).put({[Sf]:e,value:t});return new li(n).toPromise()}async function hI(r,e){const t=Bo(r,!1).get(e),n=await new li(t).toPromise();return n===void 0?null:n.value}function dh(r,e){const t=Bo(r,!0).delete(e);return new li(t).toPromise()}const dI=800,fI=3;class Cf{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=Vf(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>fI)throw n;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return Pf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Fo._getInstance(uI()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,n;if(this.activeServiceWorker=await oI(),!this.activeServiceWorker)return;this.sender=new sI(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(n=e[0])!=null&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||aI()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await hh(e,_o,"1"),await dh(e,_o)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>hh(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>hI(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>dh(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Bo(s,!1).getAll();return new li(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),dI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Cf.type="LOCAL";const pI=Cf;new ai(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xf(r,e){return e?Rt(e):(j(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u extends Uu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ir(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ir(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ir(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function mI(r){return Ef(r.auth,new $u(r),r.bypassAuthState)}function gI(r){const{auth:e,user:t}=r;return j(t,e,"internal-error"),Yy(t,new $u(r),r.bypassAuthState)}async function _I(r){const{auth:e,user:t}=r;return j(t,e,"internal-error"),Qy(t,new $u(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Df{constructor(e,t,n,s,i=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:s,tenantId:i,error:o,type:u}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return mI;case"linkViaPopup":case"linkViaRedirect":return _I;case"reauthViaPopup":case"reauthViaRedirect":return gI;default:ot(this.auth,"internal-error")}}resolve(e){Vt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Vt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yI=new ai(2e3,1e4);async function qR(r,e,t){if(je(r.app))return Promise.reject(ht(r,"operation-not-supported-in-this-environment"));const n=Lt(r);sy(r,e,Bu);const s=xf(n,t);return new Nn(n,"signInViaPopup",e,s).executeNotNull()}class Nn extends Df{constructor(e,t,n,s,i){super(e,t,s,i),this.provider=n,this.authWindow=null,this.pollId=null,Nn.currentPopupAction&&Nn.currentPopupAction.cancel(),Nn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return j(e,this.auth,"internal-error"),e}async onExecution(){Vt(this.filter.length===1,"Popup operations only handle one event");const e=qu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ht(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(ht(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Nn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if((n=(t=this.authWindow)==null?void 0:t.window)!=null&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ht(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,yI.get())};e()}}Nn.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const II="pendingRedirect",Xi=new Map;class EI extends Df{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=Xi.get(this.auth._key());if(!e){try{const n=await TI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}Xi.set(this.auth._key(),e)}return this.bypassAuthState||Xi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function TI(r,e){const t=AI(e),n=vI(r);if(!await n._isAvailable())return!1;const s=await n._get(t)==="true";return await n._remove(t),s}function wI(r,e){Xi.set(r._key(),e)}function vI(r){return Rt(r._redirectPersistence)}function AI(r){return Ji(II,r.config.apiKey,r.name)}async function RI(r,e,t=!1){if(je(r.app))return Promise.reject(yt(r));const n=Lt(r),s=xf(n,e),o=await new EI(n,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PI=10*60*1e3;class bI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!SI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!Nf(e)){const s=((n=e.error.code)==null?void 0:n.split("auth/")[1])||"internal-error";t.onError(ht(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=PI&&this.cachedEventUids.clear(),this.cachedEventUids.has(fh(e))}saveEventToCache(e){this.cachedEventUids.add(fh(e)),this.lastProcessedEventTime=Date.now()}}function fh(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function Nf({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function SI(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Nf(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function VI(r,e={}){return _n(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,xI=/^https?/;async function DI(r){if(r.config.emulator)return;const{authorizedDomains:e}=await VI(r);for(const t of e)try{if(NI(t))return}catch{}ot(r,"unauthorized-domain")}function NI(r){const e=Xa(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!xI.test(t))return!1;if(CI.test(r))return n===r;const s=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kI=new ai(3e4,6e4);function ph(){const r=It().___jsl;if(r!=null&&r.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function OI(r){return new Promise((e,t)=>{var s,i,o;function n(){ph(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ph(),t(ht(r,"network-request-failed"))},timeout:kI.get()})}if((i=(s=It().gapi)==null?void 0:s.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=It().gapi)!=null&&o.load)n();else{const u=Ny("iframefcb");return It()[u]=()=>{gapi.load?n():t(ht(r,"network-request-failed"))},mf(`${Dy()}?onload=${u}`).catch(c=>t(c))}}).catch(e=>{throw Zi=null,e})}let Zi=null;function LI(r){return Zi=Zi||OI(r),Zi}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MI=new ai(5e3,15e3),UI="__/auth/iframe",FI="emulator/auth/iframe",BI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},qI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function $I(r){const e=r.config;j(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?Ou(e,FI):`https://${r.config.authDomain}/${UI}`,n={apiKey:e.apiKey,appName:r.name,v:Br},s=qI.get(r.config.apiHost);s&&(n.eid=s);const i=r._getFrameworks();return i.length&&(n.fw=i.join(",")),`${t}?${ii(n).slice(1)}`}async function jI(r){const e=await LI(r),t=It().gapi;return j(t,r,"internal-error"),e.open({where:document.body,url:$I(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:BI,dontclear:!0},n=>new Promise(async(s,i)=>{await n.restyle({setHideOnLeave:!1});const o=ht(r,"network-request-failed"),u=It().setTimeout(()=>{i(o)},MI.get());function c(){It().clearTimeout(u),s(n)}n.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},KI=500,GI=600,HI="_blank",WI="http://localhost";class mh{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function QI(r,e,t,n=KI,s=GI){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let u="";const c={...zI,width:n.toString(),height:s.toString(),top:i,left:o},h=we().toLowerCase();t&&(u=uf(h)?HI:t),of(h)&&(e=e||WI,c.scrollbars="yes");const f=Object.entries(c).reduce((I,[b,C])=>`${I}${b}=${C},`,"");if(vy(h)&&u!=="_self")return YI(e||"",u),new mh(null);const p=window.open(e||"",u,f);j(p,r,"popup-blocked");try{p.focus()}catch{}return new mh(p)}function YI(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JI="__/auth/handler",XI="emulator/auth/handler",ZI=encodeURIComponent("fac");async function gh(r,e,t,n,s,i){j(r.config.authDomain,r,"auth-domain-config-required"),j(r.config.apiKey,r,"invalid-api-key");const o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:Br,eventId:s};if(e instanceof Bu){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",Xg(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof ci){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}r.tenantId&&(o.tid=r.tenantId);const u=o;for(const f of Object.keys(u))u[f]===void 0&&delete u[f];const c=await r._getAppCheckToken(),h=c?`#${ZI}=${encodeURIComponent(c)}`:"";return`${eE(r)}?${ii(u).slice(1)}${h}`}function eE({config:r}){return r.emulator?Ou(r,XI):`https://${r.authDomain}/${JI}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ba="webStorageSupport";class tE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Rf,this._completeRedirectFn=RI,this._overrideRedirectResult=wI}async _openPopup(e,t,n,s){var o;Vt((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await gh(e,t,n,Xa(),s);return QI(e,i,qu())}async _openRedirect(e,t,n,s){await this._originValidation(e);const i=await gh(e,t,n,Xa(),s);return iI(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Vt(i,"If manager is not set, promise should be"),i)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await jI(e),n=new bI(e);return t.register("authEvent",s=>(j(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ba,{type:Ba},s=>{var o;const i=(o=s==null?void 0:s[0])==null?void 0:o[Ba];i!==void 0&&t(!!i),ot(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=DI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ff()||af()||Mu()}}const nE=tE;var _h="@firebase/auth",yh="1.13.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){j(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sE(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function iE(r){Tr(new jn("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:u}=n.options;j(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});const c={apiKey:o,authDomain:u,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:pf(r)},h=new Vy(n,s,i,c);return Uy(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Tr(new jn("auth-internal",e=>{const t=Lt(e.getProvider("auth").getImmediate());return(n=>new rE(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),sn(_h,yh,sE(r)),sn(_h,yh,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oE=5*60,aE=$d("authIdTokenMaxAge")||oE;let Ih=null;const uE=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>aE)return;const s=t==null?void 0:t.token;Ih!==s&&(Ih=s,await fetch(r,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function $R(r=Qd()){const e=Du(r,"auth");if(e.isInitialized())return e.getImmediate();const t=My(r,{popupRedirectResolver:nE,persistence:[pI,nI,Rf]}),n=$d("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(n,location.origin);if(location.origin===i.origin){const o=uE(i.toString());Zy(t,o,()=>o(t.currentUser)),Xy(t,u=>o(u))}}const s=Bd("auth");return s&&Fy(t,`http://${s}`),t}function cE(){var r;return((r=document.getElementsByTagName("head"))==null?void 0:r[0])??document}Cy({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=s=>{const i=ht("internal-error");i.customData=s,t(i)},n.type="text/javascript",n.charset="UTF-8",cE().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});iE("Browser");var Eh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var on,kf;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(T,g){function y(){}y.prototype=g.prototype,T.F=g.prototype,T.prototype=new y,T.prototype.constructor=T,T.D=function(v,w,P){for(var _=Array(arguments.length-2),$e=2;$e<arguments.length;$e++)_[$e-2]=arguments[$e];return g.prototype[w].apply(v,_)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(n,t),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(T,g,y){y||(y=0);const v=Array(16);if(typeof g=="string")for(var w=0;w<16;++w)v[w]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(w=0;w<16;++w)v[w]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=T.g[0],y=T.g[1],w=T.g[2];let P=T.g[3],_;_=g+(P^y&(w^P))+v[0]+3614090360&4294967295,g=y+(_<<7&4294967295|_>>>25),_=P+(w^g&(y^w))+v[1]+3905402710&4294967295,P=g+(_<<12&4294967295|_>>>20),_=w+(y^P&(g^y))+v[2]+606105819&4294967295,w=P+(_<<17&4294967295|_>>>15),_=y+(g^w&(P^g))+v[3]+3250441966&4294967295,y=w+(_<<22&4294967295|_>>>10),_=g+(P^y&(w^P))+v[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=P+(w^g&(y^w))+v[5]+1200080426&4294967295,P=g+(_<<12&4294967295|_>>>20),_=w+(y^P&(g^y))+v[6]+2821735955&4294967295,w=P+(_<<17&4294967295|_>>>15),_=y+(g^w&(P^g))+v[7]+4249261313&4294967295,y=w+(_<<22&4294967295|_>>>10),_=g+(P^y&(w^P))+v[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=P+(w^g&(y^w))+v[9]+2336552879&4294967295,P=g+(_<<12&4294967295|_>>>20),_=w+(y^P&(g^y))+v[10]+4294925233&4294967295,w=P+(_<<17&4294967295|_>>>15),_=y+(g^w&(P^g))+v[11]+2304563134&4294967295,y=w+(_<<22&4294967295|_>>>10),_=g+(P^y&(w^P))+v[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=P+(w^g&(y^w))+v[13]+4254626195&4294967295,P=g+(_<<12&4294967295|_>>>20),_=w+(y^P&(g^y))+v[14]+2792965006&4294967295,w=P+(_<<17&4294967295|_>>>15),_=y+(g^w&(P^g))+v[15]+1236535329&4294967295,y=w+(_<<22&4294967295|_>>>10),_=g+(w^P&(y^w))+v[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=P+(y^w&(g^y))+v[6]+3225465664&4294967295,P=g+(_<<9&4294967295|_>>>23),_=w+(g^y&(P^g))+v[11]+643717713&4294967295,w=P+(_<<14&4294967295|_>>>18),_=y+(P^g&(w^P))+v[0]+3921069994&4294967295,y=w+(_<<20&4294967295|_>>>12),_=g+(w^P&(y^w))+v[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=P+(y^w&(g^y))+v[10]+38016083&4294967295,P=g+(_<<9&4294967295|_>>>23),_=w+(g^y&(P^g))+v[15]+3634488961&4294967295,w=P+(_<<14&4294967295|_>>>18),_=y+(P^g&(w^P))+v[4]+3889429448&4294967295,y=w+(_<<20&4294967295|_>>>12),_=g+(w^P&(y^w))+v[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=P+(y^w&(g^y))+v[14]+3275163606&4294967295,P=g+(_<<9&4294967295|_>>>23),_=w+(g^y&(P^g))+v[3]+4107603335&4294967295,w=P+(_<<14&4294967295|_>>>18),_=y+(P^g&(w^P))+v[8]+1163531501&4294967295,y=w+(_<<20&4294967295|_>>>12),_=g+(w^P&(y^w))+v[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=P+(y^w&(g^y))+v[2]+4243563512&4294967295,P=g+(_<<9&4294967295|_>>>23),_=w+(g^y&(P^g))+v[7]+1735328473&4294967295,w=P+(_<<14&4294967295|_>>>18),_=y+(P^g&(w^P))+v[12]+2368359562&4294967295,y=w+(_<<20&4294967295|_>>>12),_=g+(y^w^P)+v[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=P+(g^y^w)+v[8]+2272392833&4294967295,P=g+(_<<11&4294967295|_>>>21),_=w+(P^g^y)+v[11]+1839030562&4294967295,w=P+(_<<16&4294967295|_>>>16),_=y+(w^P^g)+v[14]+4259657740&4294967295,y=w+(_<<23&4294967295|_>>>9),_=g+(y^w^P)+v[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=P+(g^y^w)+v[4]+1272893353&4294967295,P=g+(_<<11&4294967295|_>>>21),_=w+(P^g^y)+v[7]+4139469664&4294967295,w=P+(_<<16&4294967295|_>>>16),_=y+(w^P^g)+v[10]+3200236656&4294967295,y=w+(_<<23&4294967295|_>>>9),_=g+(y^w^P)+v[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=P+(g^y^w)+v[0]+3936430074&4294967295,P=g+(_<<11&4294967295|_>>>21),_=w+(P^g^y)+v[3]+3572445317&4294967295,w=P+(_<<16&4294967295|_>>>16),_=y+(w^P^g)+v[6]+76029189&4294967295,y=w+(_<<23&4294967295|_>>>9),_=g+(y^w^P)+v[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=P+(g^y^w)+v[12]+3873151461&4294967295,P=g+(_<<11&4294967295|_>>>21),_=w+(P^g^y)+v[15]+530742520&4294967295,w=P+(_<<16&4294967295|_>>>16),_=y+(w^P^g)+v[2]+3299628645&4294967295,y=w+(_<<23&4294967295|_>>>9),_=g+(w^(y|~P))+v[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=P+(y^(g|~w))+v[7]+1126891415&4294967295,P=g+(_<<10&4294967295|_>>>22),_=w+(g^(P|~y))+v[14]+2878612391&4294967295,w=P+(_<<15&4294967295|_>>>17),_=y+(P^(w|~g))+v[5]+4237533241&4294967295,y=w+(_<<21&4294967295|_>>>11),_=g+(w^(y|~P))+v[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=P+(y^(g|~w))+v[3]+2399980690&4294967295,P=g+(_<<10&4294967295|_>>>22),_=w+(g^(P|~y))+v[10]+4293915773&4294967295,w=P+(_<<15&4294967295|_>>>17),_=y+(P^(w|~g))+v[1]+2240044497&4294967295,y=w+(_<<21&4294967295|_>>>11),_=g+(w^(y|~P))+v[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=P+(y^(g|~w))+v[15]+4264355552&4294967295,P=g+(_<<10&4294967295|_>>>22),_=w+(g^(P|~y))+v[6]+2734768916&4294967295,w=P+(_<<15&4294967295|_>>>17),_=y+(P^(w|~g))+v[13]+1309151649&4294967295,y=w+(_<<21&4294967295|_>>>11),_=g+(w^(y|~P))+v[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=P+(y^(g|~w))+v[11]+3174756917&4294967295,P=g+(_<<10&4294967295|_>>>22),_=w+(g^(P|~y))+v[2]+718787259&4294967295,w=P+(_<<15&4294967295|_>>>17),_=y+(P^(w|~g))+v[9]+3951481745&4294967295,T.g[0]=T.g[0]+g&4294967295,T.g[1]=T.g[1]+(w+(_<<21&4294967295|_>>>11))&4294967295,T.g[2]=T.g[2]+w&4294967295,T.g[3]=T.g[3]+P&4294967295}n.prototype.v=function(T,g){g===void 0&&(g=T.length);const y=g-this.blockSize,v=this.C;let w=this.h,P=0;for(;P<g;){if(w==0)for(;P<=y;)s(this,T,P),P+=this.blockSize;if(typeof T=="string"){for(;P<g;)if(v[w++]=T.charCodeAt(P++),w==this.blockSize){s(this,v),w=0;break}}else for(;P<g;)if(v[w++]=T[P++],w==this.blockSize){s(this,v),w=0;break}}this.h=w,this.o+=g},n.prototype.A=function(){var T=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);T[0]=128;for(var g=1;g<T.length-8;++g)T[g]=0;g=this.o*8;for(var y=T.length-8;y<T.length;++y)T[y]=g&255,g/=256;for(this.v(T),T=Array(16),g=0,y=0;y<4;++y)for(let v=0;v<32;v+=8)T[g++]=this.g[y]>>>v&255;return T};function i(T,g){var y=u;return Object.prototype.hasOwnProperty.call(y,T)?y[T]:y[T]=g(T)}function o(T,g){this.h=g;const y=[];let v=!0;for(let w=T.length-1;w>=0;w--){const P=T[w]|0;v&&P==g||(y[w]=P,v=!1)}this.g=y}var u={};function c(T){return-128<=T&&T<128?i(T,function(g){return new o([g|0],g<0?-1:0)}):new o([T|0],T<0?-1:0)}function h(T){if(isNaN(T)||!isFinite(T))return p;if(T<0)return M(h(-T));const g=[];let y=1;for(let v=0;T>=y;v++)g[v]=T/y|0,y*=4294967296;return new o(g,0)}function f(T,g){if(T.length==0)throw Error("number format error: empty string");if(g=g||10,g<2||36<g)throw Error("radix out of range: "+g);if(T.charAt(0)=="-")return M(f(T.substring(1),g));if(T.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=h(Math.pow(g,8));let v=p;for(let P=0;P<T.length;P+=8){var w=Math.min(8,T.length-P);const _=parseInt(T.substring(P,P+w),g);w<8?(w=h(Math.pow(g,w)),v=v.j(w).add(h(_))):(v=v.j(y),v=v.add(h(_)))}return v}var p=c(0),I=c(1),b=c(16777216);r=o.prototype,r.m=function(){if(L(this))return-M(this).m();let T=0,g=1;for(let y=0;y<this.g.length;y++){const v=this.i(y);T+=(v>=0?v:4294967296+v)*g,g*=4294967296}return T},r.toString=function(T){if(T=T||10,T<2||36<T)throw Error("radix out of range: "+T);if(C(this))return"0";if(L(this))return"-"+M(this).toString(T);const g=h(Math.pow(T,6));var y=this;let v="";for(;;){const w=ue(y,g).g;y=z(y,w.j(g));let P=((y.g.length>0?y.g[0]:y.h)>>>0).toString(T);if(y=w,C(y))return P+v;for(;P.length<6;)P="0"+P;v=P+v}},r.i=function(T){return T<0?0:T<this.g.length?this.g[T]:this.h};function C(T){if(T.h!=0)return!1;for(let g=0;g<T.g.length;g++)if(T.g[g]!=0)return!1;return!0}function L(T){return T.h==-1}r.l=function(T){return T=z(this,T),L(T)?-1:C(T)?0:1};function M(T){const g=T.g.length,y=[];for(let v=0;v<g;v++)y[v]=~T.g[v];return new o(y,~T.h).add(I)}r.abs=function(){return L(this)?M(this):this},r.add=function(T){const g=Math.max(this.g.length,T.g.length),y=[];let v=0;for(let w=0;w<=g;w++){let P=v+(this.i(w)&65535)+(T.i(w)&65535),_=(P>>>16)+(this.i(w)>>>16)+(T.i(w)>>>16);v=_>>>16,P&=65535,_&=65535,y[w]=_<<16|P}return new o(y,y[y.length-1]&-2147483648?-1:0)};function z(T,g){return T.add(M(g))}r.j=function(T){if(C(this)||C(T))return p;if(L(this))return L(T)?M(this).j(M(T)):M(M(this).j(T));if(L(T))return M(this.j(M(T)));if(this.l(b)<0&&T.l(b)<0)return h(this.m()*T.m());const g=this.g.length+T.g.length,y=[];for(var v=0;v<2*g;v++)y[v]=0;for(v=0;v<this.g.length;v++)for(let w=0;w<T.g.length;w++){const P=this.i(v)>>>16,_=this.i(v)&65535,$e=T.i(w)>>>16,En=T.i(w)&65535;y[2*v+2*w]+=_*En,K(y,2*v+2*w),y[2*v+2*w+1]+=P*En,K(y,2*v+2*w+1),y[2*v+2*w+1]+=_*$e,K(y,2*v+2*w+1),y[2*v+2*w+2]+=P*$e,K(y,2*v+2*w+2)}for(T=0;T<g;T++)y[T]=y[2*T+1]<<16|y[2*T];for(T=g;T<2*g;T++)y[T]=0;return new o(y,0)};function K(T,g){for(;(T[g]&65535)!=T[g];)T[g+1]+=T[g]>>>16,T[g]&=65535,g++}function H(T,g){this.g=T,this.h=g}function ue(T,g){if(C(g))throw Error("division by zero");if(C(T))return new H(p,p);if(L(T))return g=ue(M(T),g),new H(M(g.g),M(g.h));if(L(g))return g=ue(T,M(g)),new H(M(g.g),g.h);if(T.g.length>30){if(L(T)||L(g))throw Error("slowDivide_ only works with positive integers.");for(var y=I,v=g;v.l(T)<=0;)y=te(y),v=te(v);var w=ne(y,1),P=ne(v,1);for(v=ne(v,2),y=ne(y,2);!C(v);){var _=P.add(v);_.l(T)<=0&&(w=w.add(y),P=_),v=ne(v,1),y=ne(y,1)}return g=z(T,w.j(g)),new H(w,g)}for(w=p;T.l(g)>=0;){for(y=Math.max(1,Math.floor(T.m()/g.m())),v=Math.ceil(Math.log(y)/Math.LN2),v=v<=48?1:Math.pow(2,v-48),P=h(y),_=P.j(g);L(_)||_.l(T)>0;)y-=v,P=h(y),_=P.j(g);C(P)&&(P=I),w=w.add(P),T=z(T,_)}return new H(w,T)}r.B=function(T){return ue(this,T).h},r.and=function(T){const g=Math.max(this.g.length,T.g.length),y=[];for(let v=0;v<g;v++)y[v]=this.i(v)&T.i(v);return new o(y,this.h&T.h)},r.or=function(T){const g=Math.max(this.g.length,T.g.length),y=[];for(let v=0;v<g;v++)y[v]=this.i(v)|T.i(v);return new o(y,this.h|T.h)},r.xor=function(T){const g=Math.max(this.g.length,T.g.length),y=[];for(let v=0;v<g;v++)y[v]=this.i(v)^T.i(v);return new o(y,this.h^T.h)};function te(T){const g=T.g.length+1,y=[];for(let v=0;v<g;v++)y[v]=T.i(v)<<1|T.i(v-1)>>>31;return new o(y,T.h)}function ne(T,g){const y=g>>5;g%=32;const v=T.g.length-y,w=[];for(let P=0;P<v;P++)w[P]=g>0?T.i(P+y)>>>g|T.i(P+y+1)<<32-g:T.i(P+y);return new o(w,T.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,kf=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,on=o}).apply(typeof Eh<"u"?Eh:typeof self<"u"?self:typeof window<"u"?window:{});var qi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Of,ys,Lf,eo,tu,Mf,Uf,Ff;(function(){var r,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof qi=="object"&&qi];for(var l=0;l<a.length;++l){var d=a[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function s(a,l){if(l)e:{var d=n;a=a.split(".");for(var m=0;m<a.length-1;m++){var R=a[m];if(!(R in d))break e;d=d[R]}a=a[a.length-1],m=d[a],l=l(m),l!=m&&l!=null&&e(d,a,{configurable:!0,writable:!0,value:l})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(l){var d=[],m;for(m in l)Object.prototype.hasOwnProperty.call(l,m)&&d.push([m,l[m]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function u(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function c(a,l,d){return a.call.apply(a.bind,arguments)}function h(a,l,d){return h=c,h.apply(null,arguments)}function f(a,l){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function p(a,l){function d(){}d.prototype=l.prototype,a.Z=l.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(m,R,S){for(var O=Array(arguments.length-2),Y=2;Y<arguments.length;Y++)O[Y-2]=arguments[Y];return l.prototype[R].apply(m,O)}}var I=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function b(a){const l=a.length;if(l>0){const d=Array(l);for(let m=0;m<l;m++)d[m]=a[m];return d}return[]}function C(a,l){for(let m=1;m<arguments.length;m++){const R=arguments[m];var d=typeof R;if(d=d!="object"?d:R?Array.isArray(R)?"array":d:"null",d=="array"||d=="object"&&typeof R.length=="number"){d=a.length||0;const S=R.length||0;a.length=d+S;for(let O=0;O<S;O++)a[d+O]=R[O]}else a.push(R)}}class L{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return this.h>0?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function M(a){o.setTimeout(()=>{throw a},0)}function z(){var a=T;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class K{constructor(){this.h=this.g=null}add(l,d){const m=H.get();m.set(l,d),this.h?this.h.next=m:this.g=m,this.h=m}}var H=new L(()=>new ue,a=>a.reset());class ue{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let te,ne=!1,T=new K,g=()=>{const a=Promise.resolve(void 0);te=()=>{a.then(y)}};function y(){for(var a;a=z();){try{a.h.call(a.g)}catch(d){M(d)}var l=H;l.j(a),l.h<100&&(l.h++,a.next=l.g,l.g=a)}ne=!1}function v(){this.u=this.u,this.C=this.C}v.prototype.u=!1,v.prototype.dispose=function(){this.u||(this.u=!0,this.N())},v.prototype[Symbol.dispose]=function(){this.dispose()},v.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function w(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}w.prototype.h=function(){this.defaultPrevented=!0};var P=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};o.addEventListener("test",d,l),o.removeEventListener("test",d,l)}catch{}return a}();function _(a){return/^[\s\xa0]*$/.test(a)}function $e(a,l){w.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,l)}p($e,w),$e.prototype.init=function(a,l){const d=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget,l||(d=="mouseover"?l=a.fromElement:d=="mouseout"&&(l=a.toElement)),this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&$e.Z.h.call(this)},$e.prototype.h=function(){$e.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var En="closure_listenable_"+(Math.random()*1e6|0),tg=0;function ng(a,l,d,m,R){this.listener=a,this.proxy=null,this.src=l,this.type=d,this.capture=!!m,this.ha=R,this.key=++tg,this.da=this.fa=!1}function Ri(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Pi(a,l,d){for(const m in a)l.call(d,a[m],m,a)}function rg(a,l){for(const d in a)l.call(void 0,a[d],d,a)}function Gc(a){const l={};for(const d in a)l[d]=a[d];return l}const Hc="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Wc(a,l){let d,m;for(let R=1;R<arguments.length;R++){m=arguments[R];for(d in m)a[d]=m[d];for(let S=0;S<Hc.length;S++)d=Hc[S],Object.prototype.hasOwnProperty.call(m,d)&&(a[d]=m[d])}}function bi(a){this.src=a,this.g={},this.h=0}bi.prototype.add=function(a,l,d,m,R){const S=a.toString();a=this.g[S],a||(a=this.g[S]=[],this.h++);const O=pa(a,l,m,R);return O>-1?(l=a[O],d||(l.fa=!1)):(l=new ng(l,this.src,S,!!m,R),l.fa=d,a.push(l)),l};function fa(a,l){const d=l.type;if(d in a.g){var m=a.g[d],R=Array.prototype.indexOf.call(m,l,void 0),S;(S=R>=0)&&Array.prototype.splice.call(m,R,1),S&&(Ri(l),a.g[d].length==0&&(delete a.g[d],a.h--))}}function pa(a,l,d,m){for(let R=0;R<a.length;++R){const S=a[R];if(!S.da&&S.listener==l&&S.capture==!!d&&S.ha==m)return R}return-1}var ma="closure_lm_"+(Math.random()*1e6|0),ga={};function Qc(a,l,d,m,R){if(Array.isArray(l)){for(let S=0;S<l.length;S++)Qc(a,l[S],d,m,R);return null}return d=Xc(d),a&&a[En]?a.J(l,d,u(m)?!!m.capture:!1,R):sg(a,l,d,!1,m,R)}function sg(a,l,d,m,R,S){if(!l)throw Error("Invalid event type");const O=u(R)?!!R.capture:!!R;let Y=ya(a);if(Y||(a[ma]=Y=new bi(a)),d=Y.add(l,d,m,O,S),d.proxy)return d;if(m=ig(),d.proxy=m,m.src=a,m.listener=d,a.addEventListener)P||(R=O),R===void 0&&(R=!1),a.addEventListener(l.toString(),m,R);else if(a.attachEvent)a.attachEvent(Jc(l.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function ig(){function a(d){return l.call(a.src,a.listener,d)}const l=og;return a}function Yc(a,l,d,m,R){if(Array.isArray(l))for(var S=0;S<l.length;S++)Yc(a,l[S],d,m,R);else m=u(m)?!!m.capture:!!m,d=Xc(d),a&&a[En]?(a=a.i,S=String(l).toString(),S in a.g&&(l=a.g[S],d=pa(l,d,m,R),d>-1&&(Ri(l[d]),Array.prototype.splice.call(l,d,1),l.length==0&&(delete a.g[S],a.h--)))):a&&(a=ya(a))&&(l=a.g[l.toString()],a=-1,l&&(a=pa(l,d,m,R)),(d=a>-1?l[a]:null)&&_a(d))}function _a(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[En])fa(l.i,a);else{var d=a.type,m=a.proxy;l.removeEventListener?l.removeEventListener(d,m,a.capture):l.detachEvent?l.detachEvent(Jc(d),m):l.addListener&&l.removeListener&&l.removeListener(m),(d=ya(l))?(fa(d,a),d.h==0&&(d.src=null,l[ma]=null)):Ri(a)}}}function Jc(a){return a in ga?ga[a]:ga[a]="on"+a}function og(a,l){if(a.da)a=!0;else{l=new $e(l,this);const d=a.listener,m=a.ha||a.src;a.fa&&_a(a),a=d.call(m,l)}return a}function ya(a){return a=a[ma],a instanceof bi?a:null}var Ia="__closure_events_fn_"+(Math.random()*1e9>>>0);function Xc(a){return typeof a=="function"?a:(a[Ia]||(a[Ia]=function(l){return a.handleEvent(l)}),a[Ia])}function Ce(){v.call(this),this.i=new bi(this),this.M=this,this.G=null}p(Ce,v),Ce.prototype[En]=!0,Ce.prototype.removeEventListener=function(a,l,d,m){Yc(this,a,l,d,m)};function Le(a,l){var d,m=a.G;if(m)for(d=[];m;m=m.G)d.push(m);if(a=a.M,m=l.type||l,typeof l=="string")l=new w(l,a);else if(l instanceof w)l.target=l.target||a;else{var R=l;l=new w(m,a),Wc(l,R)}R=!0;let S,O;if(d)for(O=d.length-1;O>=0;O--)S=l.g=d[O],R=Si(S,m,!0,l)&&R;if(S=l.g=a,R=Si(S,m,!0,l)&&R,R=Si(S,m,!1,l)&&R,d)for(O=0;O<d.length;O++)S=l.g=d[O],R=Si(S,m,!1,l)&&R}Ce.prototype.N=function(){if(Ce.Z.N.call(this),this.i){var a=this.i;for(const l in a.g){const d=a.g[l];for(let m=0;m<d.length;m++)Ri(d[m]);delete a.g[l],a.h--}}this.G=null},Ce.prototype.J=function(a,l,d,m){return this.i.add(String(a),l,!1,d,m)},Ce.prototype.K=function(a,l,d,m){return this.i.add(String(a),l,!0,d,m)};function Si(a,l,d,m){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();let R=!0;for(let S=0;S<l.length;++S){const O=l[S];if(O&&!O.da&&O.capture==d){const Y=O.listener,Ie=O.ha||O.src;O.fa&&fa(a.i,O),R=Y.call(Ie,m)!==!1&&R}}return R&&!m.defaultPrevented}function ag(a,l){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=h(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(l)>2147483647?-1:o.setTimeout(a,l||0)}function Zc(a){a.g=ag(()=>{a.g=null,a.i&&(a.i=!1,Zc(a))},a.l);const l=a.h;a.h=null,a.m.apply(null,l)}class ug extends v{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Zc(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Wr(a){v.call(this),this.h=a,this.g={}}p(Wr,v);var el=[];function tl(a){Pi(a.g,function(l,d){this.g.hasOwnProperty(d)&&_a(l)},a),a.g={}}Wr.prototype.N=function(){Wr.Z.N.call(this),tl(this)},Wr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ea=o.JSON.stringify,cg=o.JSON.parse,lg=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function nl(){}function rl(){}var Qr={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Ta(){w.call(this,"d")}p(Ta,w);function wa(){w.call(this,"c")}p(wa,w);var Tn={},sl=null;function Vi(){return sl=sl||new Ce}Tn.Ia="serverreachability";function il(a){w.call(this,Tn.Ia,a)}p(il,w);function Yr(a){const l=Vi();Le(l,new il(l))}Tn.STAT_EVENT="statevent";function ol(a,l){w.call(this,Tn.STAT_EVENT,a),this.stat=l}p(ol,w);function Me(a){const l=Vi();Le(l,new ol(l,a))}Tn.Ja="timingevent";function al(a,l){w.call(this,Tn.Ja,a),this.size=l}p(al,w);function Jr(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},l)}function Xr(){this.g=!0}Xr.prototype.ua=function(){this.g=!1};function hg(a,l,d,m,R,S){a.info(function(){if(a.g)if(S){var O="",Y=S.split("&");for(let oe=0;oe<Y.length;oe++){var Ie=Y[oe].split("=");if(Ie.length>1){const Ae=Ie[0];Ie=Ie[1];const ft=Ae.split("_");O=ft.length>=2&&ft[1]=="type"?O+(Ae+"="+Ie+"&"):O+(Ae+"=redacted&")}}}else O=null;else O=S;return"XMLHTTP REQ ("+m+") [attempt "+R+"]: "+l+`
`+d+`
`+O})}function dg(a,l,d,m,R,S,O){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+R+"]: "+l+`
`+d+`
`+S+" "+O})}function nr(a,l,d,m){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+pg(a,d)+(m?" "+m:"")})}function fg(a,l){a.info(function(){return"TIMEOUT: "+l})}Xr.prototype.info=function(){};function pg(a,l){if(!a.g)return l;if(!l)return null;try{const S=JSON.parse(l);if(S){for(a=0;a<S.length;a++)if(Array.isArray(S[a])){var d=S[a];if(!(d.length<2)){var m=d[1];if(Array.isArray(m)&&!(m.length<1)){var R=m[0];if(R!="noop"&&R!="stop"&&R!="close")for(let O=1;O<m.length;O++)m[O]=""}}}}return Ea(S)}catch{return l}}var Ci={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},ul={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},cl;function va(){}p(va,nl),va.prototype.g=function(){return new XMLHttpRequest},cl=new va;function Zr(a){return encodeURIComponent(String(a))}function mg(a){var l=1;a=a.split(":");const d=[];for(;l>0&&a.length;)d.push(a.shift()),l--;return a.length&&d.push(a.join(":")),d}function Ut(a,l,d,m){this.j=a,this.i=l,this.l=d,this.S=m||1,this.V=new Wr(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new ll}function ll(){this.i=null,this.g="",this.h=!1}var hl={},Aa={};function Ra(a,l,d){a.M=1,a.A=Di(dt(l)),a.u=d,a.R=!0,dl(a,null)}function dl(a,l){a.F=Date.now(),xi(a),a.B=dt(a.A);var d=a.B,m=a.S;Array.isArray(m)||(m=[String(m)]),Rl(d.i,"t",m),a.C=0,d=a.j.L,a.h=new ll,a.g=jl(a.j,d?l:null,!a.u),a.P>0&&(a.O=new ug(h(a.Y,a,a.g),a.P)),l=a.V,d=a.g,m=a.ba;var R="readystatechange";Array.isArray(R)||(R&&(el[0]=R.toString()),R=el);for(let S=0;S<R.length;S++){const O=Qc(d,R[S],m||l.handleEvent,!1,l.h||l);if(!O)break;l.g[O.key]=O}l=a.J?Gc(a.J):{},a.u?(a.v||(a.v="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,l)):(a.v="GET",a.g.ea(a.B,a.v,null,l)),Yr(),hg(a.i,a.v,a.B,a.l,a.S,a.u)}Ut.prototype.ba=function(a){a=a.target;const l=this.O;l&&qt(a)==3?l.j():this.Y(a)},Ut.prototype.Y=function(a){try{if(a==this.g)e:{const Y=qt(this.g),Ie=this.g.ya(),oe=this.g.ca();if(!(Y<3)&&(Y!=3||this.g&&(this.h.h||this.g.la()||Dl(this.g)))){this.K||Y!=4||Ie==7||(Ie==8||oe<=0?Yr(3):Yr(2)),Pa(this);var l=this.g.ca();this.X=l;var d=gg(this);if(this.o=l==200,dg(this.i,this.v,this.B,this.l,this.S,Y,l),this.o){if(this.U&&!this.L){t:{if(this.g){var m,R=this.g;if((m=R.g?R.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(m)){var S=m;break t}}S=null}if(a=S)nr(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,ba(this,a);else{this.o=!1,this.m=3,Me(12),wn(this),es(this);break e}}if(this.R){a=!0;let Ae;for(;!this.K&&this.C<d.length;)if(Ae=_g(this,d),Ae==Aa){Y==4&&(this.m=4,Me(14),a=!1),nr(this.i,this.l,null,"[Incomplete Response]");break}else if(Ae==hl){this.m=4,Me(15),nr(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else nr(this.i,this.l,Ae,null),ba(this,Ae);if(fl(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Y!=4||d.length!=0||this.h.h||(this.m=1,Me(16),a=!1),this.o=this.o&&a,!a)nr(this.i,this.l,d,"[Invalid Chunked Response]"),wn(this),es(this);else if(d.length>0&&!this.W){this.W=!0;var O=this.j;O.g==this&&O.aa&&!O.P&&(O.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),Oa(O),O.P=!0,Me(11))}}else nr(this.i,this.l,d,null),ba(this,d);Y==4&&wn(this),this.o&&!this.K&&(Y==4?Fl(this.j,this):(this.o=!1,xi(this)))}else xg(this.g),l==400&&d.indexOf("Unknown SID")>0?(this.m=3,Me(12)):(this.m=0,Me(13)),wn(this),es(this)}}}catch{}finally{}};function gg(a){if(!fl(a))return a.g.la();const l=Dl(a.g);if(l==="")return"";let d="";const m=l.length,R=qt(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return wn(a),es(a),"";a.h.i=new o.TextDecoder}for(let S=0;S<m;S++)a.h.h=!0,d+=a.h.i.decode(l[S],{stream:!(R&&S==m-1)});return l.length=0,a.h.g+=d,a.C=0,a.h.g}function fl(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function _g(a,l){var d=a.C,m=l.indexOf(`
`,d);return m==-1?Aa:(d=Number(l.substring(d,m)),isNaN(d)?hl:(m+=1,m+d>l.length?Aa:(l=l.slice(m,m+d),a.C=m+d,l)))}Ut.prototype.cancel=function(){this.K=!0,wn(this)};function xi(a){a.T=Date.now()+a.H,pl(a,a.H)}function pl(a,l){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Jr(h(a.aa,a),l)}function Pa(a){a.D&&(o.clearTimeout(a.D),a.D=null)}Ut.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(fg(this.i,this.B),this.M!=2&&(Yr(),Me(17)),wn(this),this.m=2,es(this)):pl(this,this.T-a)};function es(a){a.j.I==0||a.K||Fl(a.j,a)}function wn(a){Pa(a);var l=a.O;l&&typeof l.dispose=="function"&&l.dispose(),a.O=null,tl(a.V),a.g&&(l=a.g,a.g=null,l.abort(),l.dispose())}function ba(a,l){try{var d=a.j;if(d.I!=0&&(d.g==a||Sa(d.h,a))){if(!a.L&&Sa(d.h,a)&&d.I==3){try{var m=d.Ba.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var R=m;if(R[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)Mi(d),Oi(d);else break e;ka(d),Me(18)}}else d.xa=R[1],0<d.xa-d.K&&R[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=Jr(h(d.Va,d),6e3));_l(d.h)<=1&&d.ta&&(d.ta=void 0)}else An(d,11)}else if((a.L||d.g==a)&&Mi(d),!_(l))for(R=d.Ba.g.parse(l),l=0;l<R.length;l++){let oe=R[l];const Ae=oe[0];if(!(Ae<=d.K))if(d.K=Ae,oe=oe[1],d.I==2)if(oe[0]=="c"){d.M=oe[1],d.ba=oe[2];const ft=oe[3];ft!=null&&(d.ka=ft,d.j.info("VER="+d.ka));const Rn=oe[4];Rn!=null&&(d.za=Rn,d.j.info("SVER="+d.za));const $t=oe[5];$t!=null&&typeof $t=="number"&&$t>0&&(m=1.5*$t,d.O=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const jt=a.g;if(jt){const Fi=jt.g?jt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Fi){var S=m.h;S.g||Fi.indexOf("spdy")==-1&&Fi.indexOf("quic")==-1&&Fi.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(Va(S,S.h),S.h=null))}if(m.G){const La=jt.g?jt.g.getResponseHeader("X-HTTP-Session-Id"):null;La&&(m.wa=La,ce(m.J,m.G,La))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),m=d;var O=a;if(m.na=$l(m,m.L?m.ba:null,m.W),O.L){yl(m.h,O);var Y=O,Ie=m.O;Ie&&(Y.H=Ie),Y.D&&(Pa(Y),xi(Y)),m.g=O}else Ml(m);d.i.length>0&&Li(d)}else oe[0]!="stop"&&oe[0]!="close"||An(d,7);else d.I==3&&(oe[0]=="stop"||oe[0]=="close"?oe[0]=="stop"?An(d,7):Na(d):oe[0]!="noop"&&d.l&&d.l.qa(oe),d.A=0)}}Yr(4)}catch{}}var yg=class{constructor(a,l){this.g=a,this.map=l}};function ml(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function gl(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function _l(a){return a.h?1:a.g?a.g.size:0}function Sa(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function Va(a,l){a.g?a.g.add(l):a.h=l}function yl(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}ml.prototype.cancel=function(){if(this.i=Il(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Il(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let l=a.i;for(const d of a.g.values())l=l.concat(d.G);return l}return b(a.i)}var El=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ig(a,l){if(a){a=a.split("&");for(let d=0;d<a.length;d++){const m=a[d].indexOf("=");let R,S=null;m>=0?(R=a[d].substring(0,m),S=a[d].substring(m+1)):R=a[d],l(R,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function Ft(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let l;a instanceof Ft?(this.l=a.l,ts(this,a.j),this.o=a.o,this.g=a.g,ns(this,a.u),this.h=a.h,Ca(this,Pl(a.i)),this.m=a.m):a&&(l=String(a).match(El))?(this.l=!1,ts(this,l[1]||"",!0),this.o=rs(l[2]||""),this.g=rs(l[3]||"",!0),ns(this,l[4]),this.h=rs(l[5]||"",!0),Ca(this,l[6]||"",!0),this.m=rs(l[7]||"")):(this.l=!1,this.i=new is(null,this.l))}Ft.prototype.toString=function(){const a=[];var l=this.j;l&&a.push(ss(l,Tl,!0),":");var d=this.g;return(d||l=="file")&&(a.push("//"),(l=this.o)&&a.push(ss(l,Tl,!0),"@"),a.push(Zr(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(ss(d,d.charAt(0)=="/"?wg:Tg,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",ss(d,Ag)),a.join("")},Ft.prototype.resolve=function(a){const l=dt(this);let d=!!a.j;d?ts(l,a.j):d=!!a.o,d?l.o=a.o:d=!!a.g,d?l.g=a.g:d=a.u!=null;var m=a.h;if(d)ns(l,a.u);else if(d=!!a.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var R=l.h.lastIndexOf("/");R!=-1&&(m=l.h.slice(0,R+1)+m)}if(R=m,R==".."||R==".")m="";else if(R.indexOf("./")!=-1||R.indexOf("/.")!=-1){m=R.lastIndexOf("/",0)==0,R=R.split("/");const S=[];for(let O=0;O<R.length;){const Y=R[O++];Y=="."?m&&O==R.length&&S.push(""):Y==".."?((S.length>1||S.length==1&&S[0]!="")&&S.pop(),m&&O==R.length&&S.push("")):(S.push(Y),m=!0)}m=S.join("/")}else m=R}return d?l.h=m:d=a.i.toString()!=="",d?Ca(l,Pl(a.i)):d=!!a.m,d&&(l.m=a.m),l};function dt(a){return new Ft(a)}function ts(a,l,d){a.j=d?rs(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function ns(a,l){if(l){if(l=Number(l),isNaN(l)||l<0)throw Error("Bad port number "+l);a.u=l}else a.u=null}function Ca(a,l,d){l instanceof is?(a.i=l,Rg(a.i,a.l)):(d||(l=ss(l,vg)),a.i=new is(l,a.l))}function ce(a,l,d){a.i.set(l,d)}function Di(a){return ce(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function rs(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function ss(a,l,d){return typeof a=="string"?(a=encodeURI(a).replace(l,Eg),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Eg(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Tl=/[#\/\?@]/g,Tg=/[#\?:]/g,wg=/[#\?]/g,vg=/[#\?@]/g,Ag=/#/g;function is(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function vn(a){a.g||(a.g=new Map,a.h=0,a.i&&Ig(a.i,function(l,d){a.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}r=is.prototype,r.add=function(a,l){vn(this),this.i=null,a=rr(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(l),this.h+=1,this};function wl(a,l){vn(a),l=rr(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function vl(a,l){return vn(a),l=rr(a,l),a.g.has(l)}r.forEach=function(a,l){vn(this),this.g.forEach(function(d,m){d.forEach(function(R){a.call(l,R,m,this)},this)},this)};function Al(a,l){vn(a);let d=[];if(typeof l=="string")vl(a,l)&&(d=d.concat(a.g.get(rr(a,l))));else for(a=Array.from(a.g.values()),l=0;l<a.length;l++)d=d.concat(a[l]);return d}r.set=function(a,l){return vn(this),this.i=null,a=rr(this,a),vl(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},r.get=function(a,l){return a?(a=Al(this,a),a.length>0?String(a[0]):l):l};function Rl(a,l,d){wl(a,l),d.length>0&&(a.i=null,a.g.set(rr(a,l),b(d)),a.h+=d.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],l=Array.from(this.g.keys());for(let m=0;m<l.length;m++){var d=l[m];const R=Zr(d);d=Al(this,d);for(let S=0;S<d.length;S++){let O=R;d[S]!==""&&(O+="="+Zr(d[S])),a.push(O)}}return this.i=a.join("&")};function Pl(a){const l=new is;return l.i=a.i,a.g&&(l.g=new Map(a.g),l.h=a.h),l}function rr(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function Rg(a,l){l&&!a.j&&(vn(a),a.i=null,a.g.forEach(function(d,m){const R=m.toLowerCase();m!=R&&(wl(this,m),Rl(this,R,d))},a)),a.j=l}function Pg(a,l){const d=new Xr;if(o.Image){const m=new Image;m.onload=f(Bt,d,"TestLoadImage: loaded",!0,l,m),m.onerror=f(Bt,d,"TestLoadImage: error",!1,l,m),m.onabort=f(Bt,d,"TestLoadImage: abort",!1,l,m),m.ontimeout=f(Bt,d,"TestLoadImage: timeout",!1,l,m),o.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else l(!1)}function bg(a,l){const d=new Xr,m=new AbortController,R=setTimeout(()=>{m.abort(),Bt(d,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:m.signal}).then(S=>{clearTimeout(R),S.ok?Bt(d,"TestPingServer: ok",!0,l):Bt(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(R),Bt(d,"TestPingServer: error",!1,l)})}function Bt(a,l,d,m,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),m(d)}catch{}}function Sg(){this.g=new lg}function xa(a){this.i=a.Sb||null,this.h=a.ab||!1}p(xa,nl),xa.prototype.g=function(){return new Ni(this.i,this.h)};function Ni(a,l){Ce.call(this),this.H=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(Ni,Ce),r=Ni.prototype,r.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=l,this.readyState=1,as(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const l={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(l.body=a),(this.H||o).fetch(new Request(this.D,l)).then(this.Pa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,os(this)),this.readyState=0},r.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,as(this)),this.g&&(this.readyState=3,as(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;bl(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function bl(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}r.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.B.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?os(this):as(this),this.readyState==3&&bl(this)}},r.Oa=function(a){this.g&&(this.response=this.responseText=a,os(this))},r.Na=function(a){this.g&&(this.response=a,os(this))},r.ga=function(){this.g&&os(this)};function os(a){a.readyState=4,a.l=null,a.j=null,a.B=null,as(a)}r.setRequestHeader=function(a,l){this.A.append(a,l)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=l.next();return a.join(`\r
`)};function as(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ni.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Sl(a){let l="";return Pi(a,function(d,m){l+=m,l+=":",l+=d,l+=`\r
`}),l}function Da(a,l,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=Sl(d),typeof a=="string"?d!=null&&Zr(d):ce(a,l,d))}function fe(a){Ce.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(fe,Ce);var Vg=/^https?$/i,Cg=["POST","PUT"];r=fe.prototype,r.Fa=function(a){this.H=a},r.ea=function(a,l,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():cl.g(),this.g.onreadystatechange=I(h(this.Ca,this));try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(S){Vl(this,S);return}if(a=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var R in m)d.set(R,m[R]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const S of m.keys())d.set(S,m.get(S));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(S=>S.toLowerCase()=="content-type"),R=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(Cg,l,void 0)>=0)||m||R||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,O]of d)this.g.setRequestHeader(S,O);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(S){Vl(this,S)}};function Vl(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.o=5,Cl(a),ki(a)}function Cl(a){a.A||(a.A=!0,Le(a,"complete"),Le(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,Le(this,"complete"),Le(this,"abort"),ki(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ki(this,!0)),fe.Z.N.call(this)},r.Ca=function(){this.u||(this.B||this.v||this.j?xl(this):this.Xa())},r.Xa=function(){xl(this)};function xl(a){if(a.h&&typeof i<"u"){if(a.v&&qt(a)==4)setTimeout(a.Ca.bind(a),0);else if(Le(a,"readystatechange"),qt(a)==4){a.h=!1;try{const S=a.ca();e:switch(S){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var m;if(m=S===0){let O=String(a.D).match(El)[1]||null;!O&&o.self&&o.self.location&&(O=o.self.location.protocol.slice(0,-1)),m=!Vg.test(O?O.toLowerCase():"")}d=m}if(d)Le(a,"complete"),Le(a,"success");else{a.o=6;try{var R=qt(a)>2?a.g.statusText:""}catch{R=""}a.l=R+" ["+a.ca()+"]",Cl(a)}}finally{ki(a)}}}}function ki(a,l){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const d=a.g;a.g=null,l||Le(a,"ready");try{d.onreadystatechange=null}catch{}}}r.isActive=function(){return!!this.g};function qt(a){return a.g?a.g.readyState:0}r.ca=function(){try{return qt(this)>2?this.g.status:-1}catch{return-1}},r.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.La=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),cg(l)}};function Dl(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function xg(a){const l={};a=(a.g&&qt(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(_(a[m]))continue;var d=mg(a[m]);const R=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const S=l[R]||[];l[R]=S,S.push(d)}rg(l,function(m){return m.join(", ")})}r.ya=function(){return this.o},r.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function us(a,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||l}function Nl(a){this.za=0,this.i=[],this.j=new Xr,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=us("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=us("baseRetryDelayMs",5e3,a),this.Za=us("retryDelaySeedMs",1e4,a),this.Ta=us("forwardChannelMaxRetries",2,a),this.va=us("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new ml(a&&a.concurrentRequestLimit),this.Ba=new Sg,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}r=Nl.prototype,r.ka=8,r.I=1,r.connect=function(a,l,d,m){Me(0),this.W=a,this.H=l||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.J=$l(this,null,this.W),Li(this)};function Na(a){if(kl(a),a.I==3){var l=a.V++,d=dt(a.J);if(ce(d,"SID",a.M),ce(d,"RID",l),ce(d,"TYPE","terminate"),cs(a,d),l=new Ut(a,a.j,l),l.M=2,l.A=Di(dt(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(l.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=l.A,d=!0),d||(l.g=jl(l.j,null),l.g.ea(l.A)),l.F=Date.now(),xi(l)}ql(a)}function Oi(a){a.g&&(Oa(a),a.g.cancel(),a.g=null)}function kl(a){Oi(a),a.v&&(o.clearTimeout(a.v),a.v=null),Mi(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Li(a){if(!gl(a.h)&&!a.m){a.m=!0;var l=a.Ea;te||g(),ne||(te(),ne=!0),T.add(l,a),a.D=0}}function Dg(a,l){return _l(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=l.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Jr(h(a.Ea,a,l),Bl(a,a.D)),a.D++,!0)}r.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const R=new Ut(this,this.j,a);let S=this.o;if(this.U&&(S?(S=Gc(S),Wc(S,this.U)):S=this.U),this.u!==null||this.R||(R.J=S,S=null),this.S)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(l+=m,l>4096){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=Ll(this,R,l),d=dt(this.J),ce(d,"RID",a),ce(d,"CVER",22),this.G&&ce(d,"X-HTTP-Session-Id",this.G),cs(this,d),S&&(this.R?l="headers="+Zr(Sl(S))+"&"+l:this.u&&Da(d,this.u,S)),Va(this.h,R),this.Ra&&ce(d,"TYPE","init"),this.S?(ce(d,"$req",l),ce(d,"SID","null"),R.U=!0,Ra(R,d,null)):Ra(R,d,l),this.I=2}}else this.I==3&&(a?Ol(this,a):this.i.length==0||gl(this.h)||Ol(this))};function Ol(a,l){var d;l?d=l.l:d=a.V++;const m=dt(a.J);ce(m,"SID",a.M),ce(m,"RID",d),ce(m,"AID",a.K),cs(a,m),a.u&&a.o&&Da(m,a.u,a.o),d=new Ut(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),l&&(a.i=l.G.concat(a.i)),l=Ll(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Va(a.h,d),Ra(d,m,l)}function cs(a,l){a.H&&Pi(a.H,function(d,m){ce(l,m,d)}),a.l&&Pi({},function(d,m){ce(l,m,d)})}function Ll(a,l,d){d=Math.min(a.i.length,d);const m=a.l?h(a.l.Ka,a.l,a):null;e:{var R=a.i;let Y=-1;for(;;){const Ie=["count="+d];Y==-1?d>0?(Y=R[0].g,Ie.push("ofs="+Y)):Y=0:Ie.push("ofs="+Y);let oe=!0;for(let Ae=0;Ae<d;Ae++){var S=R[Ae].g;const ft=R[Ae].map;if(S-=Y,S<0)Y=Math.max(0,R[Ae].g-100),oe=!1;else try{S="req"+S+"_"||"";try{var O=ft instanceof Map?ft:Object.entries(ft);for(const[Rn,$t]of O){let jt=$t;u($t)&&(jt=Ea($t)),Ie.push(S+Rn+"="+encodeURIComponent(jt))}}catch(Rn){throw Ie.push(S+"type="+encodeURIComponent("_badmap")),Rn}}catch{m&&m(ft)}}if(oe){O=Ie.join("&");break e}}O=void 0}return a=a.i.splice(0,d),l.G=a,O}function Ml(a){if(!a.g&&!a.v){a.Y=1;var l=a.Da;te||g(),ne||(te(),ne=!0),T.add(l,a),a.A=0}}function ka(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Jr(h(a.Da,a),Bl(a,a.A)),a.A++,!0)}r.Da=function(){if(this.v=null,Ul(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Jr(h(this.Wa,this),a)}},r.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Me(10),Oi(this),Ul(this))};function Oa(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Ul(a){a.g=new Ut(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var l=dt(a.na);ce(l,"RID","rpc"),ce(l,"SID",a.M),ce(l,"AID",a.K),ce(l,"CI",a.F?"0":"1"),!a.F&&a.ia&&ce(l,"TO",a.ia),ce(l,"TYPE","xmlhttp"),cs(a,l),a.u&&a.o&&Da(l,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=Di(dt(l)),d.u=null,d.R=!0,dl(d,a)}r.Va=function(){this.C!=null&&(this.C=null,Oi(this),ka(this),Me(19))};function Mi(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Fl(a,l){var d=null;if(a.g==l){Mi(a),Oa(a),a.g=null;var m=2}else if(Sa(a.h,l))d=l.G,yl(a.h,l),m=1;else return;if(a.I!=0){if(l.o)if(m==1){d=l.u?l.u.length:0,l=Date.now()-l.F;var R=a.D;m=Vi(),Le(m,new al(m,d)),Li(a)}else Ml(a);else if(R=l.m,R==3||R==0&&l.X>0||!(m==1&&Dg(a,l)||m==2&&ka(a)))switch(d&&d.length>0&&(l=a.h,l.i=l.i.concat(d)),R){case 1:An(a,5);break;case 4:An(a,10);break;case 3:An(a,6);break;default:An(a,2)}}}function Bl(a,l){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*l}function An(a,l){if(a.j.info("Error code "+l),l==2){var d=h(a.bb,a),m=a.Ua;const R=!m;m=new Ft(m||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||ts(m,"https"),Di(m),R?Pg(m.toString(),d):bg(m.toString(),d)}else Me(2);a.I=0,a.l&&a.l.pa(l),ql(a),kl(a)}r.bb=function(a){a?(this.j.info("Successfully pinged google.com"),Me(2)):(this.j.info("Failed to ping google.com"),Me(1))};function ql(a){if(a.I=0,a.ja=[],a.l){const l=Il(a.h);(l.length!=0||a.i.length!=0)&&(C(a.ja,l),C(a.ja,a.i),a.h.i.length=0,b(a.i),a.i.length=0),a.l.oa()}}function $l(a,l,d){var m=d instanceof Ft?dt(d):new Ft(d);if(m.g!="")l&&(m.g=l+"."+m.g),ns(m,m.u);else{var R=o.location;m=R.protocol,l=l?l+"."+R.hostname:R.hostname,R=+R.port;const S=new Ft(null);m&&ts(S,m),l&&(S.g=l),R&&ns(S,R),d&&(S.h=d),m=S}return d=a.G,l=a.wa,d&&l&&ce(m,d,l),ce(m,"VER",a.ka),cs(a,m),m}function jl(a,l,d){if(l&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Aa&&!a.ma?new fe(new xa({ab:d})):new fe(a.ma),l.Fa(a.L),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function zl(){}r=zl.prototype,r.ra=function(){},r.qa=function(){},r.pa=function(){},r.oa=function(){},r.isActive=function(){return!0},r.Ka=function(){};function Ui(){}Ui.prototype.g=function(a,l){return new He(a,l)};function He(a,l){Ce.call(this),this.g=new Nl(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.sa&&(a?a["X-WebChannel-Client-Profile"]=l.sa:a={"X-WebChannel-Client-Profile":l.sa}),this.g.U=a,(a=l&&l.Qb)&&!_(a)&&(this.g.u=a),this.A=l&&l.supportsCrossDomainXhr||!1,this.v=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!_(l)&&(this.g.G=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new sr(this)}p(He,Ce),He.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},He.prototype.close=function(){Na(this.g)},He.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=Ea(a),a=d);l.i.push(new yg(l.Ya++,a)),l.I==3&&Li(l)},He.prototype.N=function(){this.g.l=null,delete this.j,Na(this.g),delete this.g,He.Z.N.call(this)};function Kl(a){Ta.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(const d in l){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}p(Kl,Ta);function Gl(){wa.call(this),this.status=1}p(Gl,wa);function sr(a){this.g=a}p(sr,zl),sr.prototype.ra=function(){Le(this.g,"a")},sr.prototype.qa=function(a){Le(this.g,new Kl(a))},sr.prototype.pa=function(a){Le(this.g,new Gl)},sr.prototype.oa=function(){Le(this.g,"b")},Ui.prototype.createWebChannel=Ui.prototype.g,He.prototype.send=He.prototype.o,He.prototype.open=He.prototype.m,He.prototype.close=He.prototype.close,Ff=function(){return new Ui},Uf=function(){return Vi()},Mf=Tn,tu={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ci.NO_ERROR=0,Ci.TIMEOUT=8,Ci.HTTP_ERROR=6,eo=Ci,ul.COMPLETE="complete",Lf=ul,rl.EventType=Qr,Qr.OPEN="a",Qr.CLOSE="b",Qr.ERROR="c",Qr.MESSAGE="d",Ce.prototype.listen=Ce.prototype.J,ys=rl,fe.prototype.listenOnce=fe.prototype.K,fe.prototype.getLastError=fe.prototype.Ha,fe.prototype.getLastErrorCode=fe.prototype.ya,fe.prototype.getStatus=fe.prototype.ca,fe.prototype.getResponseJson=fe.prototype.La,fe.prototype.getResponseText=fe.prototype.la,fe.prototype.send=fe.prototype.ea,fe.prototype.setWithCredentials=fe.prototype.Fa,Of=fe}).apply(typeof qi<"u"?qi:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}be.UNAUTHENTICATED=new be(null),be.GOOGLE_CREDENTIALS=new be("google-credentials-uid"),be.FIRST_PARTY=new be("first-party-uid"),be.MOCK_USER=new be("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $r="12.15.0";function lE(r){$r=r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kn=new xu("@firebase/firestore");function dr(){return Kn.logLevel}function D(r,...e){if(Kn.logLevel<=J.DEBUG){const t=e.map(ju);Kn.debug(`Firestore (${$r}): ${r}`,...t)}}function Fe(r,...e){if(Kn.logLevel<=J.ERROR){const t=e.map(ju);Kn.error(`Firestore (${$r}): ${r}`,...t)}}function at(r,...e){if(Kn.logLevel<=J.WARN){const t=e.map(ju);Kn.warn(`Firestore (${$r}): ${r}`,...t)}}function ju(r){if(typeof r=="string")return r;try{return function(t){return JSON.stringify(t)}(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(r,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,Bf(r,n,t)}function Bf(r,e,t){let n=`FIRESTORE (${$r}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw Fe(n),new Error(n)}function N(r,e,t,n){let s="Unexpected state";typeof t=="string"?s=t:n=t,r||Bf(e,s,n)}function W(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class F extends Ot{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class hE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(be.UNAUTHENTICATED))}shutdown(){}}class dE{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class fE{constructor(e){this.t=e,this.currentUser=be.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){N(this.o===void 0,42304);let n=this.i;const s=c=>this.i!==n?(n=this.i,t(c)):Promise.resolve();let i=new Pt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Pt,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},u=c=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>u(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?u(c):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Pt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(n=>this.i!==e?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(N(typeof n.accessToken=="string",31837,{l:n}),new qf(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return N(e===null||typeof e=="string",2055,{h:e}),new be(e)}}class pE{constructor(e,t,n){this.T=e,this.P=t,this.R=n,this.type="FirstParty",this.user=be.FIRST_PARTY,this.I=new Map}A(){return this.R?this.R():null}get headers(){this.I.set("X-Goog-AuthUser",this.T);const e=this.A();return e&&this.I.set("Authorization",e),this.P&&this.I.set("X-Goog-Iam-Authorization-Token",this.P),this.I}}class mE{constructor(e,t,n){this.T=e,this.P=t,this.R=n}getToken(){return Promise.resolve(new pE(this.T,this.P,this.R))}start(e,t){e.enqueueRetryable(()=>t(be.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Th{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class gE{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,je(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){N(this.o===void 0,3512);const n=i=>{i.error!=null&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,D("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>n(i))};const s=i=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Th(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(N(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Th(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _E(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const s=_E(40);for(let i=0;i<s.length;++i)n.length<20&&s[i]<t&&(n+=e.charAt(s[i]%62))}return n}}function G(r,e){return r<e?-1:r>e?1:0}function nu(r,e){const t=Math.min(r.length,e.length);for(let n=0;n<t;n++){const s=r.charAt(n),i=e.charAt(n);if(s!==i)return qa(s)===qa(i)?G(s,i):qa(s)?1:-1}return G(r.length,e.length)}const yE=55296,IE=57343;function qa(r){const e=r.charCodeAt(0);return e>=yE&&e<=IE}function wr(r,e,t){return r.length===e.length&&r.every((n,s)=>t(n,e[s]))}function $f(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vr="__name__";class pt{constructor(e,t,n){t===void 0?t=0:t>e.length&&B(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&B(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return pt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof pt?e.forEach(n=>{t.push(n)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let s=0;s<n;s++){const i=pt.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return G(e.length,t.length)}static compareSegments(e,t){const n=pt.isNumericId(e),s=pt.isNumericId(t);return n&&!s?-1:!n&&s?1:n&&s?pt.extractNumericId(e).compare(pt.extractNumericId(t)):nu(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return on.fromString(e.substring(4,e.length-2))}}class ee extends pt{construct(e,t,n){return new ee(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new F(x.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(s=>s.length>0))}return new ee(t)}static emptyPath(){return new ee([])}}const EE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class le extends pt{construct(e,t,n){return new le(e,t,n)}static isValidIdentifier(e){return EE.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),le.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===vr}static keyField(){return new le([vr])}static fromServerFormat(e){const t=[];let n="",s=0;const i=()=>{if(n.length===0)throw new F(x.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;s<e.length;){const u=e[s];if(u==="\\"){if(s+1===e.length)throw new F(x.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new F(x.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=c,s+=2}else u==="`"?(o=!o,s++):u!=="."||o?(n+=u,s++):(i(),s++)}if(i(),o)throw new F(x.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new le(t)}static emptyPath(){return new le([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e){this.path=e}static fromPath(e){return new U(ee.fromString(e))}static fromName(e){return new U(ee.fromString(e).popFirst(5))}static empty(){return new U(ee.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ee.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ee.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new U(new ee(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TE(r,e,t){if(!t)throw new F(x.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function wE(r,e,t,n){if(e===!0&&n===!0)throw new F(x.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function wh(r){if(!U.isDocumentKey(r))throw new F(x.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function hi(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}function Ku(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":B(12329,{type:typeof r})}function Ar(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new F(x.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ku(r);throw new F(x.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _e(r,e){const t={typeString:r};return e&&(t.value=e),t}function di(r,e){if(!hi(r))throw new F(x.INVALID_ARGUMENT,"JSON must be an object");let t;for(const n in e)if(e[n]){const s=e[n].typeString,i="value"in e[n]?{value:e[n].value}:void 0;if(!(n in r)){t=`JSON missing required field: '${n}'`;break}const o=r[n];if(s&&typeof o!==s){t=`JSON field '${n}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${n}' field to equal '${i.value}'`;break}}if(t)throw new F(x.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vh=-62135596800,Ah=1e6;class se{static now(){return se.fromMillis(Date.now())}static fromDate(e){return se.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*Ah);return new se(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new F(x.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new F(x.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<vh)throw new F(x.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new F(x.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ah}_compareTo(e){return this.seconds===e.seconds?G(this.nanoseconds,e.nanoseconds):G(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:se._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(di(e,se._jsonSchema))return new se(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-vh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}se._jsonSchemaVersion="firestore/timestamp/1.0",se._jsonSchema={type:_e("string",se._jsonSchemaVersion),seconds:_e("number"),nanoseconds:_e("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{static fromTimestamp(e){return new q(e)}static min(){return new q(new se(0,0))}static max(){return new q(new se(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fs=-1;class Io{constructor(e,t,n,s){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=s}}function ru(r){return r.fields.find(e=>e.kind===2)}function bn(r){return r.fields.filter(e=>e.kind!==2)}Io.UNKNOWN_ID=-1;class to{constructor(e,t){this.fieldPath=e,this.kind=t}}class Bs{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Bs(0,Ze.min())}}function vE(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,s=q.fromTimestamp(n===1e9?new se(t+1,0):new se(t,n));return new Ze(s,U.empty(),e)}function jf(r){return new Ze(r.readTime,r.key,Fs)}class Ze{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Ze(q.min(),U.empty(),Fs)}static max(){return new Ze(q.max(),U.empty(),Fs)}}function Gu(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=U.comparator(r.documentKey,e.documentKey),t!==0?t:G(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zf="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Kf{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Jn(r){if(r.code!==x.FAILED_PRECONDITION||r.message!==zf)throw r;D("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&B(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new A((n,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(n,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(n,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof A?t:A.resolve(t)}catch(t){return A.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):A.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):A.reject(t)}static resolve(e){return new A((t,n)=>{t(e)})}static reject(e){return new A((t,n)=>{n(e)})}static waitFor(e){return new A((t,n)=>{let s=0,i=0,o=!1;e.forEach(u=>{++s,u.next(()=>{++i,o&&i===s&&t()},c=>n(c))}),o=!0,i===s&&t()})}static or(e){let t=A.resolve(!1);for(const n of e)t=t.next(s=>s?A.resolve(s):n());return t}static forEach(e,t){const n=[];return e.forEach((s,i)=>{n.push(t.call(this,s,i))}),this.waitFor(n)}static mapArray(e,t){return new A((n,s)=>{const i=e.length,o=new Array(i);let u=0;for(let c=0;c<i;c++){const h=c;t(e[h]).next(f=>{o[h]=f,++u,u===i&&n(o)},f=>s(f))}})}static doWhile(e,t){return new A((n,s)=>{const i=()=>{e()===!0?t().next(()=>{i()},s):n()};i()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qe="SimpleDb";class qo{static open(e,t,n,s){try{return new qo(t,e.transaction(s,n))}catch(i){throw new As(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.v=new Pt,this.transaction.oncomplete=()=>{this.v.resolve()},this.transaction.onabort=()=>{t.error?this.v.reject(new As(e,t.error)):this.v.resolve()},this.transaction.onerror=n=>{const s=Hu(n.target.error);this.v.reject(new As(e,s))}}get S(){return this.v.promise}abort(e){e&&this.v.reject(e),this.aborted||(D(Qe,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}D(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new RE(t)}}class an{static delete(e){return D(Qe,"Removing database:",e),Vn(Fd().indexedDB.deleteDatabase(e)).toPromise()}static C(){if(!Hd())return!1;if(an.F())return!0;const e=we(),t=an.O(e),n=0<t&&t<10,s=Gf(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||i)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)==null?void 0:e.__PRIVATE_USE_MOCK_PERSISTENCE)==="YES"}static M(e,t){return e.store(t)}static O(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.N=n,this.L=null,an.O(we())===12.2&&Fe("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async B(e){return this.db||(D(Qe,"Opening database:",this.name),this.db=await new Promise((t,n)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{n(new As(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?n(new F(x.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new F(x.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new As(e,o))},s.onupgradeneeded=i=>{D(Qe,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.N.U(o,s.transaction,i.oldVersion,this.version).next(()=>{D(Qe,"Database upgrade to version "+this.version+" complete")})}})),this.k&&(this.db.onversionchange=t=>this.k(t)),this.db}q(e){this.k=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.B(e);const u=qo.open(this.db,e,i?"readonly":"readwrite",n),c=s(u).next(h=>(u.D(),h)).catch(h=>(u.abort(h),A.reject(h))).toPromise();return c.catch(()=>{}),await u.S,c}catch(u){const c=u,h=c.name!=="FirebaseError"&&o<3;if(D(Qe,"Transaction failed with error:",c.message,"Retrying:",h),this.close(),!h)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Gf(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class AE{constructor(e){this.$=e,this.K=!1,this.W=null}get isDone(){return this.K}get G(){return this.W}set cursor(e){this.$=e}done(){this.K=!0}j(e){this.W=e}delete(){return Vn(this.$.delete())}}class As extends F{constructor(e,t){super(x.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function yn(r){return r.name==="IndexedDbTransactionError"}class RE{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(D(Qe,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(D(Qe,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),Vn(n)}add(e){return D(Qe,"ADD",this.store.name,e,e),Vn(this.store.add(e))}get(e){return Vn(this.store.get(e)).next(t=>(t===void 0&&(t=null),D(Qe,"GET",this.store.name,e,t),t))}delete(e){return D(Qe,"DELETE",this.store.name,e),Vn(this.store.delete(e))}count(){return D(Qe,"COUNT",this.store.name),Vn(this.store.count())}H(e,t){const n=this.options(e,t),s=n.index?this.store.index(n.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(n.range);return new A((o,u)=>{i.onerror=c=>{u(c.target.error)},i.onsuccess=c=>{o(c.target.result)}})}{const i=this.cursor(n),o=[];return this.J(i,(u,c)=>{o.push(c)}).next(()=>o)}}Y(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new A((s,i)=>{n.onerror=o=>{i(o.target.error)},n.onsuccess=o=>{s(o.target.result)}})}Z(e,t){D(Qe,"DELETE ALL",this.store.name);const n=this.options(e,t);n.X=!1;const s=this.cursor(n);return this.J(s,(i,o,u)=>u.delete())}ee(e,t){let n;t?n=e:(n={},t=e);const s=this.cursor(n);return this.J(s,t)}te(e){const t=this.cursor({});return new A((n,s)=>{t.onerror=i=>{const o=Hu(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next(u=>{u?o.continue():n()}):n()}})}J(e,t){const n=[];return new A((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const u=o.target.result;if(!u)return void s();const c=new AE(u),h=t(u.primaryKey,u.value,c);if(h instanceof A){const f=h.catch(p=>(c.done(),A.reject(p)));n.push(f)}c.isDone?s():c.G===null?u.continue():u.continue(c.G)}}).next(()=>A.waitFor(n))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.X?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function Vn(r){return new A((e,t)=>{r.onsuccess=n=>{const s=n.target.result;e(s)},r.onerror=n=>{const s=Hu(n.target.error);t(s)}})}let Rh=!1;function Hu(r){const e=an.O(we());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new F("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Rh||(Rh=!0,setTimeout(()=>{throw n},0)),n}}return r}const Rs="IndexBackfiller";class PE{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){D(Rs,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.ne.ie();D(Rs,`Documents written: ${t}`)}catch(t){yn(t)?D(Rs,"Ignoring IndexedDB error during index backfill: ",t):await Jn(t)}await this.re(6e4)})}}class bE{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.se(t,e))}se(e,t){const n=new Set;let s=t,i=!0;return A.doWhile(()=>i===!0&&s>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!n.has(o))return D(Rs,`Processing collection: ${o}`),this._e(e,o,s).next(u=>{s-=u,n.add(o)});i=!1})).next(()=>t-s)}_e(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(s=>this.localStore.localDocuments.getNextDocuments(e,t,s,n).next(i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.oe(s,i)).next(u=>(D(Rs,`Updating offset: ${u}`),this.localStore.indexManager.updateCollectionGroup(e,t,u))).next(()=>o.size)}))}oe(e,t){let n=e;return t.changes.forEach((s,i)=>{const o=jf(i);Gu(o,n)>0&&(n=o)}),new Ze(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rt{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ae(n),this.ue=n=>t.writeSequenceNumber(n))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}rt.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ln=-1;function $o(r){return r==null}function Rr(r){return r===0&&1/r==-1/0}function SE(r){return typeof r=="number"&&Number.isInteger(r)&&!Rr(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}function VE(r){return typeof r=="string"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eo="";function Ne(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=Ph(e)),e=CE(r.get(t),e);return Ph(e)}function CE(r,e){let t=e;const n=r.length;for(let s=0;s<n;s++){const i=r.charAt(s);switch(i){case"\0":t+="";break;case Eo:t+="";break;default:t+=i}}return t}function Ph(r){return r+Eo+""}function mt(r){const e=r.length;if(N(e>=2,64408,{path:r}),e===2)return N(r.charAt(0)===Eo&&r.charAt(1)==="",56145,{path:r}),ee.emptyPath();const t=e-2,n=[];let s="";for(let i=0;i<e;){const o=r.indexOf(Eo,i);switch((o<0||o>t)&&B(50515,{path:r}),r.charAt(o+1)){case"":const u=r.substring(i,o);let c;s.length===0?c=u:(s+=u,c=s,s=""),n.push(c);break;case"":s+=r.substring(i,o),s+="\0";break;case"":s+=r.substring(i,o+1);break;default:B(61167,{path:r})}i=o+2}return new ee(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sn="remoteDocuments",fi="owner",ir="owner",qs="mutationQueues",xE="userId",ct="mutations",bh="batchId",kn="userMutationsIndex",Sh=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function no(r,e){return[r,Ne(e)]}function Hf(r,e,t){return[r,Ne(e),t]}const DE={},Pr="documentMutations",To="remoteDocumentsV14",NE=["prefixPath","collectionGroup","readTime","documentId"],ro="documentKeyIndex",kE=["prefixPath","collectionGroup","documentId"],Wf="collectionGroupIndex",OE=["collectionGroup","readTime","prefixPath","documentId"],$s="remoteDocumentGlobal",su="remoteDocumentGlobalKey",br="targets",Qf="queryTargetsIndex",LE=["canonicalId","targetId"],Sr="targetDocuments",ME=["targetId","path"],Wu="documentTargetsIndex",UE=["path","targetId"],wo="targetGlobalKey",Mn="targetGlobal",js="collectionParents",FE=["collectionId","parent"],Vr="clientMetadata",BE="clientId",jo="bundles",qE="bundleId",zo="namedQueries",$E="name",Qu="indexConfiguration",jE="indexId",iu="collectionGroupIndex",zE="collectionGroup",Ps="indexState",KE=["indexId","uid"],Yf="sequenceNumberIndex",GE=["uid","sequenceNumber"],bs="indexEntries",HE=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Jf="documentKeyIndex",WE=["indexId","uid","orderedDocumentKey"],Ko="documentOverlays",QE=["userId","collectionPath","documentId"],ou="collectionPathOverlayIndex",YE=["userId","collectionPath","largestBatchId"],Xf="collectionGroupOverlayIndex",JE=["userId","collectionGroup","largestBatchId"],Yu="globals",XE="name",Zf=[qs,ct,Pr,Sn,br,fi,Mn,Sr,Vr,$s,js,jo,zo],ZE=[...Zf,Ko],ep=[qs,ct,Pr,To,br,fi,Mn,Sr,Vr,$s,js,jo,zo,Ko],tp=ep,Ju=[...tp,Qu,Ps,bs],eT=Ju,np=[...Ju,Yu],tT=np;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au extends Kf{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function ve(r,e){const t=W(r);return an.M(t.le,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(e,t){this.comparator=e,this.root=t||Se.EMPTY}insert(e,t){return new he(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Se.BLACK,null,null))}remove(e){return new he(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Se.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const s=this.comparator(e,n.key);if(s===0)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new $i(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new $i(this.root,e,this.comparator,!1)}getReverseIterator(){return new $i(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new $i(this.root,e,this.comparator,!0)}}class $i{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Se{constructor(e,t,n,s,i){this.key=e,this.value=t,this.color=n??Se.RED,this.left=s??Se.EMPTY,this.right=i??Se.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,i){return new Se(e??this.key,t??this.value,n??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this;const i=n(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,n),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Se.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Se.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Se.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Se.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw B(43730,{key:this.key,value:this.value});if(this.right.isRed())throw B(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw B(27949);return e+(this.isRed()?0:1)}}Se.EMPTY=null,Se.RED=!0,Se.BLACK=!1;Se.EMPTY=new class{constructor(){this.size=0}get key(){throw B(57766)}get value(){throw B(16141)}get color(){throw B(16727)}get left(){throw B(29726)}get right(){throw B(36894)}copy(e,t,n,s,i){return this}insert(e,t,n){return new Se(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e){this.comparator=e,this.data=new he(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Vh(this.data.getIterator())}getIteratorFrom(e){return new Vh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(n=>{t=t.add(n)}),t}isEqual(e){if(!(e instanceof re)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new re(this.comparator);return t.data=e,t}}class Vh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function or(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e){this.fields=e,e.sort(le.comparator)}static empty(){return new st([])}unionWith(e){let t=new re(le.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new st(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return wr(this.fields,e.fields,(t,n)=>t.isEqual(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vo(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function Xn(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function nT(r,e){const t=[];for(const n in r)Object.prototype.hasOwnProperty.call(r,n)&&t.push(e(r[n],n,r));return t}function rp(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new sp("Invalid base64 string: "+i):i}}(e);return new de(t)}static fromUint8Array(e){const t=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new de(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return G(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}de.EMPTY_BYTE_STRING=new de("");const rT=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function xt(r){if(N(!!r,39018),typeof r=="string"){let e=0;const t=rT.exec(r);if(N(!!t,46558,{timestamp:r}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:ae(r.seconds),nanos:ae(r.nanos)}}function ae(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function Dt(r){return typeof r=="string"?de.fromBase64String(r):de.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ip="server_timestamp",op="__type__",ap="__previous_value__",up="__local_write_time__";function Go(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[op])==null?void 0:n.stringValue)===ip}function pi(r){const e=r.mapValue.fields[ap];return Go(e)?pi(e):e}function Cr(r){const e=xt(r.mapValue.fields[up].timestampValue);return new se(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sT{constructor(e,t,n,s,i,o,u,c,h,f,p){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=u,this.longPollingOptions=c,this.useFetchStreams=h,this.isUsingEmulator=f,this.apiKey=p}}const uu="(default)";class Gn{constructor(e,t){this.projectId=e,this.database=t||uu}static empty(){return new Gn("","")}get isDefaultDatabase(){return this.database===uu}isEqual(e){return e instanceof Gn&&e.projectId===this.projectId&&e.database===this.database}}function iT(r,e){if(!Object.prototype.hasOwnProperty.apply(r.options,["projectId"]))throw new F(x.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Gn(r.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xu="__type__",cp="__max__",nn={mapValue:{fields:{__type__:{stringValue:cp}}}},Zu="__vector__",Hn="value",Et={nullValue:"NULL_VALUE"},Ke={booleanValue:!0},Pe={booleanValue:!1};function ye(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Go(r)?4:lp(r)?9007199254740991:Wn(r)?10:11:B(28295,{value:r})}function ut(r,e,t){if(r===e)return!0;const n=ye(r);if(n!==ye(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return Cr(r).isEqual(Cr(e));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const u=xt(i.timestampValue),c=xt(o.timestampValue);return u.seconds===c.seconds&&u.nanos===c.nanos}(r,e);case 5:return r.stringValue===e.stringValue;case 6:return function(i,o){return Dt(i.bytesValue).isEqual(Dt(o.bytesValue))}(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return function(i,o){return ae(i.geoPointValue.latitude)===ae(o.geoPointValue.latitude)&&ae(i.geoPointValue.longitude)===ae(o.geoPointValue.longitude)}(r,e);case 2:return function(i,o,u){if("integerValue"in i&&"integerValue"in o)return ae(i.integerValue)===ae(o.integerValue);let c,h;if("doubleValue"in i&&"doubleValue"in o)c=ae(i.doubleValue),h=ae(o.doubleValue);else{if(!(u!=null&&u.Ee))return!1;c=ae(i.integerValue??i.doubleValue),h=ae(o.integerValue??o.doubleValue)}return c===h?!!(u!=null&&u.he)||Rr(c)===Rr(h):!!(u===void 0||u.Te)&&isNaN(c)&&isNaN(h)}(r,e,t);case 9:return wr(r.arrayValue.values||[],e.arrayValue.values||[],(s,i)=>ut(s,i,t));case 10:case 11:return function(i,o,u){const c=i.mapValue.fields||{},h=o.mapValue.fields||{};if(vo(c)!==vo(h))return!1;for(const f in c)if(c.hasOwnProperty(f)&&(h[f]===void 0||!ut(c[f],h[f],u)))return!1;return!0}(r,e,t);default:return B(52216,{left:r})}}function zs(r,e){return(r.values||[]).find(t=>ut(t,e))!==void 0}function ke(r,e){if(r===e)return 0;const t=ye(r),n=ye(e);if(t!==n)return G(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return G(r.booleanValue,e.booleanValue);case 2:return function(i,o){const u=ae(i.integerValue||i.doubleValue),c=ae(o.integerValue||o.doubleValue);return u<c?-1:u>c?1:u===c?0:isNaN(u)?isNaN(c)?0:-1:1}(r,e);case 3:return Ch(r.timestampValue,e.timestampValue);case 4:return Ch(Cr(r),Cr(e));case 5:return nu(r.stringValue,e.stringValue);case 6:return function(i,o){const u=Dt(i),c=Dt(o);return u.compareTo(c)}(r.bytesValue,e.bytesValue);case 7:return function(i,o){const u=i.split("/"),c=o.split("/");for(let h=0;h<u.length&&h<c.length;h++){const f=G(u[h],c[h]);if(f!==0)return f}return G(u.length,c.length)}(r.referenceValue,e.referenceValue);case 8:return function(i,o){const u=G(ae(i.latitude),ae(o.latitude));return u!==0?u:G(ae(i.longitude),ae(o.longitude))}(r.geoPointValue,e.geoPointValue);case 9:return xh(r.arrayValue,e.arrayValue);case 10:return function(i,o){var I,b,C,L;const u=i.fields||{},c=o.fields||{},h=(I=u[Hn])==null?void 0:I.arrayValue,f=(b=c[Hn])==null?void 0:b.arrayValue,p=G(((C=h==null?void 0:h.values)==null?void 0:C.length)||0,((L=f==null?void 0:f.values)==null?void 0:L.length)||0);return p!==0?p:xh(h,f)}(r.mapValue,e.mapValue);case 11:return function(i,o){if(i===nn.mapValue&&o===nn.mapValue)return 0;if(i===nn.mapValue)return 1;if(o===nn.mapValue)return-1;const u=i.fields||{},c=Object.keys(u),h=o.fields||{},f=Object.keys(h);c.sort(),f.sort();for(let p=0;p<c.length&&p<f.length;++p){const I=nu(c[p],f[p]);if(I!==0)return I;const b=ke(u[c[p]],h[f[p]]);if(b!==0)return b}return G(c.length,f.length)}(r.mapValue,e.mapValue);default:throw B(23264,{Pe:t})}}function Ch(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return G(r,e);const t=xt(r),n=xt(e),s=G(t.seconds,n.seconds);return s!==0?s:G(t.nanos,n.nanos)}function xh(r,e){const t=r.values||[],n=e.values||[];for(let s=0;s<t.length&&s<n.length;++s){const i=ke(t[s],n[s]);if(i!==void 0&&i!==0)return i}return G(t.length,n.length)}function xr(r){return cu(r)}function cu(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(t){const n=xt(t);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(t){return Dt(t).toBase64()}(r.bytesValue):"referenceValue"in r?function(t){return U.fromName(t).toString()}(r.referenceValue):"geoPointValue"in r?function(t){return`geo(${t.latitude},${t.longitude})`}(r.geoPointValue):"arrayValue"in r?function(t){let n="[",s=!0;for(const i of t.values||[])s?s=!1:n+=",",n+=cu(i);return n+"]"}(r.arrayValue):"mapValue"in r?function(t){const n=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of n)i?i=!1:s+=",",s+=`${o}:${cu(t.fields[o])}`;return s+"}"}(r.mapValue):B(61005,{value:r})}function so(r){switch(ye(r)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=pi(r);return e?16+so(e):16;case 5:return 2*r.stringValue.length;case 6:return Dt(r.bytesValue).approximateByteSize();case 7:return r.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((s,i)=>s+so(i),0)}(r.arrayValue);case 10:case 11:return function(n){let s=0;return Xn(n.fields,(i,o)=>{s+=i.length+so(o)}),s}(r.mapValue);default:throw B(13486,{value:r})}}function ec(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function gt(r){return!!r&&"integerValue"in r}function On(r){return!!r&&"doubleValue"in r}function ln(r){return gt(r)||On(r)}function hn(r){return!!r&&"arrayValue"in r}function Ye(r){return!!r&&"nullValue"in r}function Ge(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Un(r){return!!r&&"mapValue"in r}function Wn(r){var t,n;return((n=(((t=r==null?void 0:r.mapValue)==null?void 0:t.fields)||{})[Xu])==null?void 0:n.stringValue)===Zu}function lu(r){var e,t;return(t=(((e=r==null?void 0:r.mapValue)==null?void 0:e.fields)||{})[Hn])==null?void 0:t.arrayValue}function Ss(r){if(r.geoPointValue)return{geoPointValue:{...r.geoPointValue}};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:{...r.timestampValue}};if(r.mapValue){const e={mapValue:{fields:{}}};return Xn(r.mapValue.fields,(t,n)=>e.mapValue.fields[t]=Ss(n)),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ss(r.arrayValue.values[t]);return e}return{...r}}function lp(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===cp}const hp={mapValue:{fields:{[Xu]:{stringValue:Zu},[Hn]:{arrayValue:{}}}}};function oT(r){return"nullValue"in r?Et:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?ec(Gn.empty(),U.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?Wn(r)?hp:{mapValue:{}}:B(35942,{value:r})}function aT(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?ec(Gn.empty(),U.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?hp:"mapValue"in r?Wn(r)?{mapValue:{}}:nn:B(61959,{value:r})}function Dh(r,e){const t=ke(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function Nh(r,e){const t=ke(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this.value=e}static empty(){return new Be({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Un(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ss(t)}setAll(e){let t=le.emptyPath(),n={},s=[];e.forEach((o,u)=>{if(!t.isImmediateParentOf(u)){const c=this.getFieldsMap(t);this.applyChanges(c,n,s),n={},s=[],t=u.popLast()}o?n[u.lastSegment()]=Ss(o):s.push(u.lastSegment())});const i=this.getFieldsMap(t);this.applyChanges(i,n,s)}delete(e){const t=this.field(e.popLast());Un(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ut(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];Un(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){Xn(t,(s,i)=>e[s]=i);for(const s of n)delete e[s]}clone(){return new Be(Ss(this.value))}}function dp(r){const e=[];return Xn(r.fields,(t,n)=>{const s=new le([t]);if(Un(n)){const i=dp(n.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new st(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ho(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Rr(e)?"-0":e}}function tc(r){return{integerValue:""+r}}function nc(r,e,t){return Number.isInteger(e)&&(t!=null&&t.preferIntegers)||SE(e)?tc(e):Ho(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wo{constructor(){this._=void 0}}function uT(r,e,t){return r instanceof Ks?function(s,i){const o={fields:{[op]:{stringValue:ip},[up]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Go(i)&&(i=pi(i)),i&&(o.fields[ap]=i),{mapValue:o}}(t,e):r instanceof Dr?pp(r,e):r instanceof Nr?mp(r,e):r instanceof kr?function(s,i){const o=fp(s,i),u=Ao(o)+Ao(s.Re);return gt(o)&&gt(s.Re)?tc(u):Ho(s.serializer,u)}(r,e):r instanceof Gs?function(s,i){return kh(s,i,Math.min)}(r,e):r instanceof Hs?function(s,i){return kh(s,i,Math.max)}(r,e):void 0}function cT(r,e,t){return r instanceof Dr?pp(r,e):r instanceof Nr?mp(r,e):t}function fp(r,e){return r instanceof kr?ln(e)?e:{integerValue:0}:null}class Ks extends Wo{}class Dr extends Wo{constructor(e){super(),this.elements=e}}function pp(r,e){const t=gp(e);for(const n of r.elements)t.some(s=>ut(s,n))||t.push(n);return{arrayValue:{values:t}}}class Nr extends Wo{constructor(e){super(),this.elements=e}}function mp(r,e){let t=gp(e);for(const n of r.elements)t=t.filter(s=>!ut(s,n));return{arrayValue:{values:t}}}class rc extends Wo{constructor(e,t){super(),this.serializer=e,this.Re=t}}class kr extends rc{}class Gs extends rc{}class Hs extends rc{}function kh(r,e,t){if(!ln(e))return r.Re;const n=t(Ao(e),Ao(r.Re));return gt(e)&&gt(r.Re)?tc(n):Ho(r.serializer,n)}function Ao(r){return ae(r.integerValue||r.doubleValue)}function gp(r){return hn(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lT{constructor(e,t){this.field=e,this.transform=t}}function hT(r,e){return r.field.isEqual(e.field)&&function(n,s){return n instanceof Dr&&s instanceof Dr||n instanceof Nr&&s instanceof Nr?wr(n.elements,s.elements,ut):n instanceof kr&&s instanceof kr||n instanceof Gs&&s instanceof Gs||n instanceof Hs&&s instanceof Hs?ut(n.Re,s.Re):n instanceof Ks&&s instanceof Ks}(r.transform,e.transform)}class dT{constructor(e,t){this.version=e,this.transformResults=t}}class Je{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Je}static exists(e){return new Je(void 0,e)}static updateTime(e){return new Je(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function io(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class Qo{}function _p(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new sc(r.key,Je.none()):new jr(r.key,r.data,Je.none());{const t=r.data,n=Be.empty();let s=new re(le.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?n.delete(i):n.set(i,o),s=s.add(i)}return new In(r.key,n,new st(s.toArray()),Je.none())}}function fT(r,e,t){r instanceof jr?function(s,i,o){const u=s.value.clone(),c=Lh(s.fieldTransforms,i,o.transformResults);u.setAll(c),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(r,e,t):r instanceof In?function(s,i,o){if(!io(s.precondition,i))return void i.convertToUnknownDocument(o.version);const u=Lh(s.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(yp(s)),c.setAll(u),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(r,e,t):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Vs(r,e,t,n){return r instanceof jr?function(i,o,u,c){if(!io(i.precondition,o))return u;const h=i.value.clone(),f=Mh(i.fieldTransforms,c,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(r,e,t,n):r instanceof In?function(i,o,u,c){if(!io(i.precondition,o))return u;const h=Mh(i.fieldTransforms,c,o),f=o.data;return f.setAll(yp(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),u===null?null:u.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(r,e,t,n):function(i,o,u){return io(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):u}(r,e,t)}function pT(r,e){let t=null;for(const n of r.fieldTransforms){const s=e.data.field(n.field),i=fp(n.transform,s||null);i!=null&&(t===null&&(t=Be.empty()),t.set(n.field,i))}return t||null}function Oh(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!function(n,s){return n===void 0&&s===void 0||!(!n||!s)&&wr(n,s,(i,o)=>hT(i,o))}(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class jr extends Qo{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class In extends Qo{constructor(e,t,n,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function yp(r){const e=new Map;return r.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}}),e}function Lh(r,e,t){const n=new Map;N(r.length===t.length,32656,{Ie:t.length,Ae:r.length});for(let s=0;s<t.length;s++){const i=r[s],o=i.transform,u=e.data.field(i.field);n.set(i.field,cT(o,u,t[s]))}return n}function Mh(r,e,t){const n=new Map;for(const s of r){const i=s.transform,o=t.data.field(s.field);n.set(s.field,uT(i,o,e))}return n}class sc extends Qo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Ip extends Qo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Or{constructor(e,t){this.position=e,this.inclusive=t}}function Uh(r,e,t){let n=0;for(let s=0;s<r.position.length;s++){const i=e[s],o=r.position[s];if(i.field.isKeyField()?n=U.comparator(U.fromName(o.referenceValue),t.key):n=ke(o,t.data.field(i.field)),i.dir==="desc"&&(n*=-1),n!==0)break}return n}function Fh(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!ut(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep{}class X extends Ep{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new mT(e,t,n):t==="array-contains"?new yT(e,n):t==="in"?new Pp(e,n):t==="not-in"?new IT(e,n):t==="array-contains-any"?new ET(e,n):new X(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new gT(e,n):new _T(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(ke(t,this.value)):t!==null&&ye(this.value)===ye(t)&&this.matchesComparison(ke(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return B(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ie extends Ep{constructor(e,t){super(),this.filters=e,this.op=t,this.Ve=null}static create(e,t){return new ie(e,t)}matches(e){return Lr(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Ve!==null||(this.Ve=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Ve}getFilters(){return Object.assign([],this.filters)}}function Lr(r){return r.op==="and"}function hu(r){return r.op==="or"}function ic(r){return Tp(r)&&Lr(r)}function Tp(r){for(const e of r.filters)if(e instanceof ie)return!1;return!0}function du(r){if(r instanceof X)return r.field.canonicalString()+r.op.toString()+xr(r.value);if(ic(r))return r.filters.map(e=>du(e)).join(",");{const e=r.filters.map(t=>du(t)).join(",");return`${r.op}(${e})`}}function wp(r,e){return r instanceof X?function(n,s){return s instanceof X&&n.op===s.op&&n.field.isEqual(s.field)&&ut(n.value,s.value)}(r,e):r instanceof ie?function(n,s){return s instanceof ie&&n.op===s.op&&n.filters.length===s.filters.length?n.filters.reduce((i,o,u)=>i&&wp(o,s.filters[u]),!0):!1}(r,e):void B(19439)}function vp(r,e){const t=r.filters.concat(e);return ie.create(t,r.op)}function Ap(r){return r instanceof X?function(t){return`${t.field.canonicalString()} ${t.op} ${xr(t.value)}`}(r):r instanceof ie?function(t){return t.op.toString()+" {"+t.getFilters().map(Ap).join(" ,")+"}"}(r):"Filter"}class mT extends X{constructor(e,t,n){super(e,t,n),this.key=U.fromName(n.referenceValue)}matches(e){const t=U.comparator(e.key,this.key);return this.matchesComparison(t)}}class gT extends X{constructor(e,t){super(e,"in",t),this.keys=Rp("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class _T extends X{constructor(e,t){super(e,"not-in",t),this.keys=Rp("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Rp(r,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(n=>U.fromName(n.referenceValue))}class yT extends X{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return hn(t)&&zs(t.arrayValue,this.value)}}class Pp extends X{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&zs(this.value.arrayValue,t)}}class IT extends X{constructor(e,t){super(e,"not-in",t)}matches(e){if(zs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!zs(this.value.arrayValue,t)}}class ET extends X{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!hn(t)||!t.arrayValue.values)&&t.arrayValue.values.some(n=>zs(this.value.arrayValue,n))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(e,t="asc"){this.field=e,this.dir=t}}function TT(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(e,t,n,s,i,o,u){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=i,this.data=o,this.documentState=u}static newInvalidDocument(e){return new pe(e,0,q.min(),q.min(),q.min(),Be.empty(),0)}static newFoundDocument(e,t,n,s){return new pe(e,1,t,q.min(),n,s,0)}static newNoDocument(e,t){return new pe(e,2,t,q.min(),q.min(),Be.empty(),0)}static newUnknownDocument(e,t){return new pe(e,3,t,q.min(),q.min(),Be.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Be.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Be.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof pe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new pe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wT{constructor(e,t=null,n=[],s=[],i=null,o=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=o,this.endAt=u,this.de=null}}function fu(r,e=null,t=[],n=[],s=null,i=null,o=null){return new wT(r,e,t,n,s,i,o)}function Po(r){const e=W(r);if(e.de===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(n=>du(n)).join(","),t+="|ob:",t+=e.orderBy.map(n=>function(i){return i.field.canonicalString()+i.dir}(n)).join(","),$o(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(n=>xr(n)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(n=>xr(n)).join(",")),e.de=t}return e.de}function oc(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!TT(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!wp(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!Fh(r.startAt,e.startAt)&&Fh(r.endAt,e.endAt)}function en(r){return!!r.isCorePipeline}function ac(r){return!!r.path&&U.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function bo(r,e){return r.filters.filter(t=>t instanceof X&&t.field.isEqual(e))}function Bh(r,e,t){let n=Et,s=!0;for(const i of bo(r,e)){let o=Et,u=!0;switch(i.op){case"<":case"<=":o=oT(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,u=!1;break;case"!=":case"not-in":o=Et}Dh({value:n,inclusive:s},{value:o,inclusive:u})<0&&(n=o,s=u)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];Dh({value:n,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}function qh(r,e,t){let n=nn,s=!0;for(const i of bo(r,e)){let o=nn,u=!0;switch(i.op){case">=":case">":o=aT(i.value),u=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,u=!1;break;case"!=":case"not-in":o=nn}Nh({value:n,inclusive:s},{value:o,inclusive:u})>0&&(n=o,s=u)}if(t!==null){for(let i=0;i<r.orderBy.length;++i)if(r.orderBy[i].field.isEqual(e)){const o=t.position[i];Nh({value:n,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(n=o,s=t.inclusive);break}}return{value:n,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yo{constructor(e,t=null,n=[],s=[],i=null,o="F",u=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=o,this.startAt=u,this.endAt=c,this.fe=null,this.me=null,this.pe=null,this.startAt,this.endAt}}function vT(r,e,t,n,s,i,o,u){return new Yo(r,e,t,n,s,i,o,u)}function Jo(r){return new Yo(r)}function $h(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function AT(r){return U.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function RT(r){return r.collectionGroup!==null}function Cs(r){const e=W(r);if(e.fe===null){e.fe=[];const t=new Set;for(const i of e.explicitOrderBy)e.fe.push(i),t.add(i.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let u=new re(le.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(u=u.add(h.field))})}),u})(e).forEach(i=>{t.has(i.canonicalString())||i.isKeyField()||e.fe.push(new Ro(i,n))}),t.has(le.keyField().canonicalString())||e.fe.push(new Ro(le.keyField(),n))}return e.fe}function it(r){const e=W(r);return e.me||(e.me=PT(e,Cs(r))),e.me}function PT(r,e){if(r.limitType==="F")return fu(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ro(s.field,i)});const t=r.endAt?new Or(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Or(r.startAt.position,r.startAt.inclusive):null;return fu(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function pu(r,e,t){return new Yo(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function bT(r,e){return oc(it(r),it(e))&&r.limitType===e.limitType}function xs(r){return`Query(target=${function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(s=>Ap(s)).join(", ")}]`),$o(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(s=>xr(s)).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(s=>xr(s)).join(",")),`Target(${n})`}(it(r))}; limitType=${r.limitType})`}function Xo(r,e){return e.isFoundDocument()&&function(n,s){const i=s.key.path;return n.collectionGroup!==null?s.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(i):U.isDocumentKey(n.path)?n.path.isEqual(i):n.path.isImmediateParentOf(i)}(r,e)&&function(n,s){for(const i of Cs(n))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(r,e)&&function(n,s){for(const i of n.filters)if(!i.matches(s))return!1;return!0}(r,e)&&function(n,s){return!(n.startAt&&!function(o,u,c){const h=Uh(o,u,c);return o.inclusive?h<=0:h<0}(n.startAt,Cs(n),s)||n.endAt&&!function(o,u,c){const h=Uh(o,u,c);return o.inclusive?h>=0:h>0}(n.endAt,Cs(n),s))}(r,e)}function uc(r){return(e,t)=>{let n=!1;for(const s of Cs(r)){const i=ST(s,e,t);if(i!==0)return i;n=n||s.field.isKeyField()}return 0}}function ST(r,e,t){const n=r.field.isKeyField()?U.comparator(e.key,t.key):function(i,o,u){const c=o.data.field(i),h=u.data.field(i);return c!==null&&h!==null?ke(c,h):B(42886)}(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return B(19790,{direction:r.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VT{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var me,Z;function CT(r){switch(r){case x.OK:return B(64938);case x.CANCELLED:case x.UNKNOWN:case x.DEADLINE_EXCEEDED:case x.RESOURCE_EXHAUSTED:case x.INTERNAL:case x.UNAVAILABLE:case x.UNAUTHENTICATED:return!1;case x.INVALID_ARGUMENT:case x.NOT_FOUND:case x.ALREADY_EXISTS:case x.PERMISSION_DENIED:case x.FAILED_PRECONDITION:case x.ABORTED:case x.OUT_OF_RANGE:case x.UNIMPLEMENTED:case x.DATA_LOSS:return!0;default:return B(15467,{code:r})}}function bp(r){if(r===void 0)return Fe("GRPC error has no .code"),x.UNKNOWN;switch(r){case me.OK:return x.OK;case me.CANCELLED:return x.CANCELLED;case me.UNKNOWN:return x.UNKNOWN;case me.DEADLINE_EXCEEDED:return x.DEADLINE_EXCEEDED;case me.RESOURCE_EXHAUSTED:return x.RESOURCE_EXHAUSTED;case me.INTERNAL:return x.INTERNAL;case me.UNAVAILABLE:return x.UNAVAILABLE;case me.UNAUTHENTICATED:return x.UNAUTHENTICATED;case me.INVALID_ARGUMENT:return x.INVALID_ARGUMENT;case me.NOT_FOUND:return x.NOT_FOUND;case me.ALREADY_EXISTS:return x.ALREADY_EXISTS;case me.PERMISSION_DENIED:return x.PERMISSION_DENIED;case me.FAILED_PRECONDITION:return x.FAILED_PRECONDITION;case me.ABORTED:return x.ABORTED;case me.OUT_OF_RANGE:return x.OUT_OF_RANGE;case me.UNIMPLEMENTED:return x.UNIMPLEMENTED;case me.DATA_LOSS:return x.DATA_LOSS;default:return B(39323,{code:r})}}(Z=me||(me={}))[Z.OK=0]="OK",Z[Z.CANCELLED=1]="CANCELLED",Z[Z.UNKNOWN=2]="UNKNOWN",Z[Z.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Z[Z.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Z[Z.NOT_FOUND=5]="NOT_FOUND",Z[Z.ALREADY_EXISTS=6]="ALREADY_EXISTS",Z[Z.PERMISSION_DENIED=7]="PERMISSION_DENIED",Z[Z.UNAUTHENTICATED=16]="UNAUTHENTICATED",Z[Z.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Z[Z.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Z[Z.ABORTED=10]="ABORTED",Z[Z.OUT_OF_RANGE=11]="OUT_OF_RANGE",Z[Z.UNIMPLEMENTED=12]="UNIMPLEMENTED",Z[Z.INTERNAL=13]="INTERNAL",Z[Z.UNAVAILABLE=14]="UNAVAILABLE",Z[Z.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[s,i]of n)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),s=this.inner[n];if(s===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return n.length===1?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Xn(this.inner,(t,n)=>{for(const[s,i]of n)e(s,i)})}isEmpty(){return rp(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xT=new he(U.comparator);function Ee(){return xT}const Sp=new he(U.comparator);function fr(...r){let e=Sp;for(const t of r)e=e.insert(t.key,t);return e}function Vp(r){let e=Sp;return r.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function tt(){return Ds()}function Cp(){return Ds()}function Ds(){return new Mt(r=>r.toString(),(r,e)=>r.isEqual(e))}const DT=new he(U.comparator),NT=new re(U.comparator);function Q(...r){let e=NT;for(const t of r)e=e.add(t);return e}const kT=new re(G);function OT(){return kT}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LT(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MT=new on([4294967295,4294967295],0);function jh(r){const e=LT().encode(r),t=new kf;return t.update(e),new Uint8Array(t.digest())}function zh(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new on([t,n],0),new on([s,i],0)]}class cc{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new Is(`Invalid padding: ${t}`);if(n<0)throw new Is(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new Is(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new Is(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.ye=on.fromNumber(this.ge)}we(e,t,n){let s=e.add(t.multiply(on.fromNumber(n)));return s.compare(MT)===1&&(s=new on([s.getBits(0),s.getBits(1)],0)),s.modulo(this.ye).toNumber()}be(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=jh(e),[n,s]=zh(t);for(let i=0;i<this.hashCount;i++){const o=this.we(n,s,i);if(!this.be(o))return!1}return!0}static create(e,t,n){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new cc(i,s,t);return n.forEach(u=>o.insert(u)),o}insert(e){if(this.ge===0)return;const t=jh(e),[n,s]=zh(t);for(let i=0;i<this.hashCount;i++){const o=this.we(n,s,i);this.ve(o)}}ve(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class Is extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mi{constructor(e,t,n,s,i,o){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const s=new Map;return s.set(e,gi.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new mi(q.min(),s,new he(G),Ee(),Ee(),Q())}}class gi{constructor(e,t,n,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new gi(n,t,Q(),Q(),Q())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oo{constructor(e,t,n,s){this.Se=e,this.removedTargetIds=t,this.key=n,this.De=s}}class xp{constructor(e,t){this.targetId=e,this.xe=t}}class Dp{constructor(e,t,n=de.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class Kh{constructor(e){this.targetId=e,this.Ce=0,this.Fe=Gh(),this.Oe=de.EMPTY_BYTE_STRING,this.Me=!1,this.Ne=!0}get current(){return this.Me}get resumeToken(){return this.Oe}get Le(){return this.Ce!==0}get Be(){return this.Ne}Ue(e){e.approximateByteSize()>0&&(this.Ne=!0,this.Oe=e)}ke(){let e=Q(),t=Q(),n=Q();return this.Fe.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:B(38017,{changeType:i})}}),new gi(this.Oe,this.Me,e,t,n)}qe(){this.Ne=!1,this.Fe=Gh()}$e(e,t){this.Ne=!0,this.Fe=this.Fe.insert(e,t)}Ke(e){this.Ne=!0,this.Fe=this.Fe.remove(e)}We(){this.Ce+=1}Qe(){this.Ce-=1,N(this.Ce>=0,3241,{Ce:this.Ce,targetId:this.targetId})}Ge(){this.Ne=!0,this.Me=!0}}const ls="WatchChangeAggregator";class UT{constructor(e){this.ze=e,this.je=new Map,this.He=Ee(),this.Je=ji(),this.Ye=Ee(),this.Ze=ji(),this.Xe=new he(G)}et(e){for(const t of e.Se)e.De&&e.De.isFoundDocument()?this.tt(t,e.De):this.nt(t,e.key,e.De);for(const t of e.removedTargetIds)this.nt(t,e.key,e.De)}rt(e){this.forEachTarget(e,t=>{const n=this.je.get(t);if(n)switch(e.state){case 0:this.it(t)&&n.Ue(e.resumeToken);break;case 1:n.Qe(),n.Le||n.qe(),n.Ue(e.resumeToken);break;case 2:n.Qe(),n.Le||this.removeTarget(t);break;case 3:this.it(t)&&(n.Ge(),n.Ue(e.resumeToken));break;case 4:this.it(t)&&(this.st(t),n.Ue(e.resumeToken));break;default:B(56790,{state:e.state})}else D(ls,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.je.forEach((n,s)=>{this.it(s)&&t(s)})}_t(e){var t;return en(e)?e.getPipelineSourceType()==="documents"&&((t=e.getPipelineDocuments())==null?void 0:t.length)===1:ac(e)}ot(e){const t=e.targetId,n=e.xe.count,s=this.ut(t);if(s){const i=s.target;if(this._t(i))if(n===0){const o=new U(en(i)?ee.fromString(i.getPipelineDocuments()[0]):i.path);this.nt(t,o,pe.newNoDocument(o,q.min()))}else N(n===1,20013,"Single document existence filter with count: "+n);else{const o=this.ct(t);if(o!==n){const u=this.lt(e),c=u?this.Et(u,e,o):1;if(c!==0){this.st(t);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Xe=this.Xe.insert(t,h)}}}}}lt(e){const t=e.xe.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:s=0},hashCount:i=0}=t;let o,u;try{o=Dt(n).toUint8Array()}catch(c){if(c instanceof sp)return at("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{u=new cc(o,s,i)}catch(c){return at(c instanceof Is?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return u.ge===0?null:u}Et(e,t,n){return t.xe.count===n-this.Pt(e,t.targetId)?0:2}Pt(e,t){const n=this.ze.getRemoteKeysForTarget(t);let s=0;return n.forEach(i=>{const o=this.ze.Tt(),u=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(u)||(this.nt(t,i,null),s++)}),s}Rt(e){const t=new Map;this.je.forEach((i,o)=>{const u=this.ut(o);if(u){if(i.current&&this._t(u.target)){const c=en(u.target)?ee.fromString(u.target.getPipelineDocuments()[0]):u.target.path,h=new U(c);this.It(h).has(o)||this.At(o,h)||this.nt(o,h,pe.newNoDocument(h,e))}i.Be&&(t.set(o,i.ke()),i.qe())}});let n=Q();this.Ze.forEach((i,o)=>{let u=!0;o.forEachWhile(c=>{const h=this.ut(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(n=n.add(i))}),this.He.forEach((i,o)=>o.setReadTime(e)),this.Ye.forEach((i,o)=>o.setReadTime(e));const s=new mi(e,t,this.Xe,this.He,this.Ye,n);return this.He=Ee(),this.Je=ji(),this.Ye=Ee(),this.Ze=ji(),this.Xe=new he(G),s}tt(e,t){const n=this.je.get(e);if(!n||!this.it(e))return void D(ls,`addDocumentToTarget received document for unknown inactive target (${e})`);const s=this.At(e,t.key)?2:0;n.$e(t.key,s),en(this.ut(e).target)&&this.ut(e).target.getPipelineFlavor()!=="exact"?this.Ye=this.Ye.insert(t.key,t):this.He=this.He.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.Ze=this.Ze.insert(t.key,this.Vt(t.key).add(e))}nt(e,t,n){const s=this.je.get(e);s&&this.it(e)?(this.At(e,t)?s.$e(t,1):s.Ke(t),this.Ze=this.Ze.insert(t,this.Vt(t).delete(e)),this.Ze=this.Ze.insert(t,this.Vt(t).add(e)),n&&(en(this.ut(e).target)&&this.ut(e).target.getPipelineFlavor()!=="exact"?this.Ye=this.Ye.insert(t,n):this.He=this.He.insert(t,n))):D(ls,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.je.delete(e)}ct(e){const t=this.je.get(e);if(!t)return 0;const n=t.ke();return this.ze.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}We(e){let t=this.je.get(e);t||(D(ls,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new Kh(e),this.je.set(e,t)),t.We()}Vt(e){let t=this.Ze.get(e);return t||(t=new re(G),this.Ze=this.Ze.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new re(G),this.Je=this.Je.insert(e,t)),t}it(e){const t=this.ut(e)!==null;return t||D(ls,"Detected inactive target",e),t}ut(e){const t=this.je.get(e);return t===void 0||t.Le?null:this.ze.dt(e)}st(e){this.je.set(e,new Kh(e)),this.ze.getRemoteKeysForTarget(e).forEach(t=>{this.nt(e,t,null)})}At(e,t){return this.ze.getRemoteKeysForTarget(e).has(t)}}function ji(){return new he(U.comparator)}function Gh(){return new he(U.comparator)}const FT={asc:"ASCENDING",desc:"DESCENDING"},BT={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},qT={and:"AND",or:"OR"};class $T{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function mu(r,e){return r.useProto3Json||$o(e)?e:{value:e}}function Mr(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function lc(r){const e=xt(r);return new se(e.seconds,e.nanos)}function Np(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function ao(r,e){return Mr(r,e.toTimestamp())}function qe(r){return N(!!r,49232),q.fromTimestamp(lc(r))}function hc(r,e){return gu(r,e).canonicalString()}function gu(r,e){const t=function(s){return new ee(["projects",s.projectId,"databases",s.database])}(r).child("documents");return e===void 0?t:t.child(e)}function kp(r){const e=ee.fromString(r);return N(zp(e),10190,{key:e.toString()}),e}function Ws(r,e){return hc(r.databaseId,e.path)}function Fn(r,e){const t=kp(e);if(t.get(1)!==r.databaseId.projectId)throw new F(x.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new F(x.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new U(Mp(t))}function Op(r,e){return hc(r.databaseId,e)}function Lp(r){const e=kp(r);return e.length===4?ee.emptyPath():Mp(e)}function _u(r){return new ee(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function Mp(r){return N(r.length>4&&r.get(4)==="documents",29091,{key:r.toString()}),r.popFirst(5)}function Hh(r,e,t){return{name:Ws(r,e),fields:t.value.mapValue.fields}}function jT(r,e,t){const n=Fn(r,e.name),s=qe(e.updateTime),i=e.createTime?qe(e.createTime):q.min(),o=new Be({mapValue:{fields:e.fields}}),u=pe.newFoundDocument(n,s,i,o);return t&&u.setHasCommittedMutations(),t?u.setHasCommittedMutations():u}function zT(r,e){let t;if("targetChange"in e){e.targetChange;const n=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:B(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,f){return h.useProto3Json?(N(f===void 0||typeof f=="string",58123),de.fromBase64String(f||"")):(N(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),de.fromUint8Array(f||new Uint8Array))}(r,e.targetChange.resumeToken),o=e.targetChange.cause,u=o&&function(h){const f=h.code===void 0?x.UNKNOWN:bp(h.code);return new F(f,h.message||"")}(o);t=new Dp(n,s,i,u||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const s=Fn(r,n.document.name),i=qe(n.document.updateTime),o=n.document.createTime?qe(n.document.createTime):q.min(),u=new Be({mapValue:{fields:n.document.fields}}),c=pe.newFoundDocument(s,i,o,u),h=n.targetIds||[],f=n.removedTargetIds||[];t=new oo(h,f,c.key,c)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const s=Fn(r,n.document),i=n.readTime?qe(n.readTime):q.min(),o=pe.newNoDocument(s,i),u=n.removedTargetIds||[];t=new oo([],u,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const s=Fn(r,n.document),i=n.removedTargetIds||[];t=new oo([],i,s,null)}else{if(!("filter"in e))return B(11601,{ft:e});{e.filter;const n=e.filter;n.targetId;const{count:s=0,unchangedNames:i}=n,o=new VT(s,i),u=n.targetId;t=new xp(u,o)}}return t}function So(r,e){let t;if(e instanceof jr)t={update:Hh(r,e.key,e.value)};else if(e instanceof sc)t={delete:Ws(r,e.key)};else if(e instanceof In)t={update:Hh(r,e.key,e.data),updateMask:YT(e.fieldMask)};else{if(!(e instanceof Ip))return B(16599,{gt:e.type});t={verify:Ws(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(n=>function(i,o){const u=o.transform;if(u instanceof Ks)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof Dr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof Nr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof kr)return{fieldPath:o.field.canonicalString(),increment:u.Re};if(u instanceof Gs)return{fieldPath:o.field.canonicalString(),minimum:u.Re};if(u instanceof Hs)return{fieldPath:o.field.canonicalString(),maximum:u.Re};throw B(20930,{transform:o.transform})}(0,n))),e.precondition.isNone||(t.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:ao(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:B(27497)}(r,e.precondition)),t}function yu(r,e){const t=e.currentDocument?function(i){return i.updateTime!==void 0?Je.updateTime(qe(i.updateTime)):i.exists!==void 0?Je.exists(i.exists):Je.none()}(e.currentDocument):Je.none(),n=e.updateTransforms?e.updateTransforms.map(s=>function(o,u){let c=null;if("setToServerValue"in u)N(u.setToServerValue==="REQUEST_TIME",16630,{proto:u}),c=new Ks;else if("appendMissingElements"in u){const f=u.appendMissingElements.values||[];c=new Dr(f)}else if("removeAllFromArray"in u){const f=u.removeAllFromArray.values||[];c=new Nr(f)}else"increment"in u?c=new kr(o,u.increment):"minimum"in u?c=new Gs(o,u.minimum):"maximum"in u?c=new Hs(o,u.maximum):B(16584,{proto:u});const h=le.fromServerFormat(u.fieldPath);return new lT(h,c)}(r,s)):[];if(e.update){e.update.name;const s=Fn(r,e.update.name),i=new Be({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(c){const h=c.fieldPaths||[];return new st(h.map(f=>le.fromServerFormat(f)))}(e.updateMask);return new In(s,i,o,t,n)}return new jr(s,i,t,n)}if(e.delete){const s=Fn(r,e.delete);return new sc(s,t)}if(e.verify){const s=Fn(r,e.verify);return new Ip(s,t)}return B(1463,{proto:e})}function KT(r,e){return r&&r.length>0?(N(e!==void 0,14353),r.map(t=>function(s,i){let o=s.updateTime?qe(s.updateTime):qe(i);return o.isEqual(q.min())&&(o=qe(i)),new dT(o,s.transformResults||[])}(t,e))):[]}function Up(r,e){return{documents:[Op(r,e.path)]}}function Fp(r,e){const t={structuredQuery:{}},n=e.path;let s;e.collectionGroup!==null?(s=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=Op(r,s);const i=function(h){if(h.length!==0)return jp(ie.create(h,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const o=function(h){if(h.length!==0)return h.map(f=>function(I){return{field:pr(I.field),direction:HT(I.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const u=mu(r,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{yt:t,parent:s}}function Bp(r){let e=Lp(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let s=null;if(n>0){N(n===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=function(p){const I=$p(p);return I instanceof ie&&ic(I)?I.getFilters():[I]}(t.where));let o=[];t.orderBy&&(o=function(p){return p.map(I=>function(C){return new Ro(mr(C.field),function(M){switch(M){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(I))}(t.orderBy));let u=null;t.limit&&(u=function(p){let I;return I=typeof p=="object"?p.value:p,$o(I)?null:I}(t.limit));let c=null;t.startAt&&(c=function(p){const I=!!p.before,b=p.values||[];return new Or(b,I)}(t.startAt));let h=null;return t.endAt&&(h=function(p){const I=!p.before,b=p.values||[];return new Or(b,I)}(t.endAt)),vT(e,s,o,i,u,"F",c,h)}function GT(r,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return B(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function qp(r,e){return{structuredPipeline:{pipeline:{stages:e.stages.map(t=>t._toProto(r))}}}}function $p(r){return r.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=mr(t.unaryFilter.field);return X.create(n,"==",{doubleValue:NaN});case"IS_NULL":const s=mr(t.unaryFilter.field);return X.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=mr(t.unaryFilter.field);return X.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=mr(t.unaryFilter.field);return X.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return B(61313);default:return B(60726)}}(r):r.fieldFilter!==void 0?function(t){return X.create(mr(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return B(58110);default:return B(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(t){return ie.create(t.compositeFilter.filters.map(n=>$p(n)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return B(1026)}}(t.compositeFilter.op))}(r):B(30097,{filter:r})}function HT(r){return FT[r]}function WT(r){return BT[r]}function QT(r){return qT[r]}function pr(r){return{fieldPath:r.canonicalString()}}function mr(r){return le.fromServerFormat(r.fieldPath)}function jp(r){return r instanceof X?function(t){if(t.op==="=="){if(Ge(t.value))return{unaryFilter:{field:pr(t.field),op:"IS_NAN"}};if(Ye(t.value))return{unaryFilter:{field:pr(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Ge(t.value))return{unaryFilter:{field:pr(t.field),op:"IS_NOT_NAN"}};if(Ye(t.value))return{unaryFilter:{field:pr(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:pr(t.field),op:WT(t.op),value:t.value}}}(r):r instanceof ie?function(t){const n=t.getFilters().map(s=>jp(s));return n.length===1?n[0]:{compositeFilter:{op:QT(t.op),filters:n}}}(r):B(54877,{filter:r})}function YT(r){const e=[];return r.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function zp(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}function Kp(r){return!!r&&typeof r._toProto=="function"&&r._protoValueType==="ProtoValue"}function Qs(r,e){const t={fields:{}};return e.forEach((n,s)=>{if(typeof s!="string")throw new Error(`Cannot encode map with non-string key: ${s}`);t.fields[s]=n._toProto(r)}),{mapValue:t}}function Gp(r){return{stringValue:r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zo(r){return new $T(r,!0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new nt(de.fromBase64String(e))}catch(t){throw new F(x.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new nt(de.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:nt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(di(e,nt._jsonSchema))return nt.fromBase64String(e.bytes)}}nt._jsonSchemaVersion="firestore/bytes/1.0",nt._jsonSchema={type:_e("string",nt._jsonSchemaVersion),bytes:_e("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new F(x.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new le(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function JT(){return new dc(vr)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hp{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new F(x.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new F(x.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return G(this._lat,e._lat)||G(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Tt._jsonSchemaVersion}}static fromJSON(e){if(di(e,Tt._jsonSchema))return new Tt(e.latitude,e.longitude)}}function Wp(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Tt._jsonSchemaVersion="firestore/geoPoint/1.0",Tt._jsonSchema={type:_e("string",Tt._jsonSchemaVersion),latitude:_e("number"),longitude:_e("number")};class XT{bt(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wh="ConnectivityMonitor";class Qh{constructor(){this.vt=()=>this.St(),this.Dt=()=>this.xt(),this.Ct=[],this.Ft()}bt(e){this.Ct.push(e)}shutdown(){window.removeEventListener("online",this.vt),window.removeEventListener("offline",this.Dt)}Ft(){window.addEventListener("online",this.vt),window.addEventListener("offline",this.Dt)}St(){D(Wh,"Network connectivity changed: AVAILABLE");for(const e of this.Ct)e(0)}xt(){D(Wh,"Network connectivity changed: UNAVAILABLE");for(const e of this.Ct)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zi=null;function Iu(){return zi===null?zi=function(){return 268435456+Math.round(2147483648*Math.random())}():zi++,"0x"+zi.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $a="RestConnection",ZT={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class ew{get Ot(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Mt=t+"://"+e.host,this.Nt=`projects/${n}/databases/${s}`,this.Lt=this.databaseId.database===uu?`project_id=${n}`:`project_id=${n}&database_id=${s}`}Bt(e,t,n,s,i){const o=Iu(),u=this.Ut(e,t.toUriEncodedString());D($a,`Sending RPC '${e}' ${o}:`,u,n);const c={"google-cloud-resource-prefix":this.Nt,"x-goog-request-params":this.Lt};this.kt(c,s,i);const{host:h}=new URL(u),f=oi(h);return this.qt(e,u,c,n,f).then(p=>(D($a,`Received RPC '${e}' ${o}: `,p),p),p=>{throw at($a,`RPC '${e}' ${o} failed with error: `,p,"url: ",u,"request:",n),p})}$t(e,t,n,s,i,o){return this.Bt(e,t,n,s,i)}kt(e,t,n){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+$r}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,i)=>e[i]=s),n&&n.headers.forEach((s,i)=>e[i]=s)}Ut(e,t){const n=ZT[e];let s=`${this.Mt}/v1/${t}:${n}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tw{constructor(e){this.Kt=e.Kt,this.Wt=e.Wt}Qt(e){this.Gt=e}zt(e){this.jt=e}Ht(e){this.Jt=e}onMessage(e){this.Yt=e}close(){this.Wt()}send(e){this.Kt(e)}Zt(){this.Gt()}Xt(){this.jt()}en(e){this.Jt(e)}tn(e){this.Yt(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xe="WebChannelConnection",hs=(r,e,t)=>{r.listen(e,n=>{try{t(n)}catch(s){setTimeout(()=>{throw s},0)}})};class Er extends ew{constructor(e){super(e),this.nn=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static rn(){if(!Er.sn){const e=Uf();hs(e,Mf.STAT_EVENT,t=>{t.stat===tu.PROXY?D(xe,"STAT_EVENT: detected buffering proxy"):t.stat===tu.NOPROXY&&D(xe,"STAT_EVENT: detected no buffering proxy")}),Er.sn=!0}}qt(e,t,n,s,i){const o=Iu();return new Promise((u,c)=>{const h=new Of;h.setWithCredentials(!0),h.listenOnce(Lf.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case eo.NO_ERROR:const p=h.getResponseJson();D(xe,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),u(p);break;case eo.TIMEOUT:D(xe,`RPC '${e}' ${o} timed out`),c(new F(x.DEADLINE_EXCEEDED,"Request time out"));break;case eo.HTTP_ERROR:const I=h.getStatus();if(D(xe,`RPC '${e}' ${o} failed with status:`,I,"response text:",h.getResponseText()),I>0){let b=h.getResponseJson();Array.isArray(b)&&(b=b[0]);const C=b==null?void 0:b.error;if(C&&C.status&&C.message){const L=function(z){const K=z.toLowerCase().replace(/_/g,"-");return Object.values(x).indexOf(K)>=0?K:x.UNKNOWN}(C.status);c(new F(L,C.message))}else c(new F(x.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new F(x.UNAVAILABLE,"Connection failed."));break;default:B(9055,{_n:e,streamId:o,an:h.getLastErrorCode(),un:h.getLastError()})}}finally{D(xe,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(s);D(xe,`RPC '${e}' ${o} sending request:`,s),h.send(t,"POST",f,n,15)})}cn(e,t,n){const s=Iu(),i=[this.Mt,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.kt(u.initMessageHeaders,t,n),u.encodeInitMessageHeaders=!0;const h=i.join("");D(xe,`Creating RPC '${e}' stream ${s}: ${h}`,u);const f=o.createWebChannel(h,u);this.En(f);let p=!1,I=!1;const b=new tw({Kt:C=>{I?D(xe,`Not sending because RPC '${e}' stream ${s} is closed:`,C):(p||(D(xe,`Opening RPC '${e}' stream ${s} transport.`),f.open(),p=!0),D(xe,`RPC '${e}' stream ${s} sending:`,C),f.send(C))},Wt:()=>f.close()});return hs(f,ys.EventType.OPEN,()=>{I||(D(xe,`RPC '${e}' stream ${s} transport opened.`),b.Zt())}),hs(f,ys.EventType.CLOSE,()=>{I||(I=!0,D(xe,`RPC '${e}' stream ${s} transport closed`),b.en(),this.hn(f))}),hs(f,ys.EventType.ERROR,C=>{I||(I=!0,at(xe,`RPC '${e}' stream ${s} transport errored. Name:`,C.name,"Message:",C.message),b.en(new F(x.UNAVAILABLE,"The operation could not be completed")))}),hs(f,ys.EventType.MESSAGE,C=>{var L;if(!I){const M=C.data[0];N(!!M,16349);const z=M,K=(z==null?void 0:z.error)||((L=z[0])==null?void 0:L.error);if(K){D(xe,`RPC '${e}' stream ${s} received error:`,K);const H=K.status;let ue=function(T){const g=me[T];if(g!==void 0)return bp(g)}(H),te=K.message;H==="NOT_FOUND"&&te.includes("database")&&te.includes("does not exist")&&te.includes(this.databaseId.database)&&at(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),ue===void 0&&(ue=x.INTERNAL,te="Unknown error status: "+H+" with message "+K.message),I=!0,b.en(new F(ue,te)),f.close()}else D(xe,`RPC '${e}' stream ${s} received:`,M),b.tn(M)}}),Er.rn(),setTimeout(()=>{b.Xt()},0),b}terminate(){this.nn.forEach(e=>e.close()),this.nn=[]}En(e){this.nn.push(e)}hn(e){this.nn=this.nn.filter(t=>t===e)}kt(e,t,n){super.kt(e,t,n),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Ff()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nw(r){return new Er(r)}Er.sn=!1;class Qp{constructor(e,t,n=1e3,s=1.5,i=6e4){this.Tn=e,this.timerId=t,this.Pn=n,this.Rn=s,this.In=i,this.An=0,this.Vn=null,this.dn=Date.now(),this.reset()}reset(){this.An=0}fn(){this.An=this.In}mn(e){this.cancel();const t=Math.floor(this.An+this.pn()),n=Math.max(0,Date.now()-this.dn),s=Math.max(0,t-n);s>0&&D("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.An} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.Vn=this.Tn.enqueueAfterDelay(this.timerId,s,()=>(this.dn=Date.now(),e())),this.An*=this.Rn,this.An<this.Pn&&(this.An=this.Pn),this.An>this.In&&(this.An=this.In)}gn(){this.Vn!==null&&(this.Vn.skipDelay(),this.Vn=null)}cancel(){this.Vn!==null&&(this.Vn.cancel(),this.Vn=null)}pn(){return(Math.random()-.5)*this.An}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yh="PersistentStream";class Yp{constructor(e,t,n,s,i,o,u,c){this.Tn=e,this.yn=n,this.wn=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=u,this.listener=c,this.state=0,this.bn=0,this.vn=null,this.Sn=null,this.stream=null,this.Dn=0,this.xn=new Qp(e,t)}Cn(){return this.state===1||this.state===5||this.Fn()}Fn(){return this.state===2||this.state===3}start(){this.Dn=0,this.state!==4?this.auth():this.On()}async stop(){this.Cn()&&await this.close(0)}Mn(){this.state=0,this.xn.reset()}Nn(){this.Fn()&&this.vn===null&&(this.vn=this.Tn.enqueueAfterDelay(this.yn,6e4,()=>this.Ln()))}Bn(e){this.Un(),this.stream.send(e)}async Ln(){if(this.Fn())return this.close(0)}Un(){this.vn&&(this.vn.cancel(),this.vn=null)}kn(){this.Sn&&(this.Sn.cancel(),this.Sn=null)}async close(e,t){this.Un(),this.kn(),this.xn.cancel(),this.bn++,e!==4?this.xn.reset():t&&t.code===x.RESOURCE_EXHAUSTED?(Fe(t.toString()),Fe("Using maximum backoff delay to prevent overloading the backend."),this.xn.fn()):t&&t.code===x.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.qn(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ht(t)}qn(){}auth(){this.state=1;const e=this.$n(this.bn),t=this.bn;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,s])=>{this.bn===t&&this.Kn(n,s)},n=>{e(()=>{const s=new F(x.UNKNOWN,"Fetching auth token failed: "+n.message);return this.Wn(s)})})}Kn(e,t){const n=this.$n(this.bn);this.stream=this.Qn(e,t),this.stream.Qt(()=>{n(()=>this.listener.Qt())}),this.stream.zt(()=>{n(()=>(this.state=2,this.Sn=this.Tn.enqueueAfterDelay(this.wn,1e4,()=>(this.Fn()&&(this.state=3),Promise.resolve())),this.listener.zt()))}),this.stream.Ht(s=>{n(()=>this.Wn(s))}),this.stream.onMessage(s=>{n(()=>++this.Dn==1?this.Gn(s):this.onNext(s))})}On(){this.state=5,this.xn.mn(async()=>{this.state=0,this.start()})}Wn(e){return D(Yh,`close with error: ${e}`),this.stream=null,this.close(4,e)}$n(e){return t=>{this.Tn.enqueueAndForget(()=>this.bn===e?t():(D(Yh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class rw extends Yp{constructor(e,t,n,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}Qn(e,t){return this.connection.cn("Listen",e,t)}Gn(e){return this.onNext(e)}onNext(e){this.xn.reset();const t=zT(this.serializer,e),n=function(i){if(!("targetChange"in i))return q.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?q.min():o.readTime?qe(o.readTime):q.min()}(e);return this.listener.zn(t,n)}jn(e){const t={};t.database=_u(this.serializer),t.addTarget=function(i,o){let u;const c=o.target;if(u=en(c)?{pipelineQuery:qp(i,c)}:ac(c)?{documents:Up(i,c)}:{query:Fp(i,c).yt},u.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){u.resumeToken=Np(i,o.resumeToken);const h=mu(i,o.expectedCount);h!==null&&(u.expectedCount=h)}else if(o.snapshotVersion.compareTo(q.min())>0){u.readTime=Mr(i,o.snapshotVersion.toTimestamp());const h=mu(i,o.expectedCount);h!==null&&(u.expectedCount=h)}return u}(this.serializer,e);const n=GT(this.serializer,e);n&&(t.labels=n),this.Bn(t)}Hn(e){const t={};t.database=_u(this.serializer),t.removeTarget=e,this.Bn(t)}}class sw extends Yp{constructor(e,t,n,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,o),this.serializer=i}get Jn(){return this.Dn>0}start(){this.lastStreamToken=void 0,super.start()}qn(){this.Jn&&this.Yn([])}Qn(e,t){return this.connection.cn("Write",e,t)}Gn(e){return N(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,N(!e.writeResults||e.writeResults.length===0,55816),this.listener.Zn()}onNext(e){N(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.xn.reset();const t=KT(e.writeResults,e.commitTime),n=qe(e.commitTime);return this.listener.Xn(n,t)}er(){const e={};e.database=_u(this.serializer),this.Bn(e)}Yn(e){const t={streamToken:this.lastStreamToken,writes:e.map(n=>So(this.serializer,n))};this.Bn(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iw{}class ow extends iw{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=s,this.tr=!1}nr(){if(this.tr)throw new F(x.FAILED_PRECONDITION,"The client has already been terminated.")}Bt(e,t,n,s){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Bt(e,gu(t,n),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===x.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new F(x.UNKNOWN,i.toString())})}$t(e,t,n,s,i){return this.nr(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,u])=>this.connection.$t(e,gu(t,n),s,o,u,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===x.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new F(x.UNKNOWN,o.toString())})}terminate(){this.tr=!0,this.connection.terminate()}}function aw(r,e,t,n){return new ow(r,e,t,n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uw="ComponentProvider",Jh=new Map;function cw(r,e,t,n,s){return new sT(r,e,t,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,Wp(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,n)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Jp=41943040;class De{static withCacheSize(e){return new De(e,De.DEFAULT_COLLECTION_PERCENTILE,De.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}De.DEFAULT_COLLECTION_PERCENTILE=10,De.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,De.DEFAULT=new De(Jp,De.DEFAULT_COLLECTION_PERCENTILE,De.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),De.DISABLED=new De(-1,0,0);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zh="LruGarbageCollector",lw=1048576;function ed([r,e],[t,n]){const s=G(r,t);return s===0?G(e,n):s}class hw{constructor(e){this.rr=e,this.buffer=new re(ed),this.ir=0}sr(){return++this.ir}_r(e){const t=[e,this.sr()];if(this.buffer.size<this.rr)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();ed(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Xp{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.ur(6e4)}stop(){this.ar&&(this.ar.cancel(),this.ar=null)}get started(){return this.ar!==null}ur(e){D(Zh,`Garbage collection scheduled in ${e}ms`),this.ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){yn(t)?D(Zh,"Ignoring IndexedDB error during garbage collection: ",t):await Jn(t)}await this.ur(3e5)})}}class dw{constructor(e,t){this.cr=e,this.params=t}calculateTargetCount(e,t){return this.cr.lr(e).next(n=>Math.floor(t/100*n))}nthSequenceNumber(e,t){if(t===0)return A.resolve(rt.ce);const n=new hw(t);return this.cr.forEachTarget(e,s=>n._r(s.sequenceNumber)).next(()=>this.cr.Er(e,s=>n._r(s))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.cr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.cr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(D("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(Xh)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(D("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Xh):this.hr(e,t))}getCacheSize(e){return this.cr.getCacheSize(e)}hr(e,t){let n,s,i,o,u,c,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(D("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s))).next(p=>(n=p,u=Date.now(),this.removeTargets(e,n,t))).next(p=>(i=p,c=Date.now(),this.removeOrphanedDocuments(e,n))).next(p=>(h=Date.now(),dr()<=J.DEBUG&&D("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(u-o)+`ms
	Removed ${i} targets in `+(c-u)+`ms
	Removed ${p} documents in `+(h-c)+`ms
Total Duration: ${h-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p})))}}function Zp(r,e){return new dw(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const em="firestore.googleapis.com",td=!0;class nd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new F(x.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=em,this.ssl=td}else this.host=e.host,this.ssl=e.ssl??td;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Jp;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<lw)throw new F(x.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}wE("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Wp(e.experimentalLongPollingOptions??{}),function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new F(x.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new F(x.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new F(x.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(n,s){return n.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class fc{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new nd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new F(x.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new F(x.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new nd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new hE;switch(n.type){case"firstParty":return new mE(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new F(x.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const n=Jh.get(t);n&&(D(uw,"Removing Datastore"),Jh.delete(t),n.terminate())}(this),Promise.resolve()}}function fw(r,e,t,n={}){var h;r=Ar(r,fc);const s=oi(e),i=r._getSettings(),o={...i,emulatorOptions:r._getEmulatorOptions()},u=`${e}:${t}`;s&&Wd(`https://${u}`),i.host!==em&&i.host!==u&&at("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:u,ssl:s,emulatorOptions:n};if(!$n(c,o)&&(r._setSettings(c),n.mockUserToken)){let f,p;if(typeof n.mockUserToken=="string")f=n.mockUserToken,p=be.MOCK_USER;else{f=$g(n.mockUserToken,(h=r._app)==null?void 0:h.options.projectId);const I=n.mockUserToken.sub||n.mockUserToken.user_id;if(!I)throw new F(x.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new be(I)}r._authCredentials=new dE(new qf(f,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new pc(this.firestore,e,this._query)}}class Te{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ys(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Te(this.firestore,e,this._key)}toJSON(){return{type:Te._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(di(t,Te._jsonSchema))return new Te(e,n||null,new U(ee.fromString(t.referencePath)))}}Te._jsonSchemaVersion="firestore/documentReference/1.0",Te._jsonSchema={type:_e("string",Te._jsonSchemaVersion),referencePath:_e("string")};class Ys extends pc{constructor(e,t,n){super(e,t,Jo(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Te(this.firestore,null,new U(e))}withConverter(e){return new Ys(this.firestore,e,this._path)}}function zR(r,e,...t){if(r=Xe(r),arguments.length===1&&(e=zu.newId()),TE("doc","path",e),r instanceof fc){const n=ee.fromString(e,...t);return wh(n),new Te(r,null,new U(n))}{if(!(r instanceof Te||r instanceof Ys))throw new F(x.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(ee.fromString(e,...t));return wh(n),new Te(r.firestore,r instanceof Ys?r.converter:null,new U(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(n,s){if(n.length!==s.length)return!1;for(let i=0;i<n.length;++i)if(n[i]!==s[i])return!1;return!0}(this._values,e._values)}toJSON(){return{type:ze._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(di(e,ze._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new ze(e.vectorValues);throw new F(x.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}ze._jsonSchemaVersion="firestore/vectorValue/1.0",ze._jsonSchema={type:_e("string",ze._jsonSchemaVersion),vectorValues:_e("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pw=/^__.*__$/;class mw{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new In(e,this.data,this.fieldMask,t,this.fieldTransforms):new jr(e,this.data,t,this.fieldTransforms)}}function tm(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw B(40011,{dataSource:r})}}class mc{constructor(e,t,n,s,i,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=s,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new mc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePathSegment(e),n}childContextForFieldPath(e){var s;const t=(s=this.path)==null?void 0:s.child(e),n=this.contextWith({path:t,arrayElement:!1});return n.validatePath(),n}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Vo(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(tm(this.dataSource)&&pw.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class gw{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Zo(e)}createContext(e,t,n,s=!1){return new mc({dataSource:e,methodName:t,targetDoc:n,path:le.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function _w(r){const e=r._freezeSettings(),t=Zo(r._databaseId);return new gw(r._databaseId,!!e.ignoreUndefinedProperties,t)}function yw(r,e,t,n,s,i={}){const o=r.createContext(i.merge||i.mergeFields?2:0,e,t,s);sm("Data must be an object, but it was:",o,n);const u=nm(n,o);let c,h;if(i.merge)c=new st(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const I=_i(e,p,t);if(!o.contains(I))throw new F(x.INVALID_ARGUMENT,`Field '${I}' is specified in your field mask but missing from your input data.`);Tw(f,I)||f.push(I)}c=new st(f),h=o.fieldTransforms.filter(p=>c.covers(p.field))}else c=null,h=o.fieldTransforms;return new mw(new Be(u),c,h)}function Js(r,e,t){if(rm(r=Xe(r)))return sm("Unsupported field value:",e,r),nm(r,e);if(r instanceof Hp)return function(s,i){if(!tm(i.dataSource))throw i.createError(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${s._methodName}() is not currently supported inside arrays`);const o=s._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return function(s,i){const o=[];let u=0;for(const c of s){let h=Js(c,i.childContextForArray(u));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),u++}return{arrayValue:{values:o}}}(r,e)}return function(s,i,o){if((s=Xe(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return nc(i.serializer,s,o);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const u=se.fromDate(s);return{timestampValue:Mr(i.serializer,u)}}if(s instanceof se){const u=new se(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:Mr(i.serializer,u)}}if(s instanceof Tt)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof nt)return{bytesValue:Np(i.serializer,s._byteString)};if(s instanceof Te){const u=i.databaseId,c=s.firestore._databaseId;if(!c.isEqual(u))throw i.createError(`Document reference is for database ${c.projectId}/${c.database} but should be for database ${u.projectId}/${u.database}`);return{referenceValue:hc(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof ze)return function(c,h){const f=c instanceof ze?c.toArray():c;return{mapValue:{fields:{[Xu]:{stringValue:Zu},[Hn]:{arrayValue:{values:f.map(I=>{if(typeof I!="number")throw h.createError("VectorValues must only contain numeric values.");return Ho(h.serializer,I)})}}}}}}(s,i);if(Kp(s))return s._toProto(i.serializer);throw i.createError(`Unsupported field value: ${Ku(s)}`)}(r,e,t)}function nm(r,e){const t={};return rp(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Xn(r,(n,s)=>{const i=Js(s,e.childContextForField(n));i!=null&&(t[n]=i)}),{mapValue:{fields:t}}}function rm(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof se||r instanceof Tt||r instanceof nt||r instanceof Te||r instanceof Hp||r instanceof ze||Kp(r))}function sm(r,e,t){if(!rm(t)||!hi(t)){const n=Ku(t);throw n==="an object"?e.createError(r+" a custom object"):e.createError(r+" "+n)}}function _i(r,e,t){if((e=Xe(e))instanceof dc)return e._internalPath;if(typeof e=="string")return Ew(r,e);throw Vo("Field path arguments must be of type string or ",r,!1,void 0,t)}const Iw=new RegExp("[~\\*/\\[\\]]");function Ew(r,e,t){if(e.search(Iw)>=0)throw Vo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new dc(...e.split("."))._internalPath}catch{throw Vo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function Vo(r,e,t,n,s){const i=n&&!n.isEmpty(),o=s!==void 0;let u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${n}`),o&&(c+=` in document ${s}`),c+=")"),new F(x.INVALID_ARGUMENT,u+r+c)}function Tw(r,e){return r.some(t=>t.isEqual(e))}function ww(r){return typeof r._readUserData=="function"}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const n=Be.empty();for(const s in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(s)){const i=this.optionDefinitions[s];if(s in e){const o=e[s];let u;i.nestedOptions&&hi(o)?u={mapValue:{fields:new Oe(i.nestedOptions).getOptionsProto(t,o)}}:o&&(u=Js(o,t)??void 0),u&&n.set(le.fromServerFormat(i.serverName),u)}}return n}getOptionsProto(e,t,n){const s=this._getKnownOptions(t,e);if(n){const i=new Map(nT(n,(o,u)=>[le.fromServerFormat(u),o!==void 0?Js(o,e):null]));s.setAll(i)}return s.value.mapValue.fields??{}}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vw(r){return typeof r=="object"&&r!==null&&!!("nullValue"in r&&(r.nullValue===null||r.nullValue==="NULL_VALUE")||"booleanValue"in r&&(r.booleanValue===null||typeof r.booleanValue=="boolean")||"integerValue"in r&&(r.integerValue===null||typeof r.integerValue=="number"||typeof r.integerValue=="string")||"doubleValue"in r&&(r.doubleValue===null||typeof r.doubleValue=="number")||"timestampValue"in r&&(r.timestampValue===null||function(t){return typeof t=="object"&&t!==null&&"seconds"in t&&(t.seconds===null||typeof t.seconds=="number"||typeof t.seconds=="string")&&"nanos"in t&&(t.nanos===null||typeof t.nanos=="number")}(r.timestampValue))||"stringValue"in r&&(r.stringValue===null||typeof r.stringValue=="string")||"bytesValue"in r&&(r.bytesValue===null||r.bytesValue instanceof Uint8Array)||"referenceValue"in r&&(r.referenceValue===null||typeof r.referenceValue=="string")||"geoPointValue"in r&&(r.geoPointValue===null||function(t){return typeof t=="object"&&t!==null&&"latitude"in t&&(t.latitude===null||typeof t.latitude=="number")&&"longitude"in t&&(t.longitude===null||typeof t.longitude=="number")}(r.geoPointValue))||"arrayValue"in r&&(r.arrayValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("values"in t)||t.values!==null&&!Array.isArray(t.values))}(r.arrayValue))||"mapValue"in r&&(r.mapValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("fields"in t)||t.fields!==null&&!hi(t.fields))}(r.mapValue))||"fieldReferenceValue"in r&&(r.fieldReferenceValue===null||typeof r.fieldReferenceValue=="string")||"functionValue"in r&&(r.functionValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("name"in t)||t.name!==null&&typeof t.name!="string"||!("args"in t)||t.args!==null&&!Array.isArray(t.args))}(r.functionValue))||"pipelineValue"in r&&(r.pipelineValue===null||function(t){return typeof t=="object"&&t!==null&&!(!("stages"in t)||t.stages!==null&&!Array.isArray(t.stages))}(r.pipelineValue)))}function Aw(r){return new ze(r)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k(r){let e;return r instanceof Zn?r:(e=hi(r)?Cw(r):r instanceof Array?xw(r):im(r,void 0),e)}function ja(r){if(r instanceof Zn)return r;if(r instanceof ze)return Xs(r);if(Array.isArray(r))return Xs(Aw(r));throw new Error("Unsupported value: "+typeof r)}function gc(r){return VE(r)?bw(r):k(r)}class Zn{constructor(){this._protoValueType="ProtoValue"}add(e){return new V("add",[this,k(e)],"add")}asBoolean(){if(this instanceof dn)return this;if(this instanceof er)return new am(this);if(this instanceof zr)return new Vw(this);if(this instanceof V)return new om(this);throw new F("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new V("subtract",[this,k(e)],"subtract")}multiply(e){return new V("multiply",[this,k(e)],"multiply")}divide(e){return new V("divide",[this,k(e)],"divide")}mod(e){return new V("mod",[this,k(e)],"mod")}equal(e){return new V("equal",[this,k(e)],"equal").asBoolean()}notEqual(e){return new V("not_equal",[this,k(e)],"notEqual").asBoolean()}lessThan(e){return new V("less_than",[this,k(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new V("less_than_or_equal",[this,k(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new V("greater_than",[this,k(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new V("greater_than_or_equal",[this,k(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){const n=[e,...t].map(s=>k(s));return new V("array_concat",[this,...n],"arrayConcat")}arrayContains(e){return new V("array_contains",[this,k(e)],"arrayContains").asBoolean()}arrayContainsAll(e){const t=Array.isArray(e)?new Es(e.map(k),"arrayContainsAll"):e;return new V("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){const t=Array.isArray(e)?new Es(e.map(k),"arrayContainsAny"):e;return new V("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new V("array_reverse",[this])}arrayLength(){return new V("array_length",[this],"arrayLength")}equalAny(e){const t=Array.isArray(e)?new Es(e.map(k),"equalAny"):e;return new V("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){const t=Array.isArray(e)?new Es(e.map(k),"notEqualAny"):e;return new V("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new V("exists",[this],"exists").asBoolean()}charLength(){return new V("char_length",[this],"charLength")}like(e){return new V("like",[this,k(e)],"like").asBoolean()}regexContains(e){return new V("regex_contains",[this,k(e)],"regexContains").asBoolean()}regexFind(e){return new V("regex_find",[this,k(e)],"regexFind")}regexFindAll(e){return new V("regex_find_all",[this,k(e)],"regexFindAll")}regexMatch(e){return new V("regex_match",[this,k(e)],"regexMatch").asBoolean()}stringContains(e){return new V("string_contains",[this,k(e)],"stringContains").asBoolean()}startsWith(e){return new V("starts_with",[this,k(e)],"startsWith").asBoolean()}endsWith(e){return new V("ends_with",[this,k(e)],"endsWith").asBoolean()}toLower(){return new V("to_lower",[this],"toLower")}toUpper(){return new V("to_upper",[this],"toUpper")}trim(e){const t=[this];return e&&t.push(k(e)),new V("trim",t,"trim")}ltrim(e){const t=[this];return e&&t.push(k(e)),new V("ltrim",t,"ltrim")}rtrim(e){const t=[this];return e&&t.push(k(e)),new V("rtrim",t,"rtrim")}type(){return new V("type",[this])}isType(e){return new V("is_type",[this,Xs(e)],"isType").asBoolean()}stringConcat(e,...t){const n=[e,...t].map(k);return new V("string_concat",[this,...n],"stringConcat")}stringIndexOf(e){return new V("string_index_of",[this,k(e)],"stringIndexOf")}stringRepeat(e){return new V("string_repeat",[this,k(e)],"stringRepeat")}stringReplaceAll(e,t){return new V("string_replace_all",[this,k(e),k(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new V("string_replace_one",[this,k(e),k(t)],"stringReplaceOne")}concat(e,...t){const n=[e,...t].map(k);return new V("concat",[this,...n],"concat")}reverse(){return new V("reverse",[this],"reverse")}arrayFilter(e,t){return new V("array_filter",[this,k(e),t],"arrayFilter")}arrayTransform(e,t){return new V("array_transform",[this,k(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,n){return new V("array_transform",[this,k(e),k(t),n],"arrayTransformWithIndex")}arraySlice(e,t){const n=[this,k(e)];return t!==void 0&&n.push(k(t)),new V("array_slice",n,"arraySlice")}arrayFirst(){return new V("array_first",[this],"arrayFirst")}arrayFirstN(e){return new V("array_first_n",[this,k(e)],"arrayFirstN")}arrayLast(){return new V("array_last",[this],"arrayLast")}arrayLastN(e){return new V("array_last_n",[this,k(e)],"arrayLastN")}arrayMaximum(){return new V("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new V("maximum_n",[this,k(e)],"arrayMaximumN")}arrayMinimum(){return new V("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new V("minimum_n",[this,k(e)],"arrayMinimumN")}arrayIndexOf(e){return new V("array_index_of",[this,k(e),k("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new V("array_index_of",[this,k(e),k("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new V("array_index_of_all",[this,k(e)],"arrayIndexOfAll")}byteLength(){return new V("byte_length",[this],"byteLength")}ceil(){return new V("ceil",[this])}floor(){return new V("floor",[this])}abs(){return new V("abs",[this])}exp(){return new V("exp",[this])}mapGet(e){return new V("map_get",[this,Xs(e)],"mapGet")}mapSet(e,t,...n){const s=[this,k(e),k(t),...n.map(k)];return new V("map_set",s,"mapSet")}mapKeys(){return new V("map_keys",[this],"mapKeys")}mapValues(){return new V("map_values",[this],"mapValues")}mapEntries(){return new V("map_entries",[this],"mapEntries")}getField(e){return new V("get_field",[this,k(e)],"get_field")}count(){return We._create("count",[this],"count")}sum(){return We._create("sum",[this],"sum")}average(){return We._create("average",[this],"average")}minimum(){return We._create("minimum",[this],"minimum")}maximum(){return We._create("maximum",[this],"maximum")}first(){return We._create("first",[this],"first")}last(){return We._create("last",[this],"last")}arrayAgg(){return We._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return We._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return We._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){const n=[e,...t];return new V("maximum",[this,...n.map(k)],"logicalMaximum")}logicalMinimum(e,...t){const n=[e,...t];return new V("minimum",[this,...n.map(k)],"minimum")}vectorLength(){return new V("vector_length",[this],"vectorLength")}cosineDistance(e){return new V("cosine_distance",[this,ja(e)],"cosineDistance")}dotProduct(e){return new V("dot_product",[this,ja(e)],"dotProduct")}euclideanDistance(e){return new V("euclidean_distance",[this,ja(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new V("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new V("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new V("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new V("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new V("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new V("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new V("timestamp_add",[this,k(e),k(t)],"timestampAdd")}timestampSubtract(e,t){return new V("timestamp_subtract",[this,k(e),k(t)],"timestampSubtract")}timestampDiff(e,t){return new V("timestamp_diff",[this,gc(e),k(t)],"timestampDiff")}timestampExtract(e,t){const n=[this,k(e)];return t&&n.push(k(t)),new V("timestamp_extract",n,"timestampExtract")}documentId(){return new V("document_id",[this],"documentId")}parent(){return new V("parent",[this],"parent")}substring(e,t){const n=k(e);return new V("substring",t===void 0?[this,n]:[this,n,k(t)],"substring")}arrayGet(e){return new V("array_get",[this,k(e)],"arrayGet")}isError(){return new V("is_error",[this],"isError").asBoolean()}ifError(e){const t=new V("if_error",[this,k(e)],"ifError");return e instanceof dn?t.asBoolean():t}isAbsent(){return new V("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new V("map_remove",[this,k(e)],"mapRemove")}mapMerge(e,...t){const n=k(e),s=t.map(k);return new V("map_merge",[this,n,...s],"mapMerge")}pow(e){return new V("pow",[this,k(e)])}trunc(e){return e===void 0?new V("trunc",[this]):new V("trunc",[this,k(e)],"trunc")}round(e){return e===void 0?new V("round",[this]):new V("round",[this,k(e)],"round")}collectionId(){return new V("collection_id",[this])}length(){return new V("length",[this])}ln(){return new V("ln",[this])}sqrt(){return new V("sqrt",[this])}stringReverse(){return new V("string_reverse",[this])}ifAbsent(e){return new V("if_absent",[this,k(e)],"ifAbsent")}ifNull(e){return new V("if_null",[this,k(e)],"ifNull")}coalesce(e,...t){return new V("coalesce",[this,k(e),...t.map(k)],"coalesce")}join(e){return new V("join",[this,k(e)],"join")}log10(){return new V("log10",[this])}arraySum(){return new V("sum",[this])}split(e){return new V("split",[this,k(e)])}timestampTruncate(e,t){const n=[this,k(e)];return t&&n.push(k(t)),new V("timestamp_trunc",n)}ascending(){return Dw(this)}descending(){return Nw(this)}as(e){return new Pw(this,e,"as")}}class We{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,n){const s=new We(e,t);return s._methodName=n,s}as(e){return new Rw(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map(t=>t._toProto(e))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e))}}class Rw{constructor(e,t,n){this.aggregate=e,this.alias=t,this._methodName=n}_readUserData(e){this.aggregate._readUserData(e)}}class Pw{constructor(e,t,n){this.expr=e,this.alias=t,this._methodName=n,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}}class Es extends Zn{constructor(e,t){super(),this.Rr=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.Rr.map(t=>t._toProto(e))}}}_readUserData(e){this.Rr.forEach(t=>t._readUserData(e))}}class zr extends Zn{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new V("geo_distance",[this,k(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}}function bw(r){return Sw(r,"field")}function Sw(r,e){return new zr(typeof r=="string"?vr===r?JT()._internalPath:_i("field",r):r._internalPath,e)}class er extends Zn{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){const t=new er(e,void 0);return t._protoValue=e,t}_toProto(e){return N(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,vw(this._protoValue)||(this._protoValue=Js(this.value,e))}}function Xs(r,e){return im(r,"constant")}function im(r,e){const t=new er(r,e);return typeof r=="boolean"?new am(t):t}class V extends Zn{constructor(e,t,n,s){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,n!==void 0&&(this._methodName=n),s!==void 0&&(this._options=s)}get _optionsUtil(){return new Oe({})}_toProto(e){const t={functionValue:{name:this.name,args:this.params.map(n=>n._toProto(e))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach(t=>t._readUserData(e)),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}}class dn extends Zn{get _methodName(){return this._expr._methodName}countIf(){return We._create("count_if",[this],"countIf")}not(){return new V("not",[this],"not").asBoolean()}conditional(e,t){return new V("conditional",[this,e,t],"conditional")}ifError(e){const t=k(e),n=new V("if_error",[this,t],"ifError");return t instanceof dn?n.asBoolean():n}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}}class om extends dn{constructor(e){super(),this._expr=e,this.expressionType="Function"}}class am extends dn{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class Vw extends dn{constructor(e){super(),this._expr=e,this.expressionType="Field"}}function Cw(r,e){const t=[];for(const n in r)if(Object.prototype.hasOwnProperty.call(r,n)){const s=r[n];t.push(Xs(n)),t.push(k(s))}return new V("map",t,"map")}function xw(r){return function(t,n){return new V("array",t.map(s=>k(s)),n)}(r,"array")}function Dw(r){return new _c(gc(r),"ascending","ascending")}function Nw(r){return new _c(gc(r),"descending","descending")}class _c{constructor(e,t,n){this.expr=e,this.direction=t,this._methodName=n,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:Gp(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}}class um extends et{get _name(){return"add_fields"}get _optionsUtil(){return new Oe({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[Qs(e,this.fields)]}}_readUserData(e){super._readUserData(e),fn(this.fields,e)}}class cm extends et{get _name(){return"aggregate"}get _optionsUtil(){return new Oe({})}constructor(e,t,n){super(n),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[Qs(e,this.accumulators),Qs(e,this.groups)]}}_readUserData(e){super._readUserData(e),fn(this.groups,e),fn(this.accumulators,e)}}class lm extends et{get _name(){return"distinct"}get _optionsUtil(){return new Oe({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[Qs(e,this.groups)]}}_readUserData(e){super._readUserData(e),fn(this.groups,e)}}class yi extends et{get _name(){return"collection"}get _optionsUtil(){return new Oe({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.Vr=e.startsWith("/")?e:"/"+e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.Vr}]}}_readUserData(e){super._readUserData(e)}}class Ii extends et{get _name(){return"collection_group"}get _optionsUtil(){return new Oe({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}}class ea extends et{get _name(){return"database"}get _optionsUtil(){return new Oe({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}}class ta extends et{get _name(){return"documents"}get _optionsUtil(){return new Oe({})}constructor(e,t){if(super(t),!e||e.length===0)throw new F(x.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const n=e.map(i=>i.startsWith("/")?i:"/"+i),s=new Set(n);if(s.size!==n.length)throw new F(x.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.dr=n,this.mr=s}_toProto(e){return{...super._toProto(e),args:this.dr.map(t=>({referenceValue:t}))}}_readUserData(e){super._readUserData(e)}}class na extends et{get _name(){return"where"}get _optionsUtil(){return new Oe({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),fn(this.condition,e)}}class Ur extends et{get _name(){return"limit"}get _optionsUtil(){return new Oe({})}constructor(e,t){N(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[nc(e,this.limit)]}}}class rd extends et{get _name(){return"offset"}get _optionsUtil(){return new Oe({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[nc(e,this.offset)]}}}class kw extends et{get _name(){return"select"}get _optionsUtil(){return new Oe({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[Qs(e,this.selections)]}}_readUserData(e){super._readUserData(e),fn(this.selections,e)}}class ra extends et{get _name(){return"sort"}get _optionsUtil(){return new Oe({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map(t=>t._toProto(e))}}_readUserData(e){super._readUserData(e),fn(this.orderings,e)}}class yc extends et{get _name(){return"replace_with"}get _optionsUtil(){return new Oe({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),Gp(yc.pr)]}}_readUserData(e){super._readUserData(e),fn(this.map,e)}}yc.pr="full_replace";function fn(r,e){return ww(r)?r._readUserData(e):Array.isArray(r)?r.forEach(t=>t._readUserData(e)):r instanceof Map?r.forEach(t=>t._readUserData(e)):Object.values(r).forEach(t=>t._readUserData(e)),r}// Copyright 2024 Google LLC* @license
class Ue{constructor(e,t,n){this.serializer=e,this.stages=t,this.listenOptions=n,this.isCorePipeline=!0}getPipelineCollection(){return Ei(this)}getPipelineCollectionGroup(){return Ic(this)}getPipelineCollectionId(){return Ow(this)}getPipelineDocuments(){return Eu(this)}getPipelineFlavor(){return function(t){let n="exact";return t.stages.forEach((s,i)=>{s._name!==lm.name&&s._name!==cm.name||(n="keyless"),s._name===kw.name&&n==="exact"&&(n="augmented"),s._name===um.name&&i<t.stages.length-1&&n==="exact"&&(n="augmented")}),n}(this)}getPipelineSourceType(){return un(this)}}function un(r){const e=r.stages[0];return e instanceof yi||e instanceof Ii||e instanceof ea||e instanceof ta?e._name:"unknown"}function Ei(r){if(un(r)==="collection")return r.stages[0].Vr}function Ic(r){if(un(r)==="collection_group")return r.stages[0].collectionId}function Ow(r){switch(un(r)){case"collection":return ee.fromString(Ei(r)).lastSegment();case"collection_group":return Ic(r);default:return}}function Eu(r){if(un(r)==="documents")return r.stages[0].dr}// Copyright 2024 Google LLC* @license
class E{constructor(e,t){this.type=e,this.value=t}static vr(){return new E("ERROR",void 0)}static Sr(){return new E("UNSET",void 0)}static Dr(){return new E("NULL",Et)}static newValue(e){return Ye(e)?new E("NULL",Et):function(n){return!!n&&"booleanValue"in n}(e)?new E("BOOLEAN",e):gt(e)?new E("INT",e):On(e)?new E("DOUBLE",e):function(n){return!!n&&"timestampValue"in n&&!!n.timestampValue}(e)?new E("TIMESTAMP",e):function(n){return!!n&&"stringValue"in n}(e)?new E("STRING",e):function(n){return!!n&&"bytesValue"in n}(e)?new E("BYTES",e):e.referenceValue?new E("REFERENCE",e):e.geoPointValue?new E("GEO_POINT",e):hn(e)?new E("ARRAY",e):Wn(e)?new E("VECTOR",e):Un(e)?new E("MAP",e):new E("ERROR",void 0)}Cr(){return this.type==="ERROR"||this.type==="UNSET"}Fr(){return this.type==="NULL"}}function Ns(r){if(!r.Cr())return r.value}function hm(r){return r instanceof dn?r._expr:r}function $(r){if((r=hm(r))instanceof zr)return new Lw(r);if(r instanceof er)return new Mw(r);if(r instanceof Es)return new Uw(r);if(r instanceof V){if(r.name==="add")return new qw(r);if(r.name==="subtract")return new $w(r);if(r.name==="multiply")return new jw(r);if(r.name==="divide")return new zw(r);if(r.name==="mod")return new Kw(r);if(r.name==="and")return new Gw(r);if(r.name==="equal")return new sv(r);if(r.name==="not_equal")return new iv(r);if(r.name==="less_than")return new ov(r);if(r.name==="less_than_or_equal")return new av(r);if(r.name==="greater_than")return new uv(r);if(r.name==="greater_than_or_equal")return new cv(r);if(r.name==="array_concat")return new lv(r);if(r.name==="array_reverse")return new hv(r);if(r.name==="array_contains")return new dv(r);if(r.name==="array_contains_all")return new fv(r);if(r.name==="array_contains_any")return new pv(r);if(r.name==="array_length")return new mv(r);if(r.name==="array_element")return new gv(r);if(r.name==="equal_any")return new dm(r);if(r.name==="not_equal_any")return new Ww(r);if(r.name==="is_nan")return new Qw(r);if(r.name==="is_not_nan")return new Yw(r);if(r.name==="is_null")return new Jw(r);if(r.name==="is_not_null")return new Xw(r);if(r.name==="is_error")return new Zw(r);if(r.name==="exists")return new ev(r);if(r.name==="not")return new sa(r);if(r.name==="or")return new Hw(r);if(r.name==="xor")return new Ec(r);if(r.name==="conditional")return new tv(r);if(r.name==="maximum")return new nv(r);if(r.name==="minimum")return new rv(r);if(r.name==="reverse")return new _v(r);if(r.name==="replace_first")return new yv(r);if(r.name==="replace_all")return new Iv(r);if(r.name==="char_length")return new Ev(r);if(r.name==="byte_length")return new Tv(r);if(r.name==="like")return new wv(r);if(r.name==="regex_contains")return new vv(r);if(r.name==="regex_match")return new Av(r);if(r.name==="string_contains")return new Rv(r);if(r.name==="starts_with")return new Pv(r);if(r.name==="ends_with")return new bv(r);if(r.name==="to_lower")return new Sv(r);if(r.name==="to_upper")return new Vv(r);if(r.name==="trim")return new Cv(r);if(r.name==="string_concat")return new xv(r);if(r.name==="map_get")return new Dv(r);if(r.name==="cosine_distance")return new Nv(r);if(r.name==="dot_product")return new kv(r);if(r.name==="euclidean_distance")return new Ov(r);if(r.name==="vector_length")return new Lv(r);if(r.name==="unix_micros_to_timestamp")return new qv(r);if(r.name==="timestamp_to_unix_micros")return new zv(r);if(r.name==="unix_millis_to_timestamp")return new $v(r);if(r.name==="timestamp_to_unix_millis")return new Kv(r);if(r.name==="unix_seconds_to_timestamp")return new jv(r);if(r.name==="timestamp_to_unix_seconds")return new Gv(r);if(r.name==="timestamp_add")return new Hv(r);if(r.name==="timestamp_subtract")return new Wv(r)}throw new Error(`Unknown Expr : ${r}`)}class Lw{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===vr)return E.newValue({referenceValue:Ws(e.serializer,t.key)});if(this.expr.fieldName==="__update_time__")return E.newValue({timestampValue:ao(e.serializer,t.version)});if(this.expr.fieldName==="__create_time__")return E.newValue({timestampValue:ao(e.serializer,t.createTime)});const n=t.data.field(this.expr._fieldPath);return n?Go(n)?E.newValue(function(i,o){if(i.serverTimestampBehavior==="estimate")return{timestampValue:ao(i.serializer,q.fromTimestamp(Cr(o)))};if(i.serverTimestampBehavior==="previous"){const u=pi(o);if(u)return u}return{nullValue:"NULL_VALUE"}}(e,n)):E.newValue(n):E.Sr()}}class Mw{constructor(e){this.expr=e}evaluate(e,t){return E.newValue(this.expr._getValue())}}class Uw{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.Rr.map(s=>$(s).evaluate(e,t));return n.some(s=>s.Cr())?E.vr():E.newValue({arrayValue:{values:n.map(s=>s.value)}})}}function Ve(r){return On(r)?Number(r.doubleValue):Number(r.integerValue)}function wt(r){return BigInt(r.integerValue)}const Fw=BigInt("0x7fffffffffffffff"),Bw=-BigInt("0x8000000000000000");class Ti{constructor(e){this.expr=e}evaluate(e,t){N(this.expr.params.length>=2,24778);const n=$(this.expr.params[0]).evaluate(e,t),s=$(this.expr.params[1]).evaluate(e,t);let i=this.Or(n,s);for(const o of this.expr.params.slice(2)){const u=$(o).evaluate(e,t);i=this.Or(i,u)}return i}Or(e,t){if(e.Cr()||t.Cr())return E.vr();if(e.Fr()||t.Fr())return E.Dr();const n=e.value,s=t.value;if(!On(n)&&!gt(n)||!On(s)&&!gt(s))return E.vr();if(On(n)||On(s)){const i=this.Mr(n,s);return i?E.newValue(i):E.vr()}if(gt(n)&&gt(s)){const i=this.Nr(n,s);return i===void 0?E.vr():typeof i=="number"?E.newValue({doubleValue:i}):i<Bw||i>Fw?E.vr():E.newValue({integerValue:`${i}`})}return E.vr()}}function Nt(r,e){return ye(r)!==ye(e)?"TYPE_MISMATCH":Ge(r)||Ge(e)?"NOT_EQ":Ye(r)&&Ye(e)?"EQ":Ye(r)||Ye(e)?"NULL":hn(r)&&hn(e)?function(n,s){var o,u,c;if(((o=n.values)==null?void 0:o.length)!==((u=s.values)==null?void 0:u.length))return"NOT_EQ";let i=!1;for(let h=0;h<(((c=n.values)==null?void 0:c.length)??0);h++){const f=n.values[h],p=s.values[h];switch(Nt(f,p)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:B(44609,{Lr:f,Br:p})}}return i?"NULL":"EQ"}(r.arrayValue,e.arrayValue):Wn(r)&&Wn(e)||Un(r)&&Un(e)?function(n,s){const i=n.fields||{},o=s.fields||{};if(vo(i)!==vo(o))return"NOT_EQ";let u=!1;for(const c in i)if(i.hasOwnProperty(c)){if(o[c]===void 0)return"NOT_EQ";switch(Nt(i[c],o[c])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":u=!0}}return u?"NULL":"EQ"}(r.mapValue,e.mapValue):function(n,s){return ut(n,s,{Te:!1,Ee:!0,he:!0})}(r,e)?"EQ":"NOT_EQ"}class qw extends Ti{Nr(e,t){return wt(e)+wt(t)}Mr(e,t){return{doubleValue:Ve(e)+Ve(t)}}}class $w extends Ti{constructor(e){super(e),this.expr=e}Nr(e,t){return wt(e)-wt(t)}Mr(e,t){return{doubleValue:Ve(e)-Ve(t)}}}class jw extends Ti{constructor(e){super(e),this.expr=e}Nr(e,t){return wt(e)*wt(t)}Mr(e,t){return{doubleValue:Ve(e)*Ve(t)}}}class zw extends Ti{constructor(e){super(e),this.expr=e}Nr(e,t){const n=wt(t);if(n!==BigInt(0))return wt(e)/n}Mr(e,t){const n=Ve(t);return n===0?{doubleValue:Rr(n)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:Ve(e)/n}}}class Kw extends Ti{constructor(e){super(e),this.expr=e}Nr(e,t){const n=wt(t);if(n!==BigInt(0))return wt(e)%n}Mr(e,t){const n=Ve(t);if(n!==0)return{doubleValue:Ve(e)%n}}}class Gw{constructor(e){this.expr=e}evaluate(e,t){var i;let n=!1,s=!1;for(const o of this.expr.params){const u=$(o).evaluate(e,t);switch(u.type){case"BOOLEAN":if(!((i=u.value)!=null&&i.booleanValue))return E.newValue(Pe);break;case"NULL":s=!0;break;default:n=!0}}return n?E.vr():s?E.Dr():E.newValue(Ke)}}class sa{constructor(e){this.expr=e}evaluate(e,t){var s;N(this.expr.params.length===1,9634);const n=$(this.expr.params[0]).evaluate(e,t);switch(n.type){case"BOOLEAN":return E.newValue({booleanValue:!((s=n.value)!=null&&s.booleanValue)});case"NULL":return E.Dr();default:return E.vr()}}}class Hw{constructor(e){this.expr=e}evaluate(e,t){var i;let n=!1,s=!1;for(const o of this.expr.params){const u=$(o).evaluate(e,t);switch(u.type){case"BOOLEAN":if((i=u.value)!=null&&i.booleanValue)return E.newValue(Ke);break;case"NULL":s=!0;break;default:n=!0}}return n?E.vr():s?E.Dr():E.newValue(Pe)}}class Ec{constructor(e){this.expr=e}evaluate(e,t){var i;let n=!1,s=!1;for(const o of this.expr.params){const u=$(o).evaluate(e,t);switch(u.type){case"BOOLEAN":n=Ec.xor(n,!!((i=u.value)!=null&&i.booleanValue));break;case"NULL":s=!0;break;default:return E.vr()}}return s?E.Dr():E.newValue({booleanValue:n})}static xor(e,t){return(e||t)&&!(e&&t)}}class dm{constructor(e){this.expr=e}evaluate(e,t){var o,u;N(this.expr.params.length===2,55094);let n=!1;const s=$(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":n=!0;break;case"ERROR":case"UNSET":return E.vr()}const i=$(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":n=!0;break;default:return E.vr()}if(n)return E.Dr();for(const c of((u=(o=i.value)==null?void 0:o.arrayValue)==null?void 0:u.values)??[])switch(Ye(s.value)&&Ye(c)?"EQ":Nt(s.value,c)){case"EQ":return E.newValue(Ke);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":n=!0;break;default:B(44608,{value:s.value,candidate:c})}return n?E.Dr():E.newValue(Pe)}}class Ww{constructor(e){this.expr=e}evaluate(e,t){return new sa(new V("not",[new V("equal_any",this.expr.params)])).evaluate(e,t)}}class Qw{constructor(e){this.expr=e}evaluate(e,t){N(this.expr.params.length===1,23322);const n=$(this.expr.params[0]).evaluate(e,t);switch(n.type){case"INT":return E.newValue(Pe);case"DOUBLE":return E.newValue({booleanValue:isNaN(Ve(n.value))});case"NULL":return E.Dr();default:return E.vr()}}}class Yw{constructor(e){this.expr=e}evaluate(e,t){return N(this.expr.params.length===1,50406),new sa(new V("not",[new V("is_nan",this.expr.params)])).evaluate(e,t)}}class Jw{constructor(e){this.expr=e}evaluate(e,t){switch(N(this.expr.params.length===1,23123),$(this.expr.params[0]).evaluate(e,t).type){case"NULL":return E.newValue(Ke);case"UNSET":case"ERROR":return E.vr();default:return E.newValue(Pe)}}}class Xw{constructor(e){this.expr=e}evaluate(e,t){return N(this.expr.params.length===1,23167),new sa(new V("not",[new V("is_null",this.expr.params)])).evaluate(e,t)}}class Zw{constructor(e){this.expr=e}evaluate(e,t){return N(this.expr.params.length===1,5228),$(this.expr.params[0]).evaluate(e,t).type==="ERROR"?E.newValue(Ke):E.newValue(Pe)}}class ev{constructor(e){this.expr=e}evaluate(e,t){switch(N(this.expr.params.length===1,6877),$(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return E.vr();case"UNSET":return E.newValue(Pe);default:return E.newValue(Ke)}}}class tv{constructor(e){this.expr=e}evaluate(e,t){var s;N(this.expr.params.length===3,11706);const n=$(this.expr.params[0]).evaluate(e,t);switch(n.type){case"BOOLEAN":return(s=n.value)!=null&&s.booleanValue?$(this.expr.params[1]).evaluate(e,t):$(this.expr.params[2]).evaluate(e,t);case"NULL":return $(this.expr.params[2]).evaluate(e,t);default:return E.vr()}}}class nv{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.params.map(i=>$(i).evaluate(e,t));let s;for(const i of n)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||ke(i.value,s.value)>0?i:s}return s===void 0?E.Dr():s}}class rv{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.params.map(i=>$(i).evaluate(e,t));let s;for(const i of n)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:s=s===void 0||ke(i.value,s.value)<0?i:s}return s===void 0?E.Dr():s}}class Kr{constructor(e){this.expr=e}evaluate(e,t){N(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);const n=$(this.expr.params[0]).evaluate(e,t);switch(n.type){case"ERROR":case"UNSET":return E.vr()}const s=$(this.expr.params[1]).evaluate(e,t);switch(s.type){case"ERROR":case"UNSET":return E.vr()}return this.Ur(n,s)}}class sv extends Kr{constructor(e){super(e),this.expr=e}Ur(e,t){if(e.Fr()&&t.Fr())return E.newValue(Ke);if(e.Fr()||t.Fr()||Ge(e.value)||Ge(t.value)||ye(e.value)!==ye(t.value))return E.newValue(Pe);switch(Nt(e.value,t.value)){case"EQ":return E.newValue(Ke);case"NOT_EQ":return E.newValue(Pe);case"NULL":return E.Dr();default:B(44615,{left:e,right:t})}}}class iv extends Kr{constructor(e){super(e),this.expr=e}Ur(e,t){switch(Nt(e.value,t.value)){case"EQ":return E.newValue(Pe);case"NOT_EQ":case"TYPE_MISMATCH":return E.newValue(Ke);case"NULL":return E.Dr();default:B(44614,{left:e,right:t})}}}class ov extends Kr{constructor(e){super(e),this.expr=e}Ur(e,t){return ye(e.value)!==ye(t.value)||Ge(e.value)||Ge(t.value)?E.newValue(Pe):E.newValue({booleanValue:ke(e.value,t.value)<0})}}class av extends Kr{constructor(e){super(e),this.expr=e}Ur(e,t){return ye(e.value)!==ye(t.value)||Ge(e.value)||Ge(t.value)?E.newValue(Pe):Nt(e.value,t.value)==="EQ"?E.newValue(Ke):E.newValue({booleanValue:ke(e.value,t.value)<0})}}class uv extends Kr{constructor(e){super(e),this.expr=e}Ur(e,t){return ye(e.value)!==ye(t.value)||Ge(e.value)||Ge(t.value)?E.newValue(Pe):E.newValue({booleanValue:ke(e.value,t.value)>0})}}class cv extends Kr{constructor(e){super(e),this.expr=e}Ur(e,t){return ye(e.value)!==ye(t.value)||Ge(e.value)||Ge(t.value)?E.newValue(Pe):Nt(e.value,t.value)==="EQ"?E.newValue(Ke):E.newValue({booleanValue:ke(e.value,t.value)>0})}}class lv{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class hv{constructor(e){this.expr=e}evaluate(e,t){var s;N(this.expr.params.length===1,216);const n=$(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return E.Dr();case"ARRAY":{const i=((s=n.value.arrayValue)==null?void 0:s.values)??[];return E.newValue({arrayValue:{values:[...i].reverse()}})}default:return E.vr()}}}class dv{constructor(e){this.expr=e}evaluate(e,t){return N(this.expr.params.length===2,52884),new dm(new V("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}}class fv{constructor(e){this.expr=e}evaluate(e,t){var c,h,f,p;N(this.expr.params.length===2,1392);let n=!1;const s=$(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":n=!0;break;default:return E.vr()}const i=$(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":n=!0;break;default:return E.vr()}if(n)return E.Dr();const o=((h=(c=i.value)==null?void 0:c.arrayValue)==null?void 0:h.values)??[],u=((p=(f=s.value)==null?void 0:f.arrayValue)==null?void 0:p.values)??[];for(const I of o){let b=!1;n=!1;for(const C of u){switch(Ye(I)&&Ye(C)?"EQ":Nt(I,C)){case"EQ":b=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":n=!0;break;default:B(44613,{value:C,search:I})}if(b)break}if(!b)return E.newValue(Pe)}return E.newValue(Ke)}}class pv{constructor(e){this.expr=e}evaluate(e,t){var c,h,f,p;N(this.expr.params.length===2,2680);let n=!1;const s=$(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ARRAY":break;case"NULL":n=!0;break;default:return E.vr()}const i=$(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":n=!0;break;default:return E.vr()}if(n)return E.Dr();const o=((h=(c=i.value)==null?void 0:c.arrayValue)==null?void 0:h.values)??[],u=((p=(f=s.value)==null?void 0:f.arrayValue)==null?void 0:p.values)??[];for(const I of u)for(const b of o)switch(Ye(I)&&Ye(b)?"EQ":Nt(I,b)){case"EQ":return E.newValue(Ke);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":n=!0;break;default:B(44608,{value:I,search:b})}return n?E.Dr():E.newValue(Pe)}}class mv{constructor(e){this.expr=e}evaluate(e,t){var s,i,o;N(this.expr.params.length===1,38605);const n=$(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return E.Dr();case"ARRAY":return E.newValue({integerValue:`${((o=(i=(s=n.value)==null?void 0:s.arrayValue)==null?void 0:i.values)==null?void 0:o.length)??0}`});default:return E.vr()}}}class gv{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class _v{constructor(e){this.expr=e}evaluate(e,t){var s,i;N(this.expr.params.length===1,1508);const n=$(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return E.Dr();case"BYTES":{const o=(s=n.value)==null?void 0:s.bytesValue;if(typeof o=="string"){const u=de.fromBase64String(o).toUint8Array();return u.reverse(),E.newValue({bytesValue:de.fromUint8Array(u).toBase64()})}return E.newValue({bytesValue:new Uint8Array(o).reverse()})}case"STRING":{const o=(i=n.value)==null?void 0:i.stringValue,u=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(o),c=Array.from(u,h=>h.segment).reverse();return E.newValue({stringValue:c.join("")})}default:return E.vr()}}}class yv{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class Iv{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class Ev{constructor(e){this.expr=e}evaluate(e,t){N(this.expr.params.length===1,19400);const n=$(this.expr.params[0]).evaluate(e,t);switch(n.type){case"NULL":return E.Dr();case"STRING":{const s=function(o){let u=0;for(let c=0;c<o.length;c++){const h=o.codePointAt(c);if(h===void 0)return;if(h<=65535)if(h>=55296&&h<=57343)if(h<=56319){const f=o.codePointAt(c+1);f!==void 0&&f>=56320&&f<=57343?(u+=1,c++):u+=1}else u+=1;else u+=1;else{if(!(h<=1114111))return;u+=1,c++}}return u}(n.value.stringValue);return s===void 0?E.vr():E.newValue({integerValue:s})}default:return E.vr()}}}class Tv{constructor(e){this.expr=e}evaluate(e,t){var s,i;N(this.expr.params.length===1,8486);const n=$(this.expr.params[0]).evaluate(e,t);switch(n.type){case"BYTES":{const o=(s=n.value)==null?void 0:s.bytesValue;return typeof o=="string"?E.newValue({integerValue:de.fromBase64String(o).toUint8Array().length}):E.newValue({integerValue:new Uint8Array(o).length})}case"STRING":{const o=function(c){let h=0;for(let f=0;f<c.length;f++){const p=c.codePointAt(f);if(p===void 0)return;if(p>=55296&&p<=57343){if(!(p<=56319))return;{const I=c.codePointAt(f+1);if(I===void 0||!(I>=56320&&I<=57343))return;h+=4,f++}}else if(p<=127)h+=1;else if(p<=2047)h+=2;else if(p<=65535)h+=3;else{if(!(p<=1114111))return;h+=4,f++}}return h}((i=n.value)==null?void 0:i.stringValue);return o===void 0?E.vr():E.newValue({integerValue:o})}case"NULL":return E.Dr();default:return E.vr()}}}class Gr{constructor(e){this.expr=e}evaluate(e,t){var o,u;N(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let n=!1;const s=$(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":break;case"NULL":n=!0;break;default:return E.vr()}const i=$(this.expr.params[1]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":n=!0;break;default:return E.vr()}return n?E.Dr():this.kr((o=s.value)==null?void 0:o.stringValue,(u=i.value)==null?void 0:u.stringValue)}}class wv extends Gr{kr(e,t){try{const n=function(o){let u="";for(let c=0;c<o.length;c++){const h=o.charAt(c);switch(h){case"_":u+=".";break;case"%":u+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":u+="\\"+h;break;default:u+=h}}return"^"+u+"$"}(t),s=Cu.compile(n);return E.newValue({booleanValue:s.matches(e)})}catch(n){return at(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${n}`),E.vr()}}}class vv extends Gr{kr(e,t){try{const n=Cu.compile(t);return E.newValue({booleanValue:n.matcher(e).find()})}catch{return at(`Invalid regex pattern found in regex_contains: ${t}, returning error`),E.vr()}}}class Av extends Gr{kr(e,t){try{return E.newValue({booleanValue:Cu.compile(t).matches(e)})}catch{return at(`Invalid regex pattern found in regex_match: ${t}, returning error`),E.vr()}}}class Rv extends Gr{kr(e,t){return E.newValue({booleanValue:e.includes(t)})}}class Pv extends Gr{kr(e,t){return E.newValue({booleanValue:e.startsWith(t)})}}class bv extends Gr{kr(e,t){return E.newValue({booleanValue:e.endsWith(t)})}}class Sv{constructor(e){this.expr=e}evaluate(e,t){var s,i;N(this.expr.params.length===1,29079);const n=$(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":return E.newValue({stringValue:(i=(s=n.value)==null?void 0:s.stringValue)==null?void 0:i.toLowerCase()});case"NULL":return E.Dr();default:return E.vr()}}}class Vv{constructor(e){this.expr=e}evaluate(e,t){var s,i;N(this.expr.params.length===1,60487);const n=$(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":return E.newValue({stringValue:(i=(s=n.value)==null?void 0:s.stringValue)==null?void 0:i.toUpperCase()});case"NULL":return E.Dr();default:return E.vr()}}}class Cv{constructor(e){this.expr=e}evaluate(e,t){var s,i;N(this.expr.params.length===1,28544);const n=$(this.expr.params[0]).evaluate(e,t);switch(n.type){case"STRING":return E.newValue({stringValue:(i=(s=n.value)==null?void 0:s.stringValue)==null?void 0:i.trim()});case"NULL":return E.Dr();default:return E.vr()}}}class xv{constructor(e){this.expr=e}evaluate(e,t){const n=this.expr.params.map(o=>$(o).evaluate(e,t));let s="",i=!1;for(const o of n)switch(o.type){case"STRING":s+=o.value.stringValue;break;case"NULL":i=!0;break;default:return E.vr()}return i?E.Dr():E.newValue({stringValue:s})}}class Dv{constructor(e){this.expr=e}evaluate(e,t){var o,u,c,h;N(this.expr.params.length===2,4483);const n=$(this.expr.params[0]).evaluate(e,t);switch(n.type){case"UNSET":return E.Sr();case"MAP":break;default:return E.vr()}const s=$(this.expr.params[1]).evaluate(e,t);if(s.type!=="STRING")return E.vr();const i=(h=(u=(o=n.value)==null?void 0:o.mapValue)==null?void 0:u.fields)==null?void 0:h[(c=s.value)==null?void 0:c.stringValue];return i===void 0?E.Sr():E.newValue(i)}}class Tc{constructor(e){this.expr=e}evaluate(e,t){var h,f;N(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let n=!1;const s=$(this.expr.params[0]).evaluate(e,t);switch(s.type){case"VECTOR":break;case"NULL":n=!0;break;default:return E.vr()}const i=$(this.expr.params[1]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":n=!0;break;default:return E.vr()}if(n)return E.Dr();const o=lu(s.value),u=lu(i.value);if(o===void 0||u===void 0||((h=o.values)==null?void 0:h.length)!==((f=u.values)==null?void 0:f.length))return E.vr();const c=this.qr(o,u);return c===void 0||isNaN(c)?E.vr():E.newValue({doubleValue:c})}}class Nv extends Tc{qr(e,t){const n=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(n.length===0)return;let i=0,o=0,u=0;for(let h=0;h<n.length;h++){if(!ln(n[h])||!ln(s[h]))return;const f=Ve(n[h]),p=Ve(s[h]);i+=f*p,o+=f*f,u+=p*p}const c=Math.sqrt(o)*Math.sqrt(u);if(c!==0)return 1-Math.max(-1,Math.min(1,i/c))}}class kv extends Tc{qr(e,t){const n=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(n.length===0)return 0;let i=0;for(let o=0;o<n.length;o++){if(!ln(n[o])||!ln(s[o]))return;i+=Ve(n[o])*Ve(s[o])}return i}}class Ov extends Tc{qr(e,t){const n=(e==null?void 0:e.values)??[],s=(t==null?void 0:t.values)??[];if(n.length===0)return 0;let i=0;for(let o=0;o<n.length;o++){if(!ln(n[o])||!ln(s[o]))return;const u=Ve(n[o]),c=Ve(s[o]);i+=Math.pow(u-c,2)}return Math.sqrt(i)}}class Lv{constructor(e){this.expr=e}evaluate(e,t){var s;N(this.expr.params.length===1,39044);const n=$(this.expr.params[0]).evaluate(e,t);switch(n.type){case"VECTOR":{const i=lu(n.value);return E.newValue({integerValue:((s=i==null?void 0:i.values)==null?void 0:s.length)??0})}case"NULL":return E.Dr();default:return E.vr()}}}const Zs=BigInt(-62135596800),ei=BigInt(253402300799),Co=BigInt(1e3),cn=BigInt(1e6),Mv=Zs*Co,Uv=ei*Co+BigInt(999),Fv=Zs*cn,Bv=ei*cn+BigInt(999999);function wc(r){return r>=Fv&&r<=Bv}function fm(r){return r>=Zs&&r<=ei}function ti(r,e){const t=BigInt(r);return!(t<Zs||t>ei)&&!(e<0||e>=1e9)&&(t!==Zs||e===0)&&!(t===ei&&e>999999999)}function pm(r,e){return e<0?{seconds:r-1,nanos:e+1e9}:{seconds:r,nanos:e}}function vc(r){return BigInt(r.seconds)*cn+BigInt(Math.trunc(r.nanoseconds/1e3))}class Ac{constructor(e){this.expr=e}evaluate(e,t){N(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);const n=$(this.expr.params[0]).evaluate(e,t);switch(n.type){case"INT":return this.toTimestamp(BigInt(n.value.integerValue));case"NULL":return E.Dr();default:return E.vr()}}}class qv extends Ac{toTimestamp(e){if(!wc(e))return E.vr();let t=Number(e/cn),n=Number(e%cn*BigInt(1e3));const s=pm(t,n);return t=s.seconds,n=s.nanos,ti(t,n)?E.newValue({timestampValue:{seconds:t,nanos:n}}):E.vr()}}class $v extends Ac{toTimestamp(e){if(!function(o){return o>=Mv&&o<=Uv}(e))return E.vr();let t=Number(e/Co),n=Number(e%Co*BigInt(1e6));const s=pm(t,n);return t=s.seconds,n=s.nanos,ti(t,n)?E.newValue({timestampValue:{seconds:t,nanos:n}}):E.vr()}}class jv extends Ac{toTimestamp(e){if(!fm(e))return E.vr();const t=Number(e);return E.newValue({timestampValue:{seconds:t,nanos:0}})}}class Rc{constructor(e){this.expr=e}evaluate(e,t){N(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);const n=$(this.expr.params[0]).evaluate(e,t);switch(n.type){case"TIMESTAMP":break;case"NULL":return E.Dr();default:return E.vr()}const s=lc(n.value.timestampValue);return ti(s.seconds,s.nanoseconds)?this.$r(s):E.vr()}}class zv extends Rc{$r(e){const t=vc(e);return wc(t)?E.newValue({integerValue:`${t.toString()}`}):E.vr()}}class Kv extends Rc{$r(e){const t=vc(e),n=t/BigInt(1e3),s=t%BigInt(1e3);return n>BigInt(0)||s===BigInt(0)?E.newValue({integerValue:n.toString()}):E.newValue({integerValue:(n-BigInt(1)).toString()})}}class Gv extends Rc{$r(e){const t=BigInt(e.seconds);return fm(t)?E.newValue({integerValue:t.toString()}):E.vr()}}class mm{constructor(e){this.expr=e}evaluate(e,t){N(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let n=!1;const s=$(this.expr.params[0]).evaluate(e,t);switch(s.type){case"TIMESTAMP":break;case"NULL":n=!0;break;default:return E.vr()}const i=$(this.expr.params[1]).evaluate(e,t);let o;switch(i.type){case"STRING":if(o=function(K){switch(K){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}}(i.value.stringValue),o===void 0)return E.vr();break;case"NULL":n=!0;break;default:return E.vr()}const u=$(this.expr.params[2]).evaluate(e,t);switch(u.type){case"INT":break;case"NULL":n=!0;break;default:return E.vr()}if(n)return E.Dr();const c=BigInt(u.value.integerValue);let h;try{switch(o){case"microsecond":h=c;break;case"millisecond":h=c*BigInt(1e3);break;case"second":h=c*BigInt(1e6);break;case"minute":h=c*BigInt(6e7);break;case"hour":h=c*BigInt(36e8);break;case"day":h=c*BigInt(864e8);break;default:return E.vr()}if(o!=="microsecond"&&c!==BigInt(0)&&h/c!==BigInt(this.Kr(o)))return E.vr()}catch(z){return at(`Error during timestamp arithmetic: ${z}`),E.vr()}const f=lc(s.value.timestampValue);if(!ti(f.seconds,f.nanoseconds))return E.vr();const p=vc(f),I=this.Wr(p,h);if(!wc(I))return E.vr();const b=Number(I/cn),C=I%cn,L=Number((C<0?C+cn:C)*BigInt(1e3)),M=C<0?b-1:b;return ti(M,L)?E.newValue({timestampValue:{seconds:M,nanos:L}}):E.vr()}Kr(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class Hv extends mm{Wr(e,t){return e+t}}class Wv extends mm{Wr(e,t){return e-t}}function ni(r){if((r=hm(r))instanceof zr)return`fld(${r.fieldName})`;if(r instanceof er)return`cst(${function(t){return t===null?"null":typeof t=="number"?t.toString():typeof t=="string"?`"${t}"`:t instanceof Te?`ref(${t.path})`:t instanceof ze?`vec(${JSON.stringify(t)})`:JSON.stringify(t)}(r.value)})`;if(r instanceof V)return`fn(${r.name},[${r.params.map(ni).join(",")}])`;if(r.expressionType==="ListOfExpressions")return`list([${r.Rr.map(ni).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(r,null,2)}`)}function Qv(r){if(r instanceof um)return`${r._name}(${Ki(r.fields)})`;if(r instanceof cm){let e=`${r._name}(${Ki(r.accumulators)})`;return r.groups.size>0&&(e+=`grouping(${Ki(r.groups)})`),e}if(r instanceof lm)return`${r._name}(${Ki(r.groups)})`;if(r instanceof yi)return`${r._name}(${r.Vr})`;if(r instanceof Ii)return`${r._name}(${r.collectionId})`;if(r instanceof ea)return`${r._name}()`;if(r instanceof ta)return`${r._name}(${r.dr.sort()})`;if(r instanceof na)return`${r._name}(${ni(r.condition)})`;if(r instanceof Ur)return`${r._name}(${r.limit})`;if(r instanceof ra)return`${r._name}(${function(t){return t.map(n=>`${ni(n.expr)}${n.direction}`).join(",")}(r.orderings)})`;throw new Error(`Unrecognized stage ${r._name}`)}function Ki(r){return`${Array.from(r.entries()).sort().map(([e,t])=>`${e}=${ni(t)}`).join(",")}`}function bt(r){return r.stages.map(e=>Qv(e)).join("|")}function gm(r,e){return bt(r)===bt(e)}function ge(r){return r instanceof Ue}function sd(r){return ge(r)?bt(r):xs(r)}function _m(r){return ge(r)?bt(r):function(t){return`${Po(it(t))}|lt:${t.limitType}`}(r)}function ia(r,e){return r instanceof Ue&&e instanceof Ue?gm(r,e):!(r instanceof Ue&&!(e instanceof Ue)||!(r instanceof Ue)&&e instanceof Ue)&&bT(r,e)}function oa(r){return en(r)?bt(r):Po(r)}function Pc(r,e){return r instanceof Ue&&e instanceof Ue?gm(r,e):!(r instanceof Ue&&!(e instanceof Ue)||!(r instanceof Ue)&&e instanceof Ue)&&oc(r,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bc{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&fT(i,e,n[s])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=Vs(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=Vs(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Cp();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let u=this.applyToLocalView(o,i.mutatedFields);u=t.has(s.key)?null:u;const c=_p(o,u);c!==null&&n.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(q.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),Q())}isEqual(e){return this.batchId===e.batchId&&wr(this.mutations,e.mutations,(t,n)=>Oh(t,n))&&wr(this.baseMutations,e.baseMutations,(t,n)=>Oh(t,n))}}class Sc{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){N(e.mutations.length===n.length,58842,{Qr:e.mutations.length,Gr:n.length});let s=function(){return DT}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,n[o].version);return new Sc(e,t,n,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vc{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e,t,n,s,i=q.min(),o=q.min(),u=de.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=u,this.expectedCount=c}withSequenceNumber(e){return new _t(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new _t(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new _t(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new _t(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ym{constructor(e){this.zr=e}}function Yv(r,e){let t;if(e.document)t=jT(r.zr,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=U.fromSegments(e.noDocument.path),s=Yn(e.noDocument.readTime);t=pe.newNoDocument(n,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return B(56709);{const n=U.fromSegments(e.unknownDocument.path),s=Yn(e.unknownDocument.version);t=pe.newUnknownDocument(n,s)}}return e.readTime&&t.setReadTime(function(s){const i=new se(s[0],s[1]);return q.fromTimestamp(i)}(e.readTime)),t}function id(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:xo(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=function(i,o){return{name:Ws(i,o.key),fields:o.data.value.mapValue.fields,updateTime:Mr(i,o.version.toTimestamp()),createTime:Mr(i,o.createTime.toTimestamp())}}(r.zr,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:Qn(e.version)};else{if(!e.isUnknownDocument())return B(57904,{document:e});n.unknownDocument={path:t.path.toArray(),version:Qn(e.version)}}return n}function xo(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function Qn(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Yn(r){const e=new se(r.seconds,r.nanoseconds);return q.fromTimestamp(e)}function Cn(r,e){const t=(e.baseMutations||[]).map(i=>yu(r.zr,i));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const u=e.mutations[i+1];o.updateTransforms=u.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const n=e.mutations.map(i=>yu(r.zr,i)),s=se.fromMillis(e.localWriteTimeMs);return new bc(e.batchId,s,t,n)}function Ts(r,e){const t=Yn(e.readTime),n=e.lastLimboFreeSnapshotVersion!==void 0?Yn(e.lastLimboFreeSnapshotVersion):q.min();let s;return s=function(o){return o.structuredPipeline!==void 0}(e.query)?function(o,u){var f,p;const c=o.structuredPipeline;N((((f=c==null?void 0:c.pipeline)==null?void 0:f.stages)??[]).length>0,1845);const h=(p=c==null?void 0:c.pipeline)==null?void 0:p.stages.map(Jv);return new Ue(u,h)}(e.query,r.zr):function(o){return o.documents!==void 0}(e.query)?function(o){const u=o.documents.length;return N(u===1,1966,{count:u}),it(Jo(Lp(o.documents[0])))}(e.query):function(o){return it(Bp(o))}(e.query),new _t(s,e.targetId,"TargetPurposeListen",e.lastListenSequenceNumber,t,n,de.fromBase64String(e.resumeToken))}function Im(r,e){const t=Qn(e.snapshotVersion),n=Qn(e.lastLimboFreeSnapshotVersion);let s;s=en(e.target)?qp(r.zr,e.target):ac(e.target)?Up(r.zr,e.target):Fp(r.zr,e.target).yt;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:oa(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:s}}function Em(r){const e=Bp({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?pu(e,e.limit,"L"):e}function Gi(r,e){return new Vc(e.largestBatchId,yu(r.zr,e.overlayMutation))}function od(r,e){const t=e.path.lastSegment();return[r,Ne(e.path.popLast()),t]}function ad(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:Qn(n.readTime),documentKey:Ne(n.documentKey.path),largestBatchId:n.largestBatchId}}function Jv(r){switch(r.name){case"collection":return new yi(r.args[0].referenceValue,{});case"collection_group":return new Ii(r.args[1].stringValue,{});case"database":return new ea({});case"documents":return new ta(r.args.map(e=>e.referenceValue),{});case"where":return new na(Tu(r.args[0]),{});case"limit":{const e=r.args[0].integerValue??r.args[0].doubleValue;return new Ur(typeof e=="number"?e:Number(e),{})}case"sort":return new ra(r.args.map(e=>function(n){var i,o;const s=(i=n.mapValue)==null?void 0:i.fields;return new _c(Tu(s.expression),(o=s.direction)==null?void 0:o.stringValue,"orderingFromProto")}(e)),{});default:throw new Error(`Stage type: ${r.name} not supported.`)}}function Tu(r){return r.fieldReferenceValue?new zr(_i("_exprFromProto",r.fieldReferenceValue),"_exprFromProto"):r.functionValue?function(t){var n;return new V(t.functionValue.name,((n=t.functionValue.args)==null?void 0:n.map(Tu))||[])}(r):er._fromProto(r)}class Xv{getBundleMetadata(e,t){return ud(e).get(t).next(n=>{if(n)return function(i){return{id:i.bundleId,createTime:Yn(i.createTime),version:i.version}}(n)})}saveBundleMetadata(e,t){return ud(e).put(function(s){return{bundleId:s.id,createTime:Qn(qe(s.createTime)),version:s.version}}(t))}getNamedQuery(e,t){return cd(e).get(t).next(n=>{if(n)return function(i){return{name:i.name,query:Em(i.bundledQuery),readTime:Yn(i.readTime)}}(n)})}saveNamedQuery(e,t){return cd(e).put(function(s){return{name:s.name,readTime:Qn(qe(s.readTime)),bundledQuery:s.bundledQuery}}(t))}}function ud(r){return ve(r,jo)}function cd(r){return ve(r,zo)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(e,t){this.serializer=e,this.userId=t}static jr(e,t){const n=t.uid||"";return new aa(e,n)}getOverlay(e,t){return ar(e).get(od(this.userId,t)).next(n=>n?Gi(this.serializer,n):null)}getOverlays(e,t){const n=tt();return A.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}getAllOverlays(e,t){const n=tt();return ar(e).ee((s,i)=>{const o=Gi(this.serializer,i);o.largestBatchId>t&&n.set(o.getKey(),o)}).next(()=>n)}saveOverlays(e,t,n){const s=[];return n.forEach((i,o)=>{const u=new Vc(t,o);s.push(this.Hr(e,u))}),A.waitFor(s)}removeOverlaysForBatchId(e,t,n){const s=new Set;t.forEach(o=>s.add(Ne(o.getCollectionPath())));const i=[];return s.forEach(o=>{const u=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);i.push(ar(e).Z(ou,u))}),A.waitFor(i)}getOverlaysForCollection(e,t,n){const s=tt(),i=Ne(t),o=IDBKeyRange.bound([this.userId,i,n],[this.userId,i,Number.POSITIVE_INFINITY],!0);return ar(e).H(ou,o).next(u=>{for(const c of u){const h=Gi(this.serializer,c);s.set(h.getKey(),h)}return s})}getOverlaysForCollectionGroup(e,t,n,s){const i=tt();let o;const u=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return ar(e).ee({index:Xf,range:u},(c,h,f)=>{const p=Gi(this.serializer,h);i.size()<s||p.largestBatchId===o?(i.set(p.getKey(),p),o=p.largestBatchId):f.done()}).next(()=>i)}Hr(e,t){return ar(e).put(function(s,i,o){const[u,c,h]=od(i,o.mutation.key);return{userId:i,collectionPath:c,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:So(s.zr,o.mutation)}}(this.serializer,this.userId,t))}}function ar(r){return ve(r,Ko)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zv{Jr(e){return ve(e,Yu)}getSessionToken(e){return this.Jr(e).get("sessionToken").next(t=>{const n=t==null?void 0:t.value;return n?de.fromUint8Array(n):de.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.Jr(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{constructor(){}Yr(e,t){this.Zr(e,t),t.Xr()}Zr(e,t){if("nullValue"in e)this.ei(t,5);else if("booleanValue"in e)this.ei(t,10),t.ti(e.booleanValue?1:0);else if("integerValue"in e)this.ei(t,15),t.ti(ae(e.integerValue));else if("doubleValue"in e){const n=ae(e.doubleValue);isNaN(n)?this.ei(t,13):(this.ei(t,15),Rr(n)?t.ti(0):t.ti(n))}else if("timestampValue"in e){let n=e.timestampValue;this.ei(t,20),typeof n=="string"&&(n=xt(n)),t.ni(`${n.seconds||""}`),t.ti(n.nanos||0)}else if("stringValue"in e)this.ri(e.stringValue,t),this.ii(t);else if("bytesValue"in e)this.ei(t,30),t.si(Dt(e.bytesValue)),this.ii(t);else if("referenceValue"in e)this._i(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.ei(t,45),t.ti(n.latitude||0),t.ti(n.longitude||0)}else"mapValue"in e?lp(e)?this.ei(t,Number.MAX_SAFE_INTEGER):Wn(e)?this.oi(e.mapValue,t):(this.ai(e.mapValue,t),this.ii(t)):"arrayValue"in e?(this.ui(e.arrayValue,t),this.ii(t)):B(19022,{ci:e})}ri(e,t){this.ei(t,25),this.li(e,t)}li(e,t){t.ni(e)}ai(e,t){const n=e.fields||{};this.ei(t,55);for(const s of Object.keys(n))this.ri(s,t),this.Zr(n[s],t)}oi(e,t){var o,u;const n=e.fields||{};this.ei(t,53);const s=Hn,i=((u=(o=n[s].arrayValue)==null?void 0:o.values)==null?void 0:u.length)||0;this.ei(t,15),t.ti(ae(i)),this.ri(s,t),this.Zr(n[s],t)}ui(e,t){const n=e.values||[];this.ei(t,50);for(const s of n)this.Zr(s,t)}_i(e,t){this.ei(t,37),U.fromName(e).path.forEach(n=>{this.ei(t,60),this.li(n,t)})}ei(e,t){e.ti(t)}ii(e){e.ti(2)}}xn.Ei=new xn;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur=255;function eA(r){if(r===0)return 8;let e=0;return r>>4||(e+=4,r<<=4),r>>6||(e+=2,r<<=2),r>>7||(e+=1),e}function ld(r){const e=64-function(n){let s=0;for(let i=0;i<8;++i){const o=eA(255&n[i]);if(s+=o,o!==8)break}return s}(r);return Math.ceil(e/8)}class tA{constructor(){this.buffer=new Uint8Array(1024),this.position=0}hi(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ti(n.value),n=t.next();this.Pi()}Ri(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ii(n.value),n=t.next();this.Ai()}Vi(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ti(n);else if(n<2048)this.Ti(960|n>>>6),this.Ti(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ti(480|n>>>12),this.Ti(128|63&n>>>6),this.Ti(128|63&n);else{const s=t.codePointAt(0);this.Ti(240|s>>>18),this.Ti(128|63&s>>>12),this.Ti(128|63&s>>>6),this.Ti(128|63&s)}}this.Pi()}di(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ii(n);else if(n<2048)this.Ii(960|n>>>6),this.Ii(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ii(480|n>>>12),this.Ii(128|63&n>>>6),this.Ii(128|63&n);else{const s=t.codePointAt(0);this.Ii(240|s>>>18),this.Ii(128|63&s>>>12),this.Ii(128|63&s>>>6),this.Ii(128|63&s)}}this.Ai()}fi(e){const t=this.mi(e),n=ld(t);this.pi(1+n),this.buffer[this.position++]=255&n;for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=255&t[s]}gi(e){const t=this.mi(e),n=ld(t);this.pi(1+n),this.buffer[this.position++]=~(255&n);for(let s=t.length-n;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}yi(){this.wi(ur),this.wi(255)}bi(){this.Si(ur),this.Si(255)}reset(){this.position=0}seed(e){this.pi(e.length),this.buffer.set(e,this.position),this.position+=e.length}Di(){return this.buffer.slice(0,this.position)}mi(e){const t=function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)}(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let s=1;s<t.length;++s)t[s]^=n?255:0;return t}Ti(e){const t=255&e;t===0?(this.wi(0),this.wi(255)):t===ur?(this.wi(ur),this.wi(0)):this.wi(t)}Ii(e){const t=255&e;t===0?(this.Si(0),this.Si(255)):t===ur?(this.Si(ur),this.Si(0)):this.Si(e)}Pi(){this.wi(0),this.wi(1)}Ai(){this.Si(0),this.Si(1)}wi(e){this.pi(1),this.buffer[this.position++]=e}Si(e){this.pi(1),this.buffer[this.position++]=~e}pi(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const s=new Uint8Array(n);s.set(this.buffer),this.buffer=s}}class nA{constructor(e){this.xi=e}si(e){this.xi.hi(e)}ni(e){this.xi.Vi(e)}ti(e){this.xi.fi(e)}Xr(){this.xi.yi()}}class rA{constructor(e){this.xi=e}si(e){this.xi.Ri(e)}ni(e){this.xi.di(e)}ti(e){this.xi.gi(e)}Xr(){this.xi.bi()}}class ds{constructor(){this.xi=new tA,this.ascending=new nA(this.xi),this.descending=new rA(this.xi)}seed(e){this.xi.seed(e)}Ci(e){return e===0?this.ascending:this.descending}Di(){return this.xi.Di()}reset(){this.xi.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(e,t,n,s){this.Fi=e,this.Oi=t,this.Mi=n,this.Ni=s}Li(){const e=this.Ni.length,t=e===0||this.Ni[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.Ni,0),t!==e?n.set([0],this.Ni.length):++n[n.length-1],new Dn(this.Fi,this.Oi,this.Mi,n)}Bi(e,t,n){return{indexId:this.Fi,uid:e,arrayValue:uo(this.Mi),directionalValue:uo(this.Ni),orderedDocumentKey:uo(t),documentKey:n.path.toArray()}}Ui(e,t,n){const s=this.Bi(e,t,n);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function Kt(r,e){let t=r.Fi-e.Fi;return t!==0?t:(t=hd(r.Mi,e.Mi),t!==0?t:(t=hd(r.Ni,e.Ni),t!==0?t:U.comparator(r.Oi,e.Oi)))}function hd(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}function uo(r){return Gd()?function(t){let n="";for(let s=0;s<t.length;s++)n+=String.fromCharCode(t[s]);return n}(r):r}function dd(r){return typeof r!="string"?r:function(t){const n=new Uint8Array(t.length);for(let s=0;s<t.length;s++)n[s]=t.charCodeAt(s);return n}(r)}class fd{constructor(e){this.ki=new re((t,n)=>le.comparator(t.field,n.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.qi=e.orderBy,this.$i=[];for(const t of e.filters){const n=t;n.isInequality()?this.ki=this.ki.add(n):this.$i.push(n)}}get Ki(){return this.ki.size>1}Wi(e){if(N(e.collectionGroup===this.collectionId,49279),this.Ki)return!1;const t=ru(e);if(t!==void 0&&!this.Qi(t))return!1;const n=bn(e);let s=new Set,i=0,o=0;for(;i<n.length&&this.Qi(n[i]);++i)s=s.add(n[i].fieldPath.canonicalString());if(i===n.length)return!0;if(this.ki.size>0){const u=this.ki.getIterator().getNext();if(!s.has(u.field.canonicalString())){const c=n[i];if(!this.Gi(u,c)||!this.zi(this.qi[o++],c))return!1}++i}for(;i<n.length;++i){const u=n[i];if(o>=this.qi.length||!this.zi(this.qi[o++],u))return!1}return!0}ji(){if(this.Ki)return null;let e=new re(le.comparator);const t=[];for(const n of this.$i)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new to(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new to(n.field,0))}for(const n of this.qi)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new to(n.field,n.dir==="asc"?0:1)));return new Io(Io.UNKNOWN_ID,this.collectionId,t,Bs.empty())}Qi(e){for(const t of this.$i)if(this.Gi(t,e))return!0;return!1}Gi(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}zi(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tm(r){var t,n;if(N(r instanceof X||r instanceof ie,20012),r instanceof X){if(r instanceof Pp){const s=((n=(t=r.value.arrayValue)==null?void 0:t.values)==null?void 0:n.map(i=>X.create(r.field,"==",i)))||[];return ie.create(s,"or")}return r}const e=r.filters.map(s=>Tm(s));return ie.create(e,r.op)}function sA(r){if(r.getFilters().length===0)return[];const e=Au(Tm(r));return N(wm(e),7391),wu(e)||vu(e)?[e]:e.getFilters()}function wu(r){return r instanceof X}function vu(r){return r instanceof ie&&ic(r)}function wm(r){return wu(r)||vu(r)||function(t){if(t instanceof ie&&hu(t)){for(const n of t.getFilters())if(!wu(n)&&!vu(n))return!1;return!0}return!1}(r)}function Au(r){if(N(r instanceof X||r instanceof ie,34018),r instanceof X)return r;if(r.filters.length===1)return Au(r.filters[0]);const e=r.filters.map(n=>Au(n));let t=ie.create(e,r.op);return t=Do(t),wm(t)?t:(N(t instanceof ie,64498),N(Lr(t),40251),N(t.filters.length>1,57927),t.filters.reduce((n,s)=>Cc(n,s)))}function Cc(r,e){let t;return N(r instanceof X||r instanceof ie,38388),N(e instanceof X||e instanceof ie,25473),t=r instanceof X?e instanceof X?function(s,i){return ie.create([s,i],"and")}(r,e):pd(r,e):e instanceof X?pd(e,r):function(s,i){if(N(s.filters.length>0&&i.filters.length>0,48005),Lr(s)&&Lr(i))return vp(s,i.getFilters());const o=hu(s)?s:i,u=hu(s)?i:s,c=o.filters.map(h=>Cc(h,u));return ie.create(c,"or")}(r,e),Do(t)}function pd(r,e){if(Lr(e))return vp(e,r.getFilters());{const t=e.filters.map(n=>Cc(r,n));return ie.create(t,"or")}}function Do(r){if(N(r instanceof X||r instanceof ie,11850),r instanceof X)return r;const e=r.getFilters();if(e.length===1)return Do(e[0]);if(Tp(r))return r;const t=e.map(s=>Do(s)),n=[];return t.forEach(s=>{s instanceof X?n.push(s):s instanceof ie&&(s.op===r.op?n.push(...s.filters):n.push(s))}),n.length===1?n[0]:ie.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iA{constructor(){this.Hi=new xc}addToCollectionParentIndex(e,t){return this.Hi.add(t),A.resolve()}getCollectionParents(e,t){return A.resolve(this.Hi.getEntries(t))}addFieldIndex(e,t){return A.resolve()}deleteFieldIndex(e,t){return A.resolve()}deleteAllFieldIndexes(e){return A.resolve()}createTargetIndexes(e,t){return A.resolve()}getDocumentsMatchingTarget(e,t){return A.resolve(null)}getIndexType(e,t){return A.resolve(0)}getFieldIndexes(e,t){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,t){return A.resolve(Ze.min())}getMinOffsetFromCollectionGroup(e,t){return A.resolve(Ze.min())}updateCollectionGroup(e,t,n){return A.resolve()}updateIndexEntries(e,t){return A.resolve()}}class xc{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new re(ee.comparator),i=!s.has(n);return this.index[t]=s.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new re(ee.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const md="IndexedDbIndexManager",Hi=new Uint8Array(0);class oA{constructor(e,t){this.databaseId=t,this.Ji=new xc,this.Yi=new Mt(n=>Po(n),(n,s)=>oc(n,s)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.Ji.has(t)){const n=t.lastSegment(),s=t.popLast();e.addOnCommittedListener(()=>{this.Ji.add(t)});const i={collectionId:n,parent:Ne(s)};return gd(e).put(i)}return A.resolve()}getCollectionParents(e,t){const n=[],s=IDBKeyRange.bound([t,""],[$f(t),""],!1,!0);return gd(e).H(s).next(i=>{for(const o of i){if(o.collectionId!==t)break;n.push(mt(o.parent))}return n})}addFieldIndex(e,t){const n=fs(e),s=function(u){return{indexId:u.indexId,collectionGroup:u.collectionGroup,fields:u.fields.map(c=>[c.fieldPath.canonicalString(),c.kind])}}(t);delete s.indexId;const i=n.add(s);if(t.indexState){const o=lr(e);return i.next(u=>{o.put(ad(u,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return i.next()}deleteFieldIndex(e,t){const n=fs(e),s=lr(e),i=cr(e);return n.delete(t.indexId).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=fs(e),n=cr(e),s=lr(e);return t.Z().next(()=>n.Z()).next(()=>s.Z())}createTargetIndexes(e,t){return A.forEach(this.Zi(t),n=>this.getIndexType(e,n).next(s=>{if(s===0||s===1){const i=new fd(n).ji();if(i!=null)return this.addFieldIndex(e,i)}}))}getDocumentsMatchingTarget(e,t){const n=cr(e);let s=!0;const i=new Map;return A.forEach(this.Zi(t),o=>this.Xi(e,o).next(u=>{s&&(s=!!u),i.set(o,u)})).next(()=>{if(s){let o=Q();const u=[];return A.forEach(i,(c,h)=>{D(md,`Using index ${function(H){return`id=${H.indexId}|cg=${H.collectionGroup}|f=${H.fields.map(ue=>`${ue.fieldPath}:${ue.kind}`).join(",")}`}(c)} to execute ${Po(t)}`);const f=function(H,ue){const te=ru(ue);if(te===void 0)return null;for(const ne of bo(H,te.fieldPath))switch(ne.op){case"array-contains-any":return ne.value.arrayValue.values||[];case"array-contains":return[ne.value]}return null}(h,c),p=function(H,ue){const te=new Map;for(const ne of bn(ue))for(const T of bo(H,ne.fieldPath))switch(T.op){case"==":case"in":te.set(ne.fieldPath.canonicalString(),T.value);break;case"not-in":case"!=":return te.set(ne.fieldPath.canonicalString(),T.value),Array.from(te.values())}return null}(h,c),I=function(H,ue){const te=[];let ne=!0;for(const T of bn(ue)){const g=T.kind===0?Bh(H,T.fieldPath,H.startAt):qh(H,T.fieldPath,H.startAt);te.push(g.value),ne&&(ne=g.inclusive)}return new Or(te,ne)}(h,c),b=function(H,ue){const te=[];let ne=!0;for(const T of bn(ue)){const g=T.kind===0?qh(H,T.fieldPath,H.endAt):Bh(H,T.fieldPath,H.endAt);te.push(g.value),ne&&(ne=g.inclusive)}return new Or(te,ne)}(h,c),C=this.es(c,h,I),L=this.es(c,h,b),M=this.ts(c,h,p),z=this.ns(c.indexId,f,C,I.inclusive,L,b.inclusive,M);return A.forEach(z,K=>n.Y(K,t.limit).next(H=>{H.forEach(ue=>{const te=U.fromSegments(ue.documentKey);o.has(te)||(o=o.add(te),u.push(te))})}))}).next(()=>u)}return A.resolve(null)})}Zi(e){let t=this.Yi.get(e);return t||(e.filters.length===0?t=[e]:t=sA(ie.create(e.filters,"and")).map(n=>fu(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt)),this.Yi.set(e,t),t)}ns(e,t,n,s,i,o,u){const c=(t!=null?t.length:1)*Math.max(n.length,i.length),h=c/(t!=null?t.length:1),f=[];for(let p=0;p<c;++p){const I=t?this.rs(t[p/h]):Hi,b=this.ss(e,I,n[p%h],s),C=this._s(e,I,i[p%h],o),L=u.map(M=>this.ss(e,I,M,!0));f.push(...this.createRange(b,C,L))}return f}ss(e,t,n,s){const i=new Dn(e,U.empty(),t,n);return s?i:i.Li()}_s(e,t,n,s){const i=new Dn(e,U.empty(),t,n);return s?i.Li():i}Xi(e,t){const n=new fd(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next(i=>{let o=null;for(const u of i)n.Wi(u)&&(!o||u.fields.length>o.fields.length)&&(o=u);return o})}getIndexType(e,t){let n=2;const s=this.Zi(t);return A.forEach(s,i=>this.Xi(e,i).next(o=>{o?n!==0&&o.fields.length<function(c){let h=new re(le.comparator),f=!1;for(const p of c.filters)for(const I of p.getFlattenedFilters())I.field.isKeyField()||(I.op==="array-contains"||I.op==="array-contains-any"?f=!0:h=h.add(I.field));for(const p of c.orderBy)p.field.isKeyField()||(h=h.add(p.field));return h.size+(f?1:0)}(i)&&(n=1):n=0})).next(()=>function(o){return o.limit!==null}(t)&&s.length>1&&n===2?1:n)}us(e,t){const n=new ds;for(const s of bn(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=n.Ci(s.kind);xn.Ei.Yr(i,o)}return n.Di()}rs(e){const t=new ds;return xn.Ei.Yr(e,t.Ci(0)),t.Di()}cs(e,t){const n=new ds;return xn.Ei.Yr(ec(this.databaseId,t),n.Ci(function(i){const o=bn(i);return o.length===0?0:o[o.length-1].kind}(e))),n.Di()}ts(e,t,n){if(n===null)return[];let s=[];s.push(new ds);let i=0;for(const o of bn(e)){const u=n[i++];for(const c of s)if(this.ls(t,o.fieldPath)&&hn(u))s=this.Es(s,o,u);else{const h=c.Ci(o.kind);xn.Ei.Yr(u,h)}}return this.hs(s)}es(e,t,n){return this.ts(e,t,n.position)}hs(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].Di();return t}Es(e,t,n){const s=[...e],i=[];for(const o of n.arrayValue.values||[])for(const u of s){const c=new ds;c.seed(u.Di()),xn.Ei.Yr(o,c.Ci(t.kind)),i.push(c)}return i}ls(e,t){return!!e.filters.find(n=>n instanceof X&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(e,t){const n=fs(e),s=lr(e);return(t?n.H(iu,IDBKeyRange.bound(t,t)):n.H()).next(i=>{const o=[];return A.forEach(i,u=>s.get([u.indexId,this.uid]).next(c=>{o.push(function(f,p){const I=p?new Bs(p.sequenceNumber,new Ze(Yn(p.readTime),new U(mt(p.documentKey)),p.largestBatchId)):Bs.empty(),b=f.fields.map(([C,L])=>new to(le.fromServerFormat(C),L));return new Io(f.indexId,f.collectionGroup,b,I)}(u,c))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((n,s)=>{const i=n.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:G(n.collectionGroup,s.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,n){const s=fs(e),i=lr(e);return this.Ts(e).next(o=>s.H(iu,IDBKeyRange.bound(t,t)).next(u=>A.forEach(u,c=>i.put(ad(c.indexId,this.uid,o,n)))))}updateIndexEntries(e,t){const n=new Map;return A.forEach(t,(s,i)=>{const o=n.get(s.collectionGroup);return(o?A.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next(u=>(n.set(s.collectionGroup,u),A.forEach(u,c=>this.Ps(e,s,c).next(h=>{const f=this.Rs(i,c);return h.isEqual(f)?A.resolve():this.Is(e,i,c,h,f)}))))})}As(e,t,n,s){return cr(e).put(s.Bi(this.uid,this.cs(n,t.key),t.key))}Vs(e,t,n,s){return cr(e).delete(s.Ui(this.uid,this.cs(n,t.key),t.key))}Ps(e,t,n){const s=cr(e);let i=new re(Kt);return s.ee({index:Jf,range:IDBKeyRange.only([n.indexId,this.uid,uo(this.cs(n,t))])},(o,u)=>{i=i.add(new Dn(n.indexId,t,dd(u.arrayValue),dd(u.directionalValue)))}).next(()=>i)}Rs(e,t){let n=new re(Kt);const s=this.us(t,e);if(s==null)return n;const i=ru(t);if(i!=null){const o=e.data.field(i.fieldPath);if(hn(o))for(const u of o.arrayValue.values||[])n=n.add(new Dn(t.indexId,e.key,this.rs(u),s))}else n=n.add(new Dn(t.indexId,e.key,Hi,s));return n}Is(e,t,n,s,i){D(md,"Updating index entries for document '%s'",t.key);const o=[];return function(c,h,f,p,I){const b=c.getIterator(),C=h.getIterator();let L=or(b),M=or(C);for(;L||M;){let z=!1,K=!1;if(L&&M){const H=f(L,M);H<0?K=!0:H>0&&(z=!0)}else L!=null?K=!0:z=!0;z?(p(M),M=or(C)):K?(I(L),L=or(b)):(L=or(b),M=or(C))}}(s,i,Kt,u=>{o.push(this.As(e,t,n,u))},u=>{o.push(this.Vs(e,t,n,u))}),A.waitFor(o)}Ts(e){let t=1;return lr(e).ee({index:Yf,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,s,i)=>{i.done(),t=s.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((o,u)=>Kt(o,u)).filter((o,u,c)=>!u||Kt(o,c[u-1])!==0);const s=[];s.push(e);for(const o of n){const u=Kt(o,e),c=Kt(o,t);if(u===0)s[0]=e.Li();else if(u>0&&c<0)s.push(o),s.push(o.Li());else if(c>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.ds(s[o],s[o+1]))return[];const u=s[o].Ui(this.uid,Hi,U.empty()),c=s[o+1].Ui(this.uid,Hi,U.empty());i.push(IDBKeyRange.bound(u,c))}return i}ds(e,t){return Kt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(_d)}getMinOffset(e,t){return A.mapArray(this.Zi(t),n=>this.Xi(e,n).next(s=>s||B(44426))).next(_d)}}function gd(r){return ve(r,js)}function cr(r){return ve(r,bs)}function fs(r){return ve(r,Qu)}function lr(r){return ve(r,Ps)}function _d(r){N(r.length!==0,28825);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const s=r[n].indexState.offset;Gu(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new Ze(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vm(r,e,t){const n=r.store(ct),s=r.store(Pr),i=[],o=IDBKeyRange.only(t.batchId);let u=0;const c=n.ee({range:o},(f,p,I)=>(u++,I.delete()));i.push(c.next(()=>{N(u===1,47070,{batchId:t.batchId})}));const h=[];for(const f of t.mutations){const p=Hf(e,f.key.path,t.batchId);i.push(s.delete(p)),h.push(f.key)}return A.waitFor(i).next(()=>h)}function No(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw B(14731);e=r.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ua{constructor(e,t,n,s){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=s,this.fs={}}static jr(e,t,n,s){N(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new ua(i,t,n,s)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Gt(e).ee({index:kn,range:n},(s,i,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,n,s){const i=gr(e),o=Gt(e);return o.add({}).next(u=>{N(typeof u=="number",49019);const c=new bc(u,t,n,s),h=function(b,C,L){const M=L.baseMutations.map(K=>So(b.zr,K)),z=L.mutations.map(K=>So(b.zr,K));return{userId:C,batchId:L.batchId,localWriteTimeMs:L.localWriteTime.toMillis(),baseMutations:M,mutations:z}}(this.serializer,this.userId,c),f=[];let p=new re((I,b)=>G(I.canonicalString(),b.canonicalString()));for(const I of s){const b=Hf(this.userId,I.key.path,u);p=p.add(I.key.path.popLast()),f.push(o.put(h)),f.push(i.put(b,DE))}return p.forEach(I=>{f.push(this.indexManager.addToCollectionParentIndex(e,I))}),e.addOnCommittedListener(()=>{this.fs[u]=c.keys()}),A.waitFor(f).next(()=>c)})}lookupMutationBatch(e,t){return Gt(e).get(t).next(n=>n?(N(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:t}),Cn(this.serializer,n)):null)}ps(e,t){return this.fs[t]?A.resolve(this.fs[t]):this.lookupMutationBatch(e,t).next(n=>{if(n){const s=n.keys();return this.fs[t]=s,s}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=IDBKeyRange.lowerBound([this.userId,n]);let i=null;return Gt(e).ee({index:kn,range:s},(o,u,c)=>{u.userId===this.userId&&(N(u.batchId>=n,47524,{gs:n}),i=Cn(this.serializer,u)),c.done()}).next(()=>i)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=Ln;return Gt(e).ee({index:kn,range:t,reverse:!0},(s,i,o)=>{n=i.batchId,o.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Ln],[this.userId,Number.POSITIVE_INFINITY]);return Gt(e).H(kn,t).next(n=>n.map(s=>Cn(this.serializer,s)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=no(this.userId,t.path),s=IDBKeyRange.lowerBound(n),i=[];return gr(e).ee({range:s},(o,u,c)=>{const[h,f,p]=o,I=mt(f);if(h===this.userId&&t.path.isEqual(I))return Gt(e).get(p).next(b=>{if(!b)throw B(61480,{ys:o,batchId:p});N(b.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:b.userId,batchId:p}),i.push(Cn(this.serializer,b))});c.done()}).next(()=>i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new re(G);const s=[];return t.forEach(i=>{const o=no(this.userId,i.path),u=IDBKeyRange.lowerBound(o),c=gr(e).ee({range:u},(h,f,p)=>{const[I,b,C]=h,L=mt(b);I===this.userId&&i.path.isEqual(L)?n=n.add(C):p.done()});s.push(c)}),A.waitFor(s).next(()=>this.ws(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1,i=no(this.userId,n),o=IDBKeyRange.lowerBound(i);let u=new re(G);return gr(e).ee({range:o},(c,h,f)=>{const[p,I,b]=c,C=mt(I);p===this.userId&&n.isPrefixOf(C)?C.length===s&&(u=u.add(b)):f.done()}).next(()=>this.ws(e,u))}ws(e,t){const n=[],s=[];return t.forEach(i=>{s.push(Gt(e).get(i).next(o=>{if(o===null)throw B(35274,{batchId:i});N(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),n.push(Cn(this.serializer,o))}))}),A.waitFor(s).next(()=>n)}removeMutationBatch(e,t){return vm(e.le,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.bs(t.batchId)}),A.forEach(n,s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))}bs(e){delete this.fs[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return A.resolve();const n=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),s=[];return gr(e).ee({range:n},(i,o,u)=>{if(i[0]===this.userId){const c=mt(i[1]);s.push(c)}else u.done()}).next(()=>{N(s.length===0,56720,{vs:s.map(i=>i.canonicalString())})})})}containsKey(e,t){return Am(e,this.userId,t)}Ss(e){return Rm(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:Ln,lastStreamToken:""})}}function Am(r,e,t){const n=no(e,t.path),s=n[1],i=IDBKeyRange.lowerBound(n);let o=!1;return gr(r).ee({range:i,X:!0},(u,c,h)=>{const[f,p,I]=u;f===e&&p===s&&(o=!0),h.done()}).next(()=>o)}function Gt(r){return ve(r,ct)}function gr(r){return ve(r,Pr)}function Rm(r){return ve(r,qs)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(e){this.Ds=e}next(){return this.Ds+=2,this.Ds}static xs(){return new kt(0)}static Cs(){return new kt(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aA{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.Fs(e).next(t=>{const n=new kt(t.highestTargetId);return t.highestTargetId=n.next(),this.Os(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.Fs(e).next(t=>q.fromTimestamp(new se(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.Fs(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.Fs(e).next(s=>(s.highestListenSequenceNumber=t,n&&(s.lastRemoteSnapshotVersion=n.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.Os(e,s)))}addTargetData(e,t){return this.Ms(e,t).next(()=>this.Fs(e).next(n=>(n.targetCount+=1,this.Ns(t,n),this.Os(e,n))))}updateTargetData(e,t){return this.Ms(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>hr(e).delete(t.targetId)).next(()=>this.Fs(e)).next(n=>(N(n.targetCount>0,8065),n.targetCount-=1,this.Os(e,n)))}removeTargets(e,t,n){let s=0;const i=[];return hr(e).ee((o,u)=>{const c=Ts(this.serializer,u);c.sequenceNumber<=t&&n.get(c.targetId)===null&&(s++,i.push(this.removeTargetData(e,c)))}).next(()=>A.waitFor(i)).next(()=>s)}forEachTarget(e,t){return hr(e).ee((n,s)=>{const i=Ts(this.serializer,s);t(i)})}Fs(e){return yd(e).get(wo).next(t=>(N(t!==null,2888),t))}Os(e,t){return yd(e).put(wo,t)}Ms(e,t){return hr(e).put(Im(this.serializer,t))}Ns(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.Fs(e).next(t=>t.targetCount)}getTargetData(e,t){const n=oa(t),s=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let i=null;return hr(e).ee({range:s,index:Qf},(o,u,c)=>{const h=Ts(this.serializer,u);Pc(t,h.target)&&(i=h,c.done())}).next(()=>i)}addMatchingKeys(e,t,n){const s=[],i=tn(e);return t.forEach(o=>{const u=Ne(o.path);s.push(i.put({targetId:n,path:u})),s.push(this.referenceDelegate.addReference(e,n,o))}),A.waitFor(s)}removeMatchingKeys(e,t,n){const s=tn(e);return A.forEach(t,i=>{const o=Ne(i.path);return A.waitFor([s.delete([n,o]),this.referenceDelegate.removeReference(e,n,i)])})}removeMatchingKeysForTargetId(e,t){const n=tn(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(s)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),s=tn(e);let i=Q();return s.ee({range:n,X:!0},(o,u,c)=>{const h=mt(o[1]),f=new U(h);i=i.add(f)}).next(()=>i)}containsKey(e,t){const n=Ne(t.path),s=IDBKeyRange.bound([n],[$f(n)],!1,!0);let i=0;return tn(e).ee({index:Wu,X:!0,range:s},([o,u],c,h)=>{o!==0&&(i++,h.done())}).next(()=>i>0)}dt(e,t){return hr(e).get(t).next(n=>n?Ts(this.serializer,n):null)}}function hr(r){return ve(r,br)}function yd(r){return ve(r,Mn)}function tn(r){return ve(r,Sr)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uA{constructor(e,t){this.db=e,this.garbageCollector=Zp(this,t)}lr(e){const t=this.Ls(e);return this.db.getTargetCache().getTargetCount(e).next(n=>t.next(s=>n+s))}Ls(e){let t=0;return this.Er(e,n=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Er(e,t){return this.Bs(e,(n,s)=>t(s))}addReference(e,t,n){return Wi(e,n)}removeReference(e,t,n){return Wi(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Wi(e,t)}Us(e,t){return function(s,i){let o=!1;return Rm(s).te(u=>Am(s,u,i).next(c=>(c&&(o=!0),A.resolve(!c)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.Bs(e,(o,u)=>{if(u<=t){const c=this.Us(e,o).next(h=>{if(!h)return i++,n.getEntry(e,o).next(()=>(n.removeEntry(o,q.min()),tn(e).delete(function(p){return[0,Ne(p.path)]}(o))))});s.push(c)}}).next(()=>A.waitFor(s)).next(()=>n.apply(e)).next(()=>i)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Wi(e,t)}Bs(e,t){const n=tn(e);let s,i=rt.ce;return n.ee({index:Wu},([o,u],{path:c,sequenceNumber:h})=>{o===0?(i!==rt.ce&&t(new U(mt(s)),i),i=h,s=c):i=rt.ce}).next(()=>{i!==rt.ce&&t(new U(mt(s)),i)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Wi(r,e){return tn(r).put(function(n,s){return{targetId:0,path:Ne(n.path),sequenceNumber:s}}(e,r.currentSequenceNumber))}// Copyright 2024 Google LLC* @license
function Pm(r,e){var n;let t=e;for(const s of r.stages)t=cA({serializer:r.serializer,serverTimestampBehavior:(n=r.listenOptions)==null?void 0:n.serverTimestampBehavior},s,t);return t}function ca(r,e){return Pm(r,[e]).length>0}function bm(r,e){return ge(r)?ca(r,e):Xo(r,e)}function cA(r,e,t){if(e instanceof yi)return function(s,i,o){return o.filter(u=>u.isFoundDocument()&&`/${u.key.getCollectionPath().canonicalString()}`===i.Vr)}(0,e,t);if(e instanceof na)return function(s,i,o){return o.filter(u=>{const c=Ns($(i.condition).evaluate(s,u));return c!==void 0&&ut(c,Ke)})}(r,e,t);if(e instanceof Ii)return function(s,i,o){return o.filter(u=>u.isFoundDocument()&&u.key.getCollectionPath().lastSegment()===i.collectionId)}(0,e,t);if(e instanceof ea)return function(s,i,o){return o.filter(u=>u.isFoundDocument())}(0,0,t);if(e instanceof ta)return function(s,i,o){return o.filter(u=>u.isFoundDocument()&&i.mr.has(u.key.path.toStringWithLeadingSlash()))}(0,e,t);if(e instanceof Ur)return function(s,i,o){return o.slice(0,i.limit)}(0,e,t);if(e instanceof ra)return function(s,i,o){const u=i.orderings.map(c=>({ks:$(c.expr),direction:c.direction}));return[...o].sort((c,h)=>{for(const{ks:f,direction:p}of u){const I=Ns(f.evaluate(s,c)),b=Ns(f.evaluate(s,h)),C=ke(I??Et,b??Et);if(C!==0)return p==="ascending"?C:-C}return 0})}(r,e,t);throw new Error(`Unknown stage: ${e._name}`)}function Ru(r){const e=function(n){for(let s=n.stages.length-1;s>=0;s--){const i=n.stages[s];if(i instanceof ra)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")}(r);return(t,n)=>{for(const s of e){const i=Ns($(s.expr).evaluate({serializer:r.serializer},t)),o=Ns($(s.expr).evaluate({serializer:r.serializer},n)),u=ke(i||Et,o||Et);if(u!==0)return s.direction==="ascending"?u:-u}return 0}}function za(r){for(let e=r.stages.length-1;e>=0;e--){const t=r.stages[e];if(t instanceof Ur)return{limit:t.limit}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sm{constructor(){this.changes=new Mt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,pe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?A.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lA{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return Ht(e).put(n)}removeEntry(e,t,n){return Ht(e).delete(function(i,o){const u=i.path.toArray();return[u.slice(0,u.length-2),u[u.length-2],xo(o),u[u.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.qs(e,n)))}getEntry(e,t){let n=pe.newInvalidDocument(t);return Ht(e).ee({index:ro,range:IDBKeyRange.only(ps(t))},(s,i)=>{n=this.$s(t,i)}).next(()=>n)}Ks(e,t){let n={size:0,document:pe.newInvalidDocument(t)};return Ht(e).ee({index:ro,range:IDBKeyRange.only(ps(t))},(s,i)=>{n={document:this.$s(t,i),size:No(i)}}).next(()=>n)}getEntries(e,t){let n=Ee();return this.Ws(e,t,(s,i)=>{const o=this.$s(s,i);n=n.insert(s,o)}).next(()=>n)}getAllEntries(e){let t=Ee();return Ht(e).ee((n,s)=>{const i=this.$s(U.fromSegments(s.prefixPath.concat(s.collectionGroup,s.documentId)),s);t=t.insert(i.key,i)}).next(()=>t)}Qs(e,t){let n=Ee(),s=new he(U.comparator);return this.Ws(e,t,(i,o)=>{const u=this.$s(i,o);n=n.insert(i,u),s=s.insert(i,No(o))}).next(()=>({documents:n,Gs:s}))}Ws(e,t,n){if(t.isEmpty())return A.resolve();let s=new re(Td);t.forEach(c=>s=s.add(c));const i=IDBKeyRange.bound(ps(s.first()),ps(s.last())),o=s.getIterator();let u=o.getNext();return Ht(e).ee({index:ro,range:i},(c,h,f)=>{const p=U.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;u&&Td(u,p)<0;)n(u,null),u=o.getNext();u&&u.isEqual(p)&&(n(u,h),u=o.hasNext()?o.getNext():null),u?f.j(ps(u)):f.done()}).next(()=>{for(;u;)n(u,null),u=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,n,s,i){const o=ge(t)?ee.fromString(Ei(t)):t.path,u=[o.popLast().toArray(),o.lastSegment(),xo(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],c=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Ht(e).H(IDBKeyRange.bound(u,c,!0)).next(h=>{i==null||i.incrementDocumentReadCount(h.length);let f=Ee();for(const p of h){const I=this.$s(U.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);I.isFoundDocument()&&(bm(t,I)||s.has(I.key))&&(f=f.insert(I.key,I))}return f})}getAllFromCollectionGroup(e,t,n,s){let i=Ee();const o=Ed(t,n),u=Ed(t,Ze.max());return Ht(e).ee({index:Wf,range:IDBKeyRange.bound(o,u,!0)},(c,h,f)=>{const p=this.$s(U.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(p.key,p),i.size===s&&f.done()}).next(()=>i)}newChangeBuffer(e){return new hA(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return Id(e).get(su).next(t=>(N(!!t,20021),t))}qs(e,t){return Id(e).put(su,t)}$s(e,t){if(t){const n=Yv(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(q.min())))return n}return pe.newInvalidDocument(e)}}function Vm(r){return new lA(r)}class hA extends Sm{constructor(e,t){super(),this.zs=e,this.trackRemovals=t,this.js=new Mt(n=>n.toString(),(n,s)=>n.isEqual(s))}applyChanges(e){const t=[];let n=0,s=new re((i,o)=>G(i.canonicalString(),o.canonicalString()));return this.changes.forEach((i,o)=>{const u=this.js.get(i);if(t.push(this.zs.removeEntry(e,i,u.readTime)),o.isValidDocument()){const c=id(this.zs.serializer,o);s=s.add(i.path.popLast());const h=No(c);n+=h-u.size,t.push(this.zs.addEntry(e,i,c))}else if(n-=u.size,this.trackRemovals){const c=id(this.zs.serializer,o.convertToNoDocument(q.min()));t.push(this.zs.addEntry(e,i,c))}}),s.forEach(i=>{t.push(this.zs.indexManager.addToCollectionParentIndex(e,i))}),t.push(this.zs.updateMetadata(e,n)),A.waitFor(t)}getFromCache(e,t){return this.zs.Ks(e,t).next(n=>(this.js.set(t,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(e,t){return this.zs.Qs(e,t).next(({documents:n,Gs:s})=>(s.forEach((i,o)=>{this.js.set(i,{size:o,readTime:n.get(i).readTime})}),n))}}function Id(r){return ve(r,$s)}function Ht(r){return ve(r,To)}function ps(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Ed(r,e){const t=e.documentKey.path.toArray();return[r,xo(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function Td(r,e){const t=r.path.toArray(),n=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<n.length-2;++i)if(s=G(t[i],n[i]),s)return s;return s=G(t.length,n.length),s||(s=G(t[t.length-2],n[n.length-2]),s||G(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dA{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cm{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(n=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(n!==null&&Vs(n.mutation,s,st.empty(),se.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.getLocalViewOfDocuments(e,n,Q()).next(()=>n))}getLocalViewOfDocuments(e,t,n=Q()){const s=tt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,n).next(i=>{let o=fr();return i.forEach((u,c)=>{o=o.insert(u,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const n=tt();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,Q()))}populateOverlays(e,t,n){const s=[];return n.forEach(i=>{t.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,u)=>{t.set(o,u)})})}computeViews(e,t,n,s){let i=Ee();const o=Ds(),u=function(){return Ds()}();return t.forEach((c,h)=>{const f=n.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof In)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),Vs(f.mutation,h,f.mutation.getFieldMask(),se.now())):o.set(h.key,st.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((h,f)=>o.set(h,f)),t.forEach((h,f)=>u.set(h,new dA(f,o.get(h)??null))),u))}recalculateAndSaveOverlays(e,t){const n=Ds();let s=new he((o,u)=>o-u),i=Q();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const u of o)u.keys().forEach(c=>{const h=t.get(c);if(h===null)return;let f=n.get(c)||st.empty();f=u.applyToLocalView(h,f),n.set(c,f);const p=(s.get(u.batchId)||Q()).add(c);s=s.insert(u.batchId,p)})}).next(()=>{const o=[],u=s.getReverseIterator();for(;u.hasNext();){const c=u.getNext(),h=c.key,f=c.value,p=Cp();f.forEach(I=>{if(!i.has(I)){const b=_p(t.get(I),n.get(I));b!==null&&p.set(I,b),i=i.add(I)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,p))}return A.waitFor(o)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.recalculateAndSaveOverlays(e,n))}getDocumentsMatchingQuery(e,t,n,s){return ge(t)?this.getDocumentsMatchingPipeline(e,t,n,s):AT(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):RT(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,s):this.getDocumentsMatchingCollectionQuery(e,t,n,s)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-i.size):A.resolve(tt());let u=Fs,c=i;return o.next(h=>A.forEach(h,(f,p)=>(u<p.largestBatchId&&(u=p.largestBatchId),i.get(f)?A.resolve():this.remoteDocumentCache.getEntry(e,f).next(I=>{c=c.insert(f,I)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,c,h,Q())).next(f=>({batchId:u,changes:Vp(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new U(t)).next(n=>{let s=fr();return n.isFoundDocument()&&(s=s.insert(n.key,n)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,n,s){const i=t.collectionGroup;let o=fr();return this.indexManager.getCollectionParents(e,i).next(u=>A.forEach(u,c=>{const h=function(p,I){return new Yo(I,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,n,s).next(f=>{f.forEach((p,I)=>{o=o.insert(p,I)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,n,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s))).next(o=>this.retrieveMatchingLocalDocuments(i,o,u=>Xo(t,u)))}getDocumentsMatchingPipeline(e,t,n,s){if(un(t)==="collection_group"){const i=Ic(t);let o=fr();return this.indexManager.getCollectionParents(e,i).next(u=>A.forEach(u,c=>{const h=function(p,I){const b=p.stages.map(C=>C instanceof Ii?new yi(I.canonicalString(),{}):C);return new Ue(p.serializer,b)}(t,c.child(i));return this.getDocumentsMatchingPipeline(e,h,n,s).next(f=>{f.forEach((p,I)=>{o=o.insert(p,I)})})}).next(()=>o))}{let i;return this.getOverlaysForPipeline(e,t,n.largestBatchId).next(o=>{switch(i=o,un(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,i,s);case"documents":let u=Q();for(const c of Eu(t))u=u.add(U.fromPath(c));return this.remoteDocumentCache.getEntries(e,u);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new F("invalid-argument",`Invalid pipeline source to execute offline: ${bt(t)}`)}}).next(o=>this.retrieveMatchingLocalDocuments(i,o,u=>ca(t,u)))}}retrieveMatchingLocalDocuments(e,t,n){e.forEach((i,o)=>{const u=o.getKey();t.get(u)===null&&(t=t.insert(u,pe.newInvalidDocument(u)))});let s=fr();return t.forEach((i,o)=>{const u=e.get(i);u!==void 0&&Vs(u.mutation,o,st.empty(),se.now()),n(o)&&(s=s.insert(i,o))}),s}getOverlaysForPipeline(e,t,n){switch(un(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,ee.fromString(Ei(t)),n);case"collection_group":throw new F("invalid-argument",`Unexpected collection group pipeline: ${bt(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,Eu(t).map(s=>U.fromPath(s)));case"database":return this.documentOverlayCache.getAllOverlays(e,n);default:throw new F("invalid-argument",`Failed to get overlays for pipeline: ${bt(t)}`)}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fA{constructor(e){this.serializer=e,this.Hs=new Map,this.Js=new Map}getBundleMetadata(e,t){return A.resolve(this.Hs.get(t))}saveBundleMetadata(e,t){return this.Hs.set(t.id,function(s){return{id:s.id,version:s.version,createTime:qe(s.createTime)}}(t)),A.resolve()}getNamedQuery(e,t){return A.resolve(this.Js.get(t))}saveNamedQuery(e,t){return this.Js.set(t.name,function(s){return{name:s.name,query:Em(s.bundledQuery),readTime:qe(s.readTime)}}(t)),A.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pA{constructor(){this.overlays=new he(U.comparator),this.Ys=new Map}getOverlay(e,t){return A.resolve(this.overlays.get(t))}getOverlays(e,t){const n=tt();return A.forEach(t,s=>this.getOverlay(e,s).next(i=>{i!==null&&n.set(s,i)})).next(()=>n)}getAllOverlays(e,t){const n=tt();return this.overlays.forEach((s,i)=>{i.largestBatchId>t&&n.set(s,i)}),A.resolve(n)}saveOverlays(e,t,n){return n.forEach((s,i)=>{this.Hr(e,t,i)}),A.resolve()}removeOverlaysForBatchId(e,t,n){const s=this.Ys.get(n);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ys.delete(n)),A.resolve()}getOverlaysForCollection(e,t,n){const s=tt(),i=t.length+1,o=new U(t.child("")),u=this.overlays.getIteratorFrom(o);for(;u.hasNext();){const c=u.getNext().value,h=c.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>n&&s.set(c.getKey(),c)}return A.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let i=new he((h,f)=>h-f);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=i.get(h.largestBatchId);f===null&&(f=tt(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const u=tt(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((h,f)=>u.set(h,f)),!(u.size()>=s)););return A.resolve(u)}Hr(e,t,n){const s=this.overlays.get(n.key);if(s!==null){const o=this.Ys.get(s.largestBatchId).delete(n.key);this.Ys.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new Vc(t,n));let i=this.Ys.get(t);i===void 0&&(i=Q(),this.Ys.set(t,i)),this.Ys.set(t,i.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mA{constructor(){this.sessionToken=de.EMPTY_BYTE_STRING}getSessionToken(e){return A.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,A.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc{constructor(){this.Zs=new re(Re.Xs),this.e_=new re(Re.t_)}isEmpty(){return this.Zs.isEmpty()}addReference(e,t){const n=new Re(e,t);this.Zs=this.Zs.add(n),this.e_=this.e_.add(n)}n_(e,t){e.forEach(n=>this.addReference(n,t))}removeReference(e,t){this.r_(new Re(e,t))}i_(e,t){e.forEach(n=>this.removeReference(n,t))}s_(e){const t=new U(new ee([])),n=new Re(t,e),s=new Re(t,e+1),i=[];return this.e_.forEachInRange([n,s],o=>{this.r_(o),i.push(o.key)}),i}__(){this.Zs.forEach(e=>this.r_(e))}r_(e){this.Zs=this.Zs.delete(e),this.e_=this.e_.delete(e)}o_(e){const t=new U(new ee([])),n=new Re(t,e),s=new Re(t,e+1);let i=Q();return this.e_.forEachInRange([n,s],o=>{i=i.add(o.key)}),i}containsKey(e){const t=new Re(e,0),n=this.Zs.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class Re{constructor(e,t){this.key=e,this.a_=t}static Xs(e,t){return U.comparator(e.key,t.key)||G(e.a_,t.a_)}static t_(e,t){return G(e.a_,t.a_)||U.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gA{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.gs=1,this.u_=new re(Re.Xs)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,s){const i=this.gs;this.gs++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new bc(i,t,n,s);this.mutationQueue.push(o);for(const u of s)this.u_=this.u_.add(new Re(u.key,i)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return A.resolve(o)}lookupMutationBatch(e,t){return A.resolve(this.c_(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,s=this.l_(n),i=s<0?0:s;return A.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?Ln:this.gs-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Re(t,0),s=new Re(t,Number.POSITIVE_INFINITY),i=[];return this.u_.forEachInRange([n,s],o=>{const u=this.c_(o.a_);i.push(u)}),A.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new re(G);return t.forEach(s=>{const i=new Re(s,0),o=new Re(s,Number.POSITIVE_INFINITY);this.u_.forEachInRange([i,o],u=>{n=n.add(u.a_)})}),A.resolve(this.E_(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,s=n.length+1;let i=n;U.isDocumentKey(i)||(i=i.child(""));const o=new Re(new U(i),0);let u=new re(G);return this.u_.forEachWhile(c=>{const h=c.key.path;return!!n.isPrefixOf(h)&&(h.length===s&&(u=u.add(c.a_)),!0)},o),A.resolve(this.E_(u))}E_(e){const t=[];return e.forEach(n=>{const s=this.c_(n);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){N(this.h_(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.u_;return A.forEach(t.mutations,s=>{const i=new Re(s.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.u_=n})}bs(e){}containsKey(e,t){const n=new Re(t,0),s=this.u_.firstAfterOrEqual(n);return A.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}h_(e,t){return this.l_(e)}l_(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}c_(e){const t=this.l_(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _A{constructor(e){this.T_=e,this.docs=function(){return new he(U.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,s=this.docs.get(n),i=s?s.size:0,o=this.T_(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return A.resolve(n?n.document.mutableCopy():pe.newInvalidDocument(t))}getEntries(e,t){let n=Ee();return t.forEach(s=>{const i=this.docs.get(s);n=n.insert(s,i?i.document.mutableCopy():pe.newInvalidDocument(s))}),A.resolve(n)}getAllEntries(e){let t=Ee();return this.docs.forEach((n,s)=>{t=t.insert(n,s.document)}),A.resolve(t)}getDocumentsMatchingQuery(e,t,n,s){let i,o;ge(t)?(i=ee.fromString(Ei(t)),o=f=>ca(t,f)):(i=t.path,o=f=>Xo(t,f));let u=Ee();const c=new U(i.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(c);for(;h.hasNext();){const{key:f,value:{document:p}}=h.getNext();if(!i.isPrefixOf(f.path))break;f.path.length>i.length+1||Gu(jf(p),n)<=0||(s.has(p.key)||o(p))&&(u=u.insert(p.key,p.mutableCopy()))}return A.resolve(u)}getAllFromCollectionGroup(e,t,n,s){B(9500)}P_(e,t){return A.forEach(this.docs,n=>t(n))}newChangeBuffer(e){return new yA(this)}getSize(e){return A.resolve(this.size)}}class yA extends Sm{constructor(e){super(),this.zs=e}applyChanges(e){const t=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?t.push(this.zs.addEntry(e,s)):this.zs.removeEntry(n)}),A.waitFor(t)}getFromCache(e,t){return this.zs.getEntry(e,t)}getAllFromCache(e,t){return this.zs.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IA{constructor(e){this.persistence=e,this.R_=new Mt(t=>oa(t),Pc),this.lastRemoteSnapshotVersion=q.min(),this.highestTargetId=0,this.I_=0,this.A_=new Dc,this.targetCount=0,this.V_=kt.xs()}forEachTarget(e,t){return this.R_.forEach((n,s)=>t(s)),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.I_)}allocateTargetId(e){return this.highestTargetId=this.V_.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.I_&&(this.I_=t),A.resolve()}Ms(e){this.R_.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.V_=new kt(t),this.highestTargetId=t),e.sequenceNumber>this.I_&&(this.I_=e.sequenceNumber)}addTargetData(e,t){return this.Ms(t),this.targetCount+=1,A.resolve()}updateTargetData(e,t){return this.Ms(t),A.resolve()}removeTargetData(e,t){return this.R_.delete(t.target),this.A_.s_(t.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,t,n){let s=0;const i=[];return this.R_.forEach((o,u)=>{u.sequenceNumber<=t&&n.get(u.targetId)===null&&(this.R_.delete(o),i.push(this.removeMatchingKeysForTargetId(e,u.targetId)),s++)}),A.waitFor(i).next(()=>s)}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,t){const n=this.R_.get(t)||null;return A.resolve(n)}addMatchingKeys(e,t,n){return this.A_.n_(t,n),A.resolve()}removeMatchingKeys(e,t,n){this.A_.i_(t,n);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),A.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.A_.s_(t),A.resolve()}getMatchingKeysForTargetId(e,t){const n=this.A_.o_(t);return A.resolve(n)}containsKey(e,t){return A.resolve(this.A_.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{constructor(e,t){this.d_={},this.overlays={},this.f_=new rt(0),this.m_=!1,this.m_=!0,this.p_=new mA,this.referenceDelegate=e(this),this.g_=new IA(this),this.indexManager=new iA,this.remoteDocumentCache=function(s){return new _A(s)}(n=>this.referenceDelegate.y_(n)),this.serializer=new ym(t),this.w_=new fA(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.m_=!1,Promise.resolve()}get started(){return this.m_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new pA,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.d_[e.toKey()];return n||(n=new gA(t,this.referenceDelegate),this.d_[e.toKey()]=n),n}getGlobalsCache(){return this.p_}getTargetCache(){return this.g_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.w_}runTransaction(e,t,n){D("MemoryPersistence","Starting transaction:",e);const s=new EA(this.f_.next());return this.referenceDelegate.b_(),n(s).next(i=>this.referenceDelegate.v_(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}S_(e,t){return A.or(Object.values(this.d_).map(n=>()=>n.containsKey(e,t)))}}class EA extends Kf{constructor(e){super(),this.currentSequenceNumber=e}}class la{constructor(e){this.persistence=e,this.D_=new Dc,this.x_=null}static C_(e){return new la(e)}get F_(){if(this.x_)return this.x_;throw B(60996)}addReference(e,t,n){return this.D_.addReference(n,t),this.F_.delete(n.toString()),A.resolve()}removeReference(e,t,n){return this.D_.removeReference(n,t),this.F_.add(n.toString()),A.resolve()}markPotentiallyOrphaned(e,t){return this.F_.add(t.toString()),A.resolve()}removeTarget(e,t){this.D_.s_(t.targetId).forEach(s=>this.F_.add(s.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(i=>this.F_.add(i.toString()))}).next(()=>n.removeTargetData(e,t))}b_(){this.x_=new Set}v_(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.F_,n=>{const s=U.fromPath(n);return this.O_(e,s).next(i=>{i||t.removeEntry(s,q.min())})}).next(()=>(this.x_=null,t.apply(e)))}updateLimboDocument(e,t){return this.O_(e,t).next(n=>{n?this.F_.delete(t.toString()):this.F_.add(t.toString())})}y_(e){return 0}O_(e,t){return A.or([()=>A.resolve(this.D_.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.S_(e,t)])}}class ko{constructor(e,t){this.persistence=e,this.M_=new Mt(n=>Ne(n.path),(n,s)=>n.isEqual(s)),this.garbageCollector=Zp(this,t)}static C_(e,t){return new ko(e,t)}b_(){}v_(e){return A.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}lr(e){const t=this.Ls(e);return this.persistence.getTargetCache().getTargetCount(e).next(n=>t.next(s=>n+s))}Ls(e){let t=0;return this.Er(e,n=>{t++}).next(()=>t)}Er(e,t){return A.forEach(this.M_,(n,s)=>this.Us(e,n,s).next(i=>i?A.resolve():t(s)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.P_(e,o=>this.Us(e,o,t).next(u=>{u||(n++,i.removeEntry(o,q.min()))})).next(()=>i.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.M_.set(t,e.currentSequenceNumber),A.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.M_.set(n,e.currentSequenceNumber),A.resolve()}removeReference(e,t,n){return this.M_.set(n,e.currentSequenceNumber),A.resolve()}updateLimboDocument(e,t){return this.M_.set(t,e.currentSequenceNumber),A.resolve()}y_(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=so(e.data.value)),t}Us(e,t,n){return A.or([()=>this.persistence.S_(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.M_.get(t);return A.resolve(s!==void 0&&s>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TA{constructor(e){this.serializer=e}U(e,t,n,s){const i=new qo("createOrUpgrade",t);n<1&&s>=1&&(function(c){c.createObjectStore(fi)}(e),function(c){c.createObjectStore(qs,{keyPath:xE}),c.createObjectStore(ct,{keyPath:bh,autoIncrement:!0}).createIndex(kn,Sh,{unique:!0}),c.createObjectStore(Pr)}(e),wd(e),function(c){c.createObjectStore(Sn)}(e));let o=A.resolve();return n<3&&s>=3&&(n!==0&&(function(c){c.deleteObjectStore(Sr),c.deleteObjectStore(br),c.deleteObjectStore(Mn)}(e),wd(e)),o=o.next(()=>function(c){const h=c.store(Mn),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:q.min().toTimestamp(),targetCount:0};return h.put(wo,f)}(i))),n<4&&s>=4&&(n!==0&&(o=o.next(()=>function(c,h){return h.store(ct).H().next(p=>{c.deleteObjectStore(ct),c.createObjectStore(ct,{keyPath:bh,autoIncrement:!0}).createIndex(kn,Sh,{unique:!0});const I=h.store(ct),b=p.map(C=>I.put(C));return A.waitFor(b)})}(e,i))),o=o.next(()=>{(function(c){c.createObjectStore(Vr,{keyPath:BE})})(e)})),n<5&&s>=5&&(o=o.next(()=>this.N_(i))),n<6&&s>=6&&(o=o.next(()=>(function(c){c.createObjectStore($s)}(e),this.L_(i)))),n<7&&s>=7&&(o=o.next(()=>this.B_(i))),n<8&&s>=8&&(o=o.next(()=>this.U_(e,i))),n<9&&s>=9&&(o=o.next(()=>{(function(c){c.objectStoreNames.contains("remoteDocumentChanges")&&c.deleteObjectStore("remoteDocumentChanges")})(e)})),n<10&&s>=10&&(o=o.next(()=>this.k_(i))),n<11&&s>=11&&(o=o.next(()=>{(function(c){c.createObjectStore(jo,{keyPath:qE})})(e),function(c){c.createObjectStore(zo,{keyPath:$E})}(e)})),n<12&&s>=12&&(o=o.next(()=>{(function(c){const h=c.createObjectStore(Ko,{keyPath:QE});h.createIndex(ou,YE,{unique:!1}),h.createIndex(Xf,JE,{unique:!1})})(e)})),n<13&&s>=13&&(o=o.next(()=>function(c){const h=c.createObjectStore(To,{keyPath:NE});h.createIndex(ro,kE),h.createIndex(Wf,OE)}(e)).next(()=>this.q_(e,i)).next(()=>e.deleteObjectStore(Sn))),n<14&&s>=14&&(o=o.next(()=>this.K_(e,i))),n<15&&s>=15&&(o=o.next(()=>function(c){c.createObjectStore(Qu,{keyPath:jE,autoIncrement:!0}).createIndex(iu,zE,{unique:!1}),c.createObjectStore(Ps,{keyPath:KE}).createIndex(Yf,GE,{unique:!1}),c.createObjectStore(bs,{keyPath:HE}).createIndex(Jf,WE,{unique:!1})}(e))),n<16&&s>=16&&(o=o.next(()=>{t.objectStore(Ps).clear()}).next(()=>{t.objectStore(bs).clear()})),n<17&&s>=17&&(o=o.next(()=>{(function(c){c.createObjectStore(Yu,{keyPath:XE})})(e)})),n<18&&s>=18&&Gd()&&(o=o.next(()=>{t.objectStore(Ps).clear()}).next(()=>{t.objectStore(bs).clear()})),o}L_(e){let t=0;return e.store(Sn).ee((n,s)=>{t+=No(s)}).next(()=>{const n={byteSize:t};return e.store($s).put(su,n)})}N_(e){const t=e.store(qs),n=e.store(ct);return t.H().next(s=>A.forEach(s,i=>{const o=IDBKeyRange.bound([i.userId,Ln],[i.userId,i.lastAcknowledgedBatchId]);return n.H(kn,o).next(u=>A.forEach(u,c=>{N(c.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:c.batchId});const h=Cn(this.serializer,c);return vm(e,i.userId,h).next(()=>{})}))}))}B_(e){const t=e.store(Sr),n=e.store(Sn);return e.store(Mn).get(wo).next(s=>{const i=[];return n.ee((o,u)=>{const c=new ee(o),h=function(p){return[0,Ne(p)]}(c);i.push(t.get(h).next(f=>f?A.resolve():(p=>t.put({targetId:0,path:Ne(p),sequenceNumber:s.highestListenSequenceNumber}))(c)))}).next(()=>A.waitFor(i))})}U_(e,t){e.createObjectStore(js,{keyPath:FE});const n=t.store(js),s=new xc,i=o=>{if(s.add(o)){const u=o.lastSegment(),c=o.popLast();return n.put({collectionId:u,parent:Ne(c)})}};return t.store(Sn).ee({X:!0},(o,u)=>{const c=new ee(o);return i(c.popLast())}).next(()=>t.store(Pr).ee({X:!0},([o,u,c],h)=>{const f=mt(u);return i(f.popLast())}))}k_(e){const t=e.store(br);return t.ee((n,s)=>{const i=Ts(this.serializer,s),o=Im(this.serializer,i);return t.put(o)})}q_(e,t){const n=t.store(Sn),s=[];return n.ee((i,o)=>{const u=t.store(To),c=function(p){return p.document?new U(ee.fromString(p.document.name).popFirst(5)):p.noDocument?U.fromSegments(p.noDocument.path):p.unknownDocument?U.fromSegments(p.unknownDocument.path):B(36783)}(o).path.toArray(),h={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(u.put(h))}).next(()=>A.waitFor(s))}K_(e,t){const n=t.store(ct),s=Vm(this.serializer),i=new Nc(la.C_,this.serializer.zr);return n.H().next(o=>{const u=new Map;return o.forEach(c=>{let h=u.get(c.userId)??Q();Cn(this.serializer,c).keys().forEach(f=>h=h.add(f)),u.set(c.userId,h)}),A.forEach(u,(c,h)=>{const f=new be(h),p=aa.jr(this.serializer,f),I=i.getIndexManager(f),b=ua.jr(f,this.serializer,I,i.referenceDelegate);return new Cm(s,b,p,I).recalculateAndSaveOverlaysForDocumentKeys(new au(t,rt.ce),c).next()})})}}function wd(r){r.createObjectStore(Sr,{keyPath:ME}).createIndex(Wu,UE,{unique:!0}),r.createObjectStore(br,{keyPath:"targetId"}).createIndex(Qf,LE,{unique:!0}),r.createObjectStore(Mn)}const Wt="IndexedDbPersistence",Ka=18e5,Ga=5e3,Ha="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",wA="main";class kc{constructor(e,t,n,s,i,o,u,c,h,f,p=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Tn=i,this.window=o,this.document=u,this.W_=h,this.Q_=f,this.G_=p,this.f_=null,this.m_=!1,this.isPrimary=!1,this.networkEnabled=!0,this.z_=null,this.inForeground=!1,this.j_=null,this.H_=null,this.J_=Number.NEGATIVE_INFINITY,this.Y_=I=>Promise.resolve(),!kc.C())throw new F(x.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new uA(this,s),this.Z_=t+wA,this.serializer=new ym(c),this.X_=new an(this.Z_,this.G_,new TA(this.serializer)),this.p_=new Zv,this.g_=new aA(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Vm(this.serializer),this.w_=new Xv,this.window&&this.window.localStorage?this.eo=this.window.localStorage:(this.eo=null,f===!1&&Fe(Wt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.no().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new F(x.FAILED_PRECONDITION,Ha);return this.ro(),this.io(),this.so(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.g_.getHighestSequenceNumber(e))}).then(e=>{this.f_=new rt(e,this.W_)}).then(()=>{this.m_=!0}).catch(e=>(this.X_&&this.X_.close(),Promise.reject(e)))}_o(e){return this.Y_=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.X_.q(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Tn.enqueueAndForget(async()=>{this.started&&await this.no()}))}no(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Qi(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.oo(e).next(t=>{t||(this.isPrimary=!1,this.Tn.enqueueRetryable(()=>this.Y_(!1)))})}).next(()=>this.ao(e)).next(t=>this.isPrimary&&!t?this.uo(e).next(()=>!1):!!t&&this.co(e).next(()=>!0))).catch(e=>{if(yn(e))return D(Wt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return D(Wt,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Tn.enqueueRetryable(()=>this.Y_(e)),this.isPrimary=e})}oo(e){return ms(e).get(ir).next(t=>A.resolve(this.lo(t)))}Eo(e){return Qi(e).delete(this.clientId)}async ho(){if(this.isPrimary&&!this.To(this.J_,Ka)){this.J_=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const n=ve(t,Vr);return n.H().next(s=>{const i=this.Po(s,Ka),o=s.filter(u=>i.indexOf(u)===-1);return A.forEach(o,u=>n.delete(u.clientId)).next(()=>o)})}).catch(()=>[]);if(this.eo)for(const t of e)this.eo.removeItem(this.Ro(t.clientId))}}so(){this.H_=this.Tn.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.no().then(()=>this.ho()).then(()=>this.so()))}lo(e){return!!e&&e.ownerId===this.clientId}ao(e){return this.Q_?A.resolve(!0):ms(e).get(ir).next(t=>{if(t!==null&&this.To(t.leaseTimestampMs,Ga)&&!this.Io(t.ownerId)){if(this.lo(t)&&this.networkEnabled)return!0;if(!this.lo(t)){if(!t.allowTabSynchronization)throw new F(x.FAILED_PRECONDITION,Ha);return!1}}return!(!this.networkEnabled||!this.inForeground)||Qi(e).H().next(n=>this.Po(n,Ga).find(s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,u=this.networkEnabled===s.networkEnabled;if(i||o&&u)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&D(Wt,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.m_=!1,this.Ao(),this.H_&&(this.H_.cancel(),this.H_=null),this.Vo(),this.fo(),await this.X_.runTransaction("shutdown","readwrite",[fi,Vr],e=>{const t=new au(e,rt.ce);return this.uo(t).next(()=>this.Eo(t))}),this.X_.close(),this.mo()}Po(e,t){return e.filter(n=>this.To(n.updateTimeMs,t)&&!this.Io(n.clientId))}po(){return this.runTransaction("getActiveClients","readonly",e=>Qi(e).H().next(t=>this.Po(t,Ka).map(n=>n.clientId)))}get started(){return this.m_}getGlobalsCache(){return this.p_}getMutationQueue(e,t){return ua.jr(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.g_}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new oA(e,this.serializer.zr.databaseId)}getDocumentOverlayCache(e){return aa.jr(this.serializer,e)}getBundleCache(){return this.w_}runTransaction(e,t,n){D(Wt,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=function(c){return c===18?tT:c===17?np:c===16?eT:c===15?Ju:c===14?tp:c===13?ep:c===12?ZE:c===11?Zf:void B(60245)}(this.G_);let o;return this.X_.runTransaction(e,s,i,u=>(o=new au(u,this.f_?this.f_.next():rt.ce),t==="readwrite-primary"?this.oo(o).next(c=>!!c||this.ao(o)).next(c=>{if(!c)throw Fe(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Tn.enqueueRetryable(()=>this.Y_(!1)),new F(x.FAILED_PRECONDITION,zf);return n(o)}).next(c=>this.co(o).next(()=>c)):this.yo(o).next(()=>n(o)))).then(u=>(o.raiseOnCommittedEvent(),u))}yo(e){return ms(e).get(ir).next(t=>{if(t!==null&&this.To(t.leaseTimestampMs,Ga)&&!this.Io(t.ownerId)&&!this.lo(t)&&!(this.Q_||this.allowTabSynchronization&&t.allowTabSynchronization))throw new F(x.FAILED_PRECONDITION,Ha)})}co(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return ms(e).put(ir,t)}static C(){return an.C()}uo(e){const t=ms(e);return t.get(ir).next(n=>this.lo(n)?(D(Wt,"Releasing primary lease."),t.delete(ir)):A.resolve())}To(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(Fe(`Detected an update time that is in the future: ${e} > ${n}`),!1))}ro(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.j_=()=>{this.Tn.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.no()))},this.document.addEventListener("visibilitychange",this.j_),this.inForeground=this.document.visibilityState==="visible")}Vo(){this.j_&&(this.document.removeEventListener("visibilitychange",this.j_),this.j_=null)}io(){var e;typeof((e=this.window)==null?void 0:e.addEventListener)=="function"&&(this.z_=()=>{this.Ao();const t=/(?:Version|Mobile)\/1[456]/;Kd()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Tn.enterRestrictedMode(!0),this.Tn.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.z_))}fo(){this.z_&&(this.window.removeEventListener("pagehide",this.z_),this.z_=null)}Io(e){var t;try{const n=((t=this.eo)==null?void 0:t.getItem(this.Ro(e)))!==null;return D(Wt,`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return Fe(Wt,"Failed to get zombied client id.",n),!1}}Ao(){if(this.eo)try{this.eo.setItem(this.Ro(this.clientId),String(Date.now()))}catch(e){Fe("Failed to set zombie client id.",e)}}mo(){if(this.eo)try{this.eo.removeItem(this.Ro(this.clientId))}catch{}}Ro(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function ms(r){return ve(r,fi)}function Qi(r){return ve(r,Vr)}function vA(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oc{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.wo=n,this.bo=s}static vo(e,t){let n=Q(),s=Q();for(const i of t.docChanges)switch(i.type){case 0:n=n.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Oc(e,t.fromCache,n,s)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AA(r,e){return U.comparator(r.key,e.key)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RA{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xm{constructor(){this.So=!1,this.Do=!1,this.xo=100,this.Co=function(){return Kd()?8:Gf(we())>0?6:4}()}initialize(e,t){this.Fo=e,this.indexManager=t,this.So=!0}getDocumentsMatchingQuery(e,t,n,s){const i={result:null};return this.Oo(e,t).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.Mo(e,t,s,n).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new RA;return this.No(e,t,o).next(u=>{if(i.result=u,this.Do)return this.Lo(e,t,o,u.size)})}).next(()=>i.result)}Lo(e,t,n,s){return ge(t)?A.resolve():n.documentReadCount<this.xo?(dr()<=J.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",xs(t),"since it only creates cache indexes for collection contains","more than or equal to",this.xo,"documents"),A.resolve()):(dr()<=J.DEBUG&&D("QueryEngine","Query:",xs(t),"scans",n.documentReadCount,"local documents and returns",s,"documents as results."),n.documentReadCount>this.Co*s?(dr()<=J.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",xs(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,it(t))):A.resolve())}Oo(e,t){if(ge(t))return A.resolve(null);let n=t;if($h(n))return A.resolve(null);let s=it(n);return this.indexManager.getIndexType(e,s).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=pu(n,null,"F"),s=it(n)),this.indexManager.getDocumentsMatchingTarget(e,s).next(o=>{const u=Q(...o);return this.Fo.getDocuments(e,u).next(c=>this.indexManager.getMinOffset(e,s).next(h=>{const f=this.Bo(n,c);return this.Uo(n,f,u,h.readTime)?this.Oo(e,pu(n,null,"F")):this.ko(e,f,n,h)}))})))}Mo(e,t,n,s){return(ge(t)?function(o){for(const u of o.stages){if(u instanceof Ur||u instanceof rd)return!1;if(u instanceof na){if(u.condition instanceof om&&u.condition._expr.name==="exists"&&u.condition._expr.params[0]instanceof zr&&u.condition._expr.params[0].fieldName===vr)continue;return!1}}return!0}(t):$h(t))||s.isEqual(q.min())?A.resolve(null):this.Fo.getDocuments(e,n).next(i=>{const o=this.Bo(t,i);return this.Uo(t,o,n,s)?A.resolve(null):(dr()<=J.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),sd(t)),this.ko(e,o,t,vE(s,Fs)).next(u=>u))})}Bo(e,t){let n,s;return ge(e)?(n=new re(AA),s=i=>ca(e,i)):(n=new re(uc(e)),s=i=>Xo(e,i)),t.forEach((i,o)=>{s(o)&&(n=n.add(o))}),n}Uo(e,t,n,s){if(ge(e))return function(u){return u.stages.some(c=>c instanceof Ur||c instanceof rd)}(e);if(e.limit===null)return!1;if(n.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}No(e,t,n){return dr()<=J.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",sd(t)),this.Fo.getDocumentsMatchingQuery(e,t,Ze.min(),n)}ko(e,t,n,s){return this.Fo.getDocumentsMatchingQuery(e,n,s).next(i=>(t.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lc="LocalStore",PA=3e8;class bA{constructor(e,t,n,s){this.persistence=e,this.qo=t,this.serializer=s,this.$o=new he(G),this.Ko=new Mt(i=>oa(i),Pc),this.Wo=new Map,this.Qo=e.getRemoteDocumentCache(),this.g_=e.getTargetCache(),this.w_=e.getBundleCache(),this.Go(n)}Go(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Cm(this.Qo,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Qo.setIndexManager(this.indexManager),this.qo.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.$o))}}function Dm(r,e,t,n){return new bA(r,e,t,n)}async function Nm(r,e){const t=W(r);return await t.persistence.runTransaction("Handle user change","readonly",n=>{let s;return t.mutationQueue.getAllMutationBatches(n).next(i=>(s=i,t.Go(e),t.mutationQueue.getAllMutationBatches(n))).next(i=>{const o=[],u=[];let c=Q();for(const h of s){o.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}for(const h of i){u.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}return t.localDocuments.getDocuments(n,c).next(h=>({zo:h,removedBatchIds:o,addedBatchIds:u}))})})}function SA(r,e){const t=W(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const s=e.batch.keys(),i=t.Qo.newChangeBuffer({trackRemovals:!0});return function(u,c,h,f){const p=h.batch,I=p.keys();let b=A.resolve();return I.forEach(C=>{b=b.next(()=>f.getEntry(c,C)).next(L=>{const M=h.docVersions.get(C);N(M!==null,48541),L.version.compareTo(M)<0&&(p.applyToRemoteDocument(L,h),L.isValidDocument()&&(L.setReadTime(h.commitVersion),f.addEntry(L)))})}),b.next(()=>u.mutationQueue.removeMutationBatch(c,p))}(t,n,e,i).next(()=>i.apply(n)).next(()=>t.mutationQueue.performConsistencyCheck(n)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(n,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(u){let c=Q();for(let h=0;h<u.mutationResults.length;++h)u.mutationResults[h].transformResults.length>0&&(c=c.add(u.batch.mutations[h].key));return c}(e))).next(()=>t.localDocuments.getDocuments(n,s))})}function km(r){const e=W(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.g_.getLastRemoteSnapshotVersion(t))}function VA(r,e){const t=W(r),n=e.snapshotVersion;let s=t.$o;return t.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=t.Qo.newChangeBuffer({trackRemovals:!0});s=t.$o;const u=[];e.targetChanges.forEach((f,p)=>{const I=s.get(p);if(!I)return;u.push(t.g_.removeMatchingKeys(i,f.removedDocuments,p).next(()=>t.g_.addMatchingKeys(i,f.addedDocuments,p)));let b=I.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?b=b.withResumeToken(de.EMPTY_BYTE_STRING,q.min()).withLastLimboFreeSnapshotVersion(q.min()):f.resumeToken.approximateByteSize()>0&&(b=b.withResumeToken(f.resumeToken,n)),s=s.insert(p,b),function(L,M,z){return L.resumeToken.approximateByteSize()===0||M.snapshotVersion.toMicroseconds()-L.snapshotVersion.toMicroseconds()>=PA?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0}(I,b,f)&&u.push(t.g_.updateTargetData(i,b))});let c=Ee(),h=Q();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))}),u.push(CA(i,o,e.documentUpdates).next(f=>{c=f.jo,h=f.Ho})),!n.isEqual(q.min())){const f=t.g_.getLastRemoteSnapshotVersion(i).next(p=>t.g_.setTargetsMetadata(i,i.currentSequenceNumber,n));u.push(f)}return A.waitFor(u).next(()=>o.apply(i)).next(()=>t.localDocuments.getLocalViewOfDocuments(i,c,h)).next(()=>c)}).then(i=>(t.$o=s,i))}function CA(r,e,t){let n=Q(),s=Q();return t.forEach(i=>n=n.add(i)),e.getEntries(r,n).next(i=>{let o=Ee();return t.forEach((u,c)=>{const h=i.get(u);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(u)),c.isNoDocument()&&c.version.isEqual(q.min())?(e.removeEntry(u,c.readTime),o=o.insert(u,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),o=o.insert(u,c)):D(Lc,"Ignoring outdated watch update for ",u,". Current version:",h.version," Watch version:",c.version)}),{jo:o,Ho:s}})}function xA(r,e){const t=W(r);return t.persistence.runTransaction("Get next mutation batch","readonly",n=>(e===void 0&&(e=Ln),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e)))}function DA(r,e){const t=W(r);return t.persistence.runTransaction("Allocate target","readwrite",n=>{let s;return t.g_.getTargetData(n,e).next(i=>i?(s=i,A.resolve(s)):t.g_.allocateTargetId(n).next(o=>(s=new _t(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.g_.addTargetData(n,s).next(()=>s))))}).then(n=>{const s=t.$o.get(n.targetId);return(s===null||n.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.$o=t.$o.insert(n.targetId,n),t.Ko.set(e,n.targetId)),n})}async function Pu(r,e,t){const n=W(r),s=n.$o.get(e),i=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",i,o=>n.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!yn(o))throw o;D(Lc,`Failed to update sequence numbers for target ${e}: ${o}`)}n.$o=n.$o.remove(e),n.Ko.delete(s.target)}function vd(r,e,t){const n=W(r);let s=q.min(),i=Q();return n.persistence.runTransaction("Execute query","readwrite",o=>function(c,h,f){const p=W(c),I=p.Ko.get(f);return I!==void 0?A.resolve(p.$o.get(I)):p.g_.getTargetData(h,f)}(n,o,ge(e)?e:it(e)).next(u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,n.g_.getMatchingKeysForTargetId(o,u.targetId).next(c=>{i=c})}).next(()=>n.qo.getDocumentsMatchingQuery(o,e,t?s:q.min(),t?i:Q())).next(u=>(NA(n,u),{documents:u,Jo:i})))}function NA(r,e){e.forEach((t,n)=>{const s=n.key.getCollectionGroup(),i=r.Wo.get(s)||q.min();n.readTime.compareTo(i)>0&&r.Wo.set(s,n.readTime)})}class Ad{constructor(){this.activeTargetIds=OT()}na(e){this.activeTargetIds=this.activeTargetIds.add(e)}ra(e){this.activeTargetIds=this.activeTargetIds.delete(e)}ta(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Om{constructor(){this.Ua=new Ad,this.ka={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Ua.na(e),this.ka[e]||"not-current"}updateQueryState(e,t,n){this.ka[e]=t}removeLocalQueryTarget(e){this.Ua.ra(e)}isLocalQueryTarget(e){return this.Ua.activeTargetIds.has(e)}clearQueryState(e){delete this.ka[e]}getAllActiveQueryTargets(){return this.Ua.activeTargetIds}isActiveQueryTarget(e){return this.Ua.activeTargetIds.has(e)}start(){return this.Ua=new Ad,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kA(){return typeof window<"u"?window:null}function co(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OA{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.qa=0,this.$a=null,this.Ka=!0}Wa(){this.qa===0&&(this.Qa("Unknown"),this.$a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.$a=null,this.Ga("Backend didn't respond within 10 seconds."),this.Qa("Offline"),Promise.resolve())))}za(e){this.state==="Online"?this.Qa("Unknown"):(this.qa++,this.qa>=1&&(this.ja(),this.Ga(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.Qa("Offline")))}set(e){this.ja(),this.qa=0,e==="Online"&&(this.Ka=!1),this.Qa(e)}Qa(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}Ga(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Ka?(Fe(t),this.Ka=!1):D("OnlineStateTracker",t)}ja(){this.$a!==null&&(this.$a.cancel(),this.$a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vt="RemoteStore";class LA{constructor(e,t,n,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ha=[],this.Ja=new Map,this.Ya=new Map,this.Za=new Map,this.Xa=new kt(1e3),this.eu=new kt(1001),this.tu=new Set,this.nu=[],this.ru=i,this.ru.bt(o=>{n.enqueueAndForget(async()=>{tr(this)&&(D(vt,"Restarting streams for network reachability change."),await async function(c){const h=W(c);h.tu.add(4),await wi(h),h.iu.set("Unknown"),h.tu.delete(4),await ha(h)}(this))})}),this.iu=new OA(n,s)}}async function ha(r){if(tr(r))for(const e of r.nu)await e(!0)}async function wi(r){for(const e of r.nu)await e(!1)}function bu(r,e){return r.Ya.get(e)||void 0}function Lm(r,e){const t=W(r),n=bu(t,e.targetId);if(n!==void 0&&t.Ja.has(n))return;const s=function(u,c){const h=bu(u,c);h!==void 0&&u.Za.delete(h);const f=function(I,b){return b%2!=0?I.eu.next():I.Xa.next()}(u,c);return u.Ya.set(c,f),u.Za.set(f,c),f}(t,e.targetId);D(vt,"remoteStoreListen mapping SDK target ID to remote",e.targetId,s);const i=new _t(e.target,s,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t.Ja.set(s,i),Bc(t)?Fc(t):Hr(t).Fn()&&Uc(t,i)}function Mc(r,e){const t=W(r),n=Hr(t),s=bu(t,e);D(vt,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,s),t.Ja.delete(s),t.Ya.delete(e),t.Za.delete(s),n.Fn()&&Mm(t,s),t.Ja.size===0&&(n.Fn()?n.Nn():tr(t)&&t.iu.set("Unknown"))}function Uc(r,e){if(r.su.We(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(q.min())>0){const t=r.Za.get(e.targetId);if(t===void 0)return void D(vt,"SDK target ID not found for remote ID: "+e.targetId);const n=r.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(n)}Hr(r).jn(e)}function Mm(r,e){r.su.We(e),Hr(r).Hn(e)}function Fc(r){r.su=new UT({getRemoteKeysForTarget:e=>{const t=r.Za.get(e);return t!==void 0?r.remoteSyncer.getRemoteKeysForTarget(t):Q()},dt:e=>r.Ja.get(e)||null,Tt:()=>r.datastore.serializer.databaseId}),Hr(r).start(),r.iu.Wa()}function Bc(r){return tr(r)&&!Hr(r).Cn()&&r.Ja.size>0}function tr(r){return W(r).tu.size===0}function Um(r){r.su=void 0}async function MA(r){r.iu.set("Online")}async function UA(r){r.Ja.forEach((e,t)=>{Uc(r,e)})}async function FA(r,e){Um(r),Bc(r)?(r.iu.za(e),Fc(r)):r.iu.set("Unknown")}async function BA(r,e,t){if(r.iu.set("Online"),e instanceof Dp&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const u of i.targetIds){if(s.Ja.has(u)){const c=s.Za.get(u);c!==void 0&&(await s.remoteSyncer.rejectListen(c,o),s.Ya.delete(c),s.Za.delete(u)),s.Ja.delete(u)}s.su.removeTarget(u)}}(r,e)}catch(n){D(vt,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Oo(r,n)}else if(e instanceof oo?r.su.et(e):e instanceof xp?r.su.ot(e):r.su.rt(e),!t.isEqual(q.min()))try{const n=await km(r.localStore);t.compareTo(n)>=0&&await function(i,o){const u=i.su.Rt(o);u.targetChanges.forEach((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const p=i.Ja.get(f);p&&i.Ja.set(f,p.withResumeToken(h.resumeToken,o))}}),u.targetMismatches.forEach((h,f)=>{const p=i.Ja.get(h);if(!p)return;i.Ja.set(h,p.withResumeToken(de.EMPTY_BYTE_STRING,p.snapshotVersion)),Mm(i,h);const I=new _t(p.target,h,f,p.sequenceNumber);Uc(i,I)});const c=function(f,p){const I=new Map;p.targetChanges.forEach((C,L)=>{const M=f.Za.get(L);M!==void 0&&I.set(M,C)});let b=new he(G);return p.targetMismatches.forEach((C,L)=>{const M=f.Za.get(C);M!==void 0&&(b=b.insert(M,L))}),new mi(p.snapshotVersion,I,b,p.documentUpdates,p.augmentedDocumentUpdates,p.resolvedLimboDocuments)}(i,u);return i.remoteSyncer.applyRemoteEvent(c)}(r,t)}catch(n){D(vt,"Failed to raise snapshot:",n),await Oo(r,n)}}async function Oo(r,e,t){if(!yn(e))throw e;r.tu.add(1),await wi(r),r.iu.set("Offline"),t||(t=()=>km(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{D(vt,"Retrying IndexedDB access"),await t(),r.tu.delete(1),await ha(r)})}function Fm(r,e){return e().catch(t=>Oo(r,t,e))}async function vi(r){const e=W(r),t=pn(e);let n=e.Ha.length>0?e.Ha[e.Ha.length-1].batchId:Ln;for(;qA(e);)try{const s=await xA(e.localStore,n);if(s===null){e.Ha.length===0&&t.Nn();break}n=s.batchId,$A(e,s)}catch(s){await Oo(e,s)}Bm(e)&&qm(e)}function qA(r){return tr(r)&&r.Ha.length<10}function $A(r,e){r.Ha.push(e);const t=pn(r);t.Fn()&&t.Jn&&t.Yn(e.mutations)}function Bm(r){return tr(r)&&!pn(r).Cn()&&r.Ha.length>0}function qm(r){pn(r).start()}async function jA(r){pn(r).er()}async function zA(r){const e=pn(r);for(const t of r.Ha)e.Yn(t.mutations)}async function KA(r,e,t){const n=r.Ha.shift(),s=Sc.from(n,e,t);await Fm(r,()=>r.remoteSyncer.applySuccessfulWrite(s)),await vi(r)}async function GA(r,e){e&&pn(r).Jn&&await async function(n,s){if(function(o){return CT(o)&&o!==x.ABORTED}(s.code)){const i=n.Ha.shift();pn(n).Mn(),await Fm(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,s)),await vi(n)}}(r,e),Bm(r)&&qm(r)}async function Rd(r,e){const t=W(r);t.asyncQueue.verifyOperationInProgress(),D(vt,"RemoteStore received new credentials");const n=tr(t);t.tu.add(3),await wi(t),n&&t.iu.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.tu.delete(3),await ha(t)}async function HA(r,e){const t=W(r);e?(t.tu.delete(2),await ha(t)):e||(t.tu.add(2),await wi(t),t.iu.set("Unknown"))}function Hr(r){return r._u||(r._u=function(t,n,s){const i=W(t);return i.nr(),new rw(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Qt:MA.bind(null,r),zt:UA.bind(null,r),Ht:FA.bind(null,r),zn:BA.bind(null,r)}),r.nu.push(async e=>{e?(r._u.Mn(),Bc(r)?Fc(r):r.iu.set("Unknown")):(await r._u.stop(),Um(r))})),r._u}function pn(r){return r.ou||(r.ou=function(t,n,s){const i=W(t);return i.nr(),new sw(n,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(r.datastore,r.asyncQueue,{Qt:()=>Promise.resolve(),zt:jA.bind(null,r),Ht:GA.bind(null,r),Zn:zA.bind(null,r),Xn:KA.bind(null,r)}),r.nu.push(async e=>{e?(r.ou.Mn(),await vi(r)):(await r.ou.stop(),r.Ha.length>0&&(D(vt,`Stopping write stream with ${r.Ha.length} pending writes`),r.Ha=[]))})),r.ou}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{constructor(e,t,n,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Pt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,s,i){const o=Date.now()+n,u=new qc(e,t,o,s,i);return u.start(n),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new F(x.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function $c(r,e){if(Fe("AsyncQueue",`${e}: ${r}`),yn(r))return new F(x.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{static emptySet(e){return new Bn(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||U.comparator(t.key,n.key):(t,n)=>U.comparator(t.key,n.key),this.keyedMap=fr(),this.sortedSet=new he(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Bn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=n.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new Bn;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pd{constructor(){this.au=new he(U.comparator)}track(e){const t=e.doc.key,n=this.au.get(t);n?e.type!==0&&n.type===3?this.au=this.au.insert(t,e):e.type===3&&n.type!==1?this.au=this.au.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.au=this.au.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.au=this.au.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.au=this.au.remove(t):e.type===1&&n.type===2?this.au=this.au.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.au=this.au.insert(t,{type:2,doc:e.doc}):B(63341,{ft:e,uu:n}):this.au=this.au.insert(t,e)}cu(){const e=[];return this.au.inorderTraversal((t,n)=>{e.push(n)}),e}}class Fr{constructor(e,t,n,s,i,o,u,c,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=u,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,s,i){const o=[];return t.forEach(u=>{o.push({type:0,doc:u})}),new Fr(e,t,Bn.emptySet(t),o,n,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ia(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==n[s].type||!t[s].doc.isEqual(n[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WA{constructor(){this.lu=void 0,this.Eu=[]}hu(){return this.Eu.some(e=>e.Tu())}}class QA{constructor(){this.queries=bd(),this.onlineState="Unknown",this.Pu=new Set}terminate(){(function(t,n){const s=W(t),i=s.queries;s.queries=bd(),i.forEach((o,u)=>{for(const c of u.Eu)c.onError(n)})})(this,new F(x.ABORTED,"Firestore shutting down"))}}function bd(){return new Mt(r=>_m(r),ia)}async function YA(r,e){const t=W(r);let n=3;const s=e.query;let i=t.queries.get(s);i?!i.hu()&&e.Tu()&&(n=2):(i=new WA,n=e.Tu()?0:1);try{switch(n){case 0:i.lu=await t.onListen(s,!0);break;case 1:i.lu=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const u=$c(o,`Initialization of query '${ge(e.query)?bt(e.query):xs(e.query)}' failed`);return void e.onError(u)}t.queries.set(s,i),i.Eu.push(e),e.Ru(t.onlineState),i.lu&&e.Iu(i.lu)&&jc(t)}async function JA(r,e){const t=W(r),n=e.query;let s=3;const i=t.queries.get(n);if(i){const o=i.Eu.indexOf(e);o>=0&&(i.Eu.splice(o,1),i.Eu.length===0?s=e.Tu()?0:1:!i.hu()&&e.Tu()&&(s=2))}switch(s){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function XA(r,e){const t=W(r);let n=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const u of o.Eu)u.Iu(s)&&(n=!0);o.lu=s}}n&&jc(t)}function ZA(r,e,t){const n=W(r),s=n.queries.get(e);if(s)for(const i of s.Eu)i.onError(t);n.queries.delete(e)}function jc(r){r.Pu.forEach(e=>{e.next()})}var Su;(function(r){r.Default="default",r.Cache="cache"})(Su||(Su={}));class eR{constructor(e,t,n){this.query=e,this.Au=t,this.Vu=!1,this.du=null,this.onlineState="Unknown",this.options=n||{}}Iu(e){if(!this.options.includeMetadataChanges){const n=[];for(const s of e.docChanges)s.type!==3&&n.push(s);e=new Fr(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Vu?this.fu(e)&&(this.Au.next(e),t=!0):this.mu(e,this.onlineState)&&(this.pu(e),t=!0),this.du=e,t}onError(e){this.Au.error(e)}Ru(e){this.onlineState=e;let t=!1;return this.du&&!this.Vu&&this.mu(this.du,e)&&(this.pu(this.du),t=!0),t}mu(e,t){if(!e.fromCache||!this.Tu())return!0;const n=t!=="Offline";return(!this.options.waitForSyncWhenOnline||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}fu(e){if(e.docChanges.length>0)return!0;const t=this.du&&this.du.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}pu(e){e=Fr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Vu=!0,this.Au.next(e)}Tu(){return this.options.source!==Su.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $m{constructor(e){this.key=e}}class jm{constructor(e){this.key=e}}class tR{constructor(e,t){this.query=e,this.Ou=t,this.Mu=null,this.hasCachedResults=!1,this.current=!1,this.Nu=Q(),this.mutatedKeys=Q(),this.Lu=ge(e)?Ru(e):uc(e),this.Bu=new Bn(this.Lu)}get Uu(){return this.Ou}ku(e,t){const n=t?t.qu:new Pd,s=t?t.Bu:this.Bu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,u=!1;const[c,h]=this.$u(this.query,s);e.inorderTraversal((p,I)=>{const b=s.get(p),C=bm(this.query,I)?I:null,L=!!b&&this.mutatedKeys.has(b.key),M=!!C&&(C.hasLocalMutations||this.mutatedKeys.has(C.key)&&C.hasCommittedMutations);let z=!1;b&&C?b.data.isEqual(C.data)?L!==M&&(n.track({type:3,doc:C}),z=!0):this.Ku(b,C)||(n.track({type:2,doc:C}),z=!0,(c&&this.Lu(C,c)>0||h&&this.Lu(C,h)<0)&&(u=!0)):!b&&C?(n.track({type:0,doc:C}),z=!0):b&&!C&&(n.track({type:1,doc:b}),z=!0,(c||h)&&(u=!0)),z&&(C?(o=o.add(C),i=M?i.add(p):i.delete(p)):(o=o.delete(p),i=i.delete(p)))});const f=this.Wu(this.query);if(f)if(ge(this.query)){const p=[];o.forEach(C=>p.push(C));const I=Pm(this.query,p);let b=new Bn(Ru(this.query));for(const C of I)b=b.add(C);o.forEach(C=>{b.has(C.key)||(i=i.delete(C.key),n.track({type:1,doc:C}))}),o=b}else{const p=this.Qu(this.query);for(;o.size>f;){const I=p==="F"?o.last():o.first();o=o.delete(I.key),i=i.delete(I.key),n.track({type:1,doc:I})}}return{Bu:o,qu:n,Uo:u,mutatedKeys:i}}Wu(e){var t;return ge(e)?(t=za(e))==null?void 0:t.limit:e.limit||void 0}Qu(e){if(ge(e)){const t=za(e);return t&&t.limit<0?"L":"F"}return e.limitType}$u(e,t){var n;if(ge(e)){const s=(n=za(e))==null?void 0:n.limit;return[t.size===s?t.last():null,null]}return[e.limitType==="F"&&t.size===this.Wu(this.query)?t.last():null,e.limitType==="L"&&t.size===this.Wu(this.query)?t.first():null]}Ku(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,s){const i=this.Bu;this.Bu=e.Bu,this.mutatedKeys=e.mutatedKeys;const o=e.qu.cu();o.sort((f,p)=>function(b,C){const L=M=>{switch(M){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return B(20277,{ft:M})}};return L(b)-L(C)}(f.type,p.type)||this.Lu(f.doc,p.doc)),this.Gu(n),s=s??!1;const u=t&&!s?this.zu():[],c=this.Nu.size===0&&this.current&&!s?1:0,h=c!==this.Mu;return this.Mu=c,o.length!==0||h?{snapshot:new Fr(this.query,e.Bu,i,o,e.mutatedKeys,c===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),ju:u}:{ju:u}}Ru(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Bu:this.Bu,qu:new Pd,mutatedKeys:this.mutatedKeys,Uo:!1},!1)):{ju:[]}}Hu(e){return!this.Ou.has(e)&&!!this.Bu.has(e)&&!this.Bu.get(e).hasLocalMutations}Gu(e){e&&(e.addedDocuments.forEach(t=>this.Ou=this.Ou.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ou=this.Ou.delete(t)),this.current=e.current)}zu(){if(!this.current)return[];const e=this.Nu;this.Nu=Q(),this.Bu.forEach(n=>{this.Hu(n.key)&&(this.Nu=this.Nu.add(n.key))});const t=[];return e.forEach(n=>{this.Nu.has(n)||t.push(new jm(n))}),this.Nu.forEach(n=>{e.has(n)||t.push(new $m(n))}),t}Ju(e){this.Ou=e.Jo,this.Nu=Q();const t=this.ku(e.documents);return this.applyChanges(t,!0)}Yu(){return Fr.fromInitialDocuments(this.query,this.Bu,this.mutatedKeys,this.Mu===0,this.hasCachedResults)}}const zc="SyncEngine";class nR{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class rR{constructor(e){this.key=e,this.Zu=!1}}class sR{constructor(e,t,n,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Xu={},this.ec=new Mt(u=>_m(u),ia),this.tc=new Map,this.nc=new Set,this.rc=new he(U.comparator),this.sc=new Map,this._c=new Dc,this.oc={},this.ac=new Map,this.uc=kt.Cs(),this.onlineState="Unknown",this.cc=void 0}get isPrimaryClient(){return this.cc===!0}}async function iR(r,e,t=!0){const n=Qm(r);let s;const i=n.ec.get(e);return i?(n.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Yu()):s=await zm(n,e,t,!0),s}async function oR(r,e){const t=Qm(r);await zm(t,e,!0,!1)}async function zm(r,e,t,n){const s=await DA(r.localStore,ge(e)?e:it(e)),i=s.targetId,o=r.sharedClientState.addLocalQueryTarget(i,t);let u;return n&&(u=await aR(r,e,i,o==="current",s.resumeToken)),r.isPrimaryClient&&t&&Lm(r.remoteStore,s),u}async function aR(r,e,t,n,s){r.lc=(p,I,b)=>async function(L,M,z,K){let H=M.view.ku(z);H.Uo&&(H=await vd(L.localStore,M.query,!1).then(({documents:T})=>M.view.ku(T,H)));const ue=K&&K.targetChanges.get(M.targetId),te=K&&K.targetMismatches.get(M.targetId)!=null,ne=M.view.applyChanges(H,L.isPrimaryClient,ue,te);return Vd(L,M.targetId,ne.ju),ne.snapshot}(r,p,I,b);const i=await vd(r.localStore,e,!0),o=new tR(e,i.Jo),u=o.ku(i.documents),c=gi.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",s),h=o.applyChanges(u,r.isPrimaryClient,c);Vd(r,t,h.ju);const f=new nR(e,t,o);return r.ec.set(e,f),r.tc.has(t)?r.tc.get(t).push(e):r.tc.set(t,[e]),h.snapshot}async function uR(r,e,t){const n=W(r),s=n.ec.get(e),i=n.tc.get(s.targetId);if(i.length>1)return n.tc.set(s.targetId,i.filter(o=>!ia(o,e))),void n.ec.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(s.targetId),n.sharedClientState.isActiveQueryTarget(s.targetId)||await Pu(n.localStore,s.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(s.targetId),t&&Mc(n.remoteStore,s.targetId),Vu(n,s.targetId)}).catch(Jn)):(Vu(n,s.targetId),await Pu(n.localStore,s.targetId,!0))}async function cR(r,e){const t=W(r),n=t.ec.get(e),s=t.tc.get(n.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),Mc(t.remoteStore,n.targetId))}async function lR(r,e,t){const n=Ym(r);try{const s=await function(o,u){const c=W(o),h=se.now(),f=u.reduce((b,C)=>b.add(C.key),Q());let p,I;return c.persistence.runTransaction("Locally write mutations","readwrite",b=>{let C=Ee(),L=Q();return c.Qo.getEntries(b,f).next(M=>{C=M,C.forEach((z,K)=>{K.isValidDocument()||(L=L.add(z))})}).next(()=>c.localDocuments.getOverlayedDocuments(b,C)).next(M=>{p=M;const z=[];for(const K of u){const H=pT(K,p.get(K.key).overlayedDocument);H!=null&&z.push(new In(K.key,H,dp(H.value.mapValue),Je.exists(!0)))}return c.mutationQueue.addMutationBatch(b,h,z,u)}).next(M=>{I=M;const z=M.applyToLocalDocumentSet(p,L);return c.documentOverlayCache.saveOverlays(b,M.batchId,z)})}).then(()=>({batchId:I.batchId,changes:Vp(p)}))}(n.localStore,e);n.sharedClientState.addPendingMutation(s.batchId),function(o,u,c){let h=o.oc[o.currentUser.toKey()];h||(h=new he(G)),h=h.insert(u,c),o.oc[o.currentUser.toKey()]=h}(n,s.batchId,t),await Ai(n,s.changes),await vi(n.remoteStore)}catch(s){const i=$c(s,"Failed to persist write");t.reject(i)}}async function Km(r,e){const t=W(r);try{const n=await VA(t.localStore,e);e.targetChanges.forEach((s,i)=>{const o=t.sc.get(i);o&&(N(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.Zu=!0:s.modifiedDocuments.size>0?N(o.Zu,14607):s.removedDocuments.size>0&&(N(o.Zu,42227),o.Zu=!1))}),await Ai(t,n,e)}catch(n){await Jn(n)}}function Sd(r,e,t){const n=W(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const s=[];n.ec.forEach((i,o)=>{const u=o.view.Ru(e);u.snapshot&&s.push(u.snapshot)}),function(o,u){const c=W(o);c.onlineState=u;let h=!1;c.queries.forEach((f,p)=>{for(const I of p.Eu)I.Ru(u)&&(h=!0)}),h&&jc(c)}(n.eventManager,e),s.length&&n.Xu.zn(s),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function hR(r,e,t){const n=W(r);n.sharedClientState.updateQueryState(e,"rejected",t);const s=n.sc.get(e),i=s&&s.key;if(i){let o=new he(U.comparator);o=o.insert(i,pe.newNoDocument(i,q.min()));const u=Q().add(i),c=new mi(q.min(),new Map,new he(G),o,Ee(),u);await Km(n,c),n.rc=n.rc.remove(i),n.sc.delete(e),Kc(n)}else await Pu(n.localStore,e,!1).then(()=>Vu(n,e,t)).catch(Jn)}async function dR(r,e){const t=W(r),n=e.batch.batchId;try{const s=await SA(t.localStore,e);Hm(t,n,null),Gm(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await Ai(t,s)}catch(s){await Jn(s)}}async function fR(r,e,t){const n=W(r);try{const s=await function(o,u){const c=W(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return c.mutationQueue.lookupMutationBatch(h,u).next(p=>(N(p!==null,37113),f=p.keys(),c.mutationQueue.removeMutationBatch(h,p))).next(()=>c.mutationQueue.performConsistencyCheck(h)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(h,f,u)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>c.localDocuments.getDocuments(h,f))})}(n.localStore,e);Hm(n,e,t),Gm(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await Ai(n,s)}catch(s){await Jn(s)}}function Gm(r,e){(r.ac.get(e)||[]).forEach(t=>{t.resolve()}),r.ac.delete(e)}function Hm(r,e,t){const n=W(r);let s=n.oc[n.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),n.oc[n.currentUser.toKey()]=s}}function Vu(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.tc.get(e))r.ec.delete(n),t&&r.Xu.Ec(n,t);r.tc.delete(e),r.isPrimaryClient&&r._c.s_(e).forEach(n=>{r._c.containsKey(n)||Wm(r,n)})}function Wm(r,e){r.nc.delete(e.path.canonicalString());const t=r.rc.get(e);t!==null&&(Mc(r.remoteStore,t),r.rc=r.rc.remove(e),r.sc.delete(t),Kc(r))}function Vd(r,e,t){for(const n of t)n instanceof $m?(r._c.addReference(n.key,e),pR(r,n)):n instanceof jm?(D(zc,"Document no longer in limbo: "+n.key),r._c.removeReference(n.key,e),r._c.containsKey(n.key)||Wm(r,n.key)):B(19791,{hc:n})}function pR(r,e){const t=e.key,n=t.path.canonicalString();r.rc.get(t)||r.nc.has(n)||(D(zc,"New document in limbo: "+t),r.nc.add(n),Kc(r))}function Kc(r){for(;r.nc.size>0&&r.rc.size<r.maxConcurrentLimboResolutions;){const e=r.nc.values().next().value;r.nc.delete(e);const t=new U(ee.fromString(e)),n=r.uc.next();r.sc.set(n,new rR(t)),r.rc=r.rc.insert(t,n),Lm(r.remoteStore,new _t(it(Jo(t.path)),n,"TargetPurposeLimboResolution",rt.ce))}}async function Ai(r,e,t){const n=W(r),s=[],i=[],o=[];n.ec.isEmpty()||(n.ec.forEach((u,c)=>{o.push(n.lc(c,e,t).then(h=>{var f;if((h||t)&&n.isPrimaryClient){const p=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(c.targetId))==null?void 0:f.current;n.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(h){s.push(h);const p=Oc.vo(c.targetId,h);i.push(p)}}))}),await Promise.all(o),n.Xu.zn(s),await async function(c,h){const f=W(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>A.forEach(h,I=>A.forEach(I.wo,b=>f.persistence.referenceDelegate.addReference(p,I.targetId,b)).next(()=>A.forEach(I.bo,b=>f.persistence.referenceDelegate.removeReference(p,I.targetId,b)))))}catch(p){if(!yn(p))throw p;D(Lc,"Failed to update sequence numbers: "+p)}for(const p of h){const I=p.targetId;if(!p.fromCache){const b=f.$o.get(I),C=b.snapshotVersion,L=b.withLastLimboFreeSnapshotVersion(C);f.$o=f.$o.insert(I,L)}}}(n.localStore,i))}async function mR(r,e){const t=W(r);if(!t.currentUser.isEqual(e)){D(zc,"User change. New user:",e.toKey());const n=await Nm(t.localStore,e);t.currentUser=e,function(i,o){i.ac.forEach(u=>{u.forEach(c=>{c.reject(new F(x.CANCELLED,o))})}),i.ac.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await Ai(t,n.zo)}}function gR(r,e){const t=W(r),n=t.sc.get(e);if(n&&n.Zu)return Q().add(n.key);{let s=Q();const i=t.tc.get(e);if(!i)return s;for(const o of i??[]){const u=t.ec.get(o);s=s.unionWith(u.view.Uu)}return s}}function Qm(r){const e=W(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Km.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=gR.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=hR.bind(null,e),e.Xu.zn=XA.bind(null,e.eventManager),e.Xu.Ec=ZA.bind(null,e.eventManager),e}function Ym(r){const e=W(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=dR.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=fR.bind(null,e),e}class ri{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Zo(e.databaseInfo.databaseId),this.sharedClientState=this.Rc(e),this.persistence=this.Ic(e),await this.persistence.start(),this.localStore=this.Ac(e),this.gcScheduler=this.Vc(e,this.localStore),this.indexBackfillerScheduler=this.dc(e,this.localStore)}Vc(e,t){return null}dc(e,t){return null}Ac(e){return Dm(this.persistence,new xm,e.initialUser,this.serializer)}Ic(e){return new Nc(la.C_,this.serializer)}Rc(e){return new Om}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ri.provider={build:()=>new ri};class _R extends ri{constructor(e){super(),this.cacheSizeBytes=e}Vc(e,t){N(this.persistence.referenceDelegate instanceof ko,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Xp(n,e.asyncQueue,t)}Ic(e){const t=this.cacheSizeBytes!==void 0?De.withCacheSize(this.cacheSizeBytes):De.DEFAULT;return new Nc(n=>ko.C_(n,t),this.serializer)}}class yR extends ri{constructor(e,t,n){super(),this.fc=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.fc.initialize(this,e),await Ym(this.fc.syncEngine),await vi(this.fc.remoteStore),await this.persistence._o(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}Ac(e){return Dm(this.persistence,new xm,e.initialUser,this.serializer)}Vc(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new Xp(n,e.asyncQueue,t)}dc(e,t){const n=new bE(t,this.persistence);return new PE(e.asyncQueue,n)}Ic(e){const t=vA(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?De.withCacheSize(this.cacheSizeBytes):De.DEFAULT;return new kc(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,kA(),co(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Rc(e){return new Om}}class Lo{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Sd(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=mR.bind(null,this.syncEngine),await HA(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new QA}()}createDatastore(e){const t=Zo(e.databaseInfo.databaseId),n=nw(e.databaseInfo);return aw(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(n,s,i,o,u){return new LA(n,s,i,o,u)}(this.localStore,this.datastore,e.asyncQueue,t=>Sd(this.syncEngine,t,0),function(){return Qh.C()?new Qh:new XT}())}createSyncEngine(e,t){return function(s,i,o,u,c,h,f){const p=new sR(s,i,o,u,c,h);return f&&(p.cc=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const i=W(s);D(vt,"RemoteStore shutting down."),i.tu.add(5),await wi(i),i.ru.shutdown(),i.iu.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Lo.provider={build:()=>new Lo};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IR{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.mc(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.mc(this.observer.error,e):Fe("Uncaught Error in snapshot listener:",e.toString()))}gc(){this.muted=!0}mc(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mn="FirestoreClient";class ER{constructor(e,t,n,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this._databaseInfo=s,this.user=be.UNAUTHENTICATED,this.clientId=zu.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(n,async o=>{D(mn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(n,o=>(D(mn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Pt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=$c(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Wa(r,e){r.asyncQueue.verifyOperationInProgress(),D(mn,"Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener(async s=>{n.isEqual(s)||(await Nm(e.localStore,s),n=s)}),e.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=e}async function Cd(r,e){r.asyncQueue.verifyOperationInProgress();const t=await TR(r);D(mn,"Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener(n=>Rd(e.remoteStore,n)),r.setAppCheckTokenChangeListener((n,s)=>Rd(e.remoteStore,s)),r._onlineComponents=e}async function TR(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){D(mn,"Using user provided OfflineComponentProvider");try{await Wa(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===x.FAILED_PRECONDITION||s.code===x.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;at("Error using user provided cache. Falling back to memory cache: "+t),await Wa(r,new ri)}}else D(mn,"Using default OfflineComponentProvider"),await Wa(r,new _R(void 0));return r._offlineComponents}async function Jm(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(D(mn,"Using user provided OnlineComponentProvider"),await Cd(r,r._uninitializedComponentsProvider._online)):(D(mn,"Using default OnlineComponentProvider"),await Cd(r,new Lo))),r._onlineComponents}function wR(r){return Jm(r).then(e=>e.syncEngine)}async function vR(r){const e=await Jm(r),t=e.eventManager;return t.onListen=iR.bind(null,e.syncEngine),t.onUnlisten=uR.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=oR.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=cR.bind(null,e.syncEngine),t}function AR(r,e,t={}){const n=new Pt;return r.asyncQueue.enqueueAndForget(async()=>function(i,o,u,c,h){const f=new IR({next:I=>{f.gc(),o.enqueueAndForget(()=>JA(i,p));const b=I.docs.has(u);!b&&I.fromCache?h.reject(new F(x.UNAVAILABLE,"Failed to get document because the client is offline.")):b&&I.fromCache&&c&&c.source==="server"?h.reject(new F(x.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(I)},error:I=>h.reject(I)}),p=new eR(Jo(u.path),f,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return YA(i,p)}(await vR(r),r.asyncQueue,e,t,n)),n.promise}function RR(r,e){const t=new Pt;return r.asyncQueue.enqueueAndForget(async()=>lR(await wR(r),e,t)),t.promise}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xd="AsyncQueue";class Dd{constructor(e=Promise.resolve()){this.qc=[],this.$c=!1,this.Kc=[],this.Wc=null,this.Qc=!1,this.Gc=!1,this.zc=[],this.xn=new Qp(this,"async_queue_retry"),this.jc=()=>{const n=co();n&&D(xd,"Visibility state changed to "+n.visibilityState),this.xn.gn()},this.Hc=e;const t=co();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.jc)}get isShuttingDown(){return this.$c}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Jc(),this.Yc(e)}enterRestrictedMode(e){if(!this.$c){this.$c=!0,this.Gc=e||!1;const t=co();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.jc)}}enqueue(e){if(this.Jc(),this.$c)return new Promise(()=>{});const t=new Pt;return this.Yc(()=>this.$c&&this.Gc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.qc.push(e),this.Zc()))}async Zc(){if(this.qc.length!==0){try{await this.qc[0](),this.qc.shift(),this.xn.reset()}catch(e){if(!yn(e))throw e;D(xd,"Operation failed with retryable error: "+e)}this.qc.length>0&&this.xn.mn(()=>this.Zc())}}Yc(e){const t=this.Hc.then(()=>(this.Qc=!0,e().catch(n=>{throw this.Wc=n,this.Qc=!1,Fe("INTERNAL UNHANDLED ERROR: ",Nd(n)),n}).then(n=>(this.Qc=!1,n))));return this.Hc=t,t}enqueueAfterDelay(e,t,n){this.Jc(),this.zc.indexOf(e)>-1&&(t=0);const s=qc.createAndSchedule(this,e,t,n,i=>this.Xc(i));return this.Kc.push(s),s}Jc(){this.Wc&&B(47125,{el:Nd(this.Wc)})}verifyOperationInProgress(){}async tl(){let e;do e=this.Hc,await e;while(e!==this.Hc)}nl(e){for(const t of this.Kc)if(t.timerId===e)return!0;return!1}rl(e){return this.tl().then(()=>{this.Kc.sort((t,n)=>t.targetTimeMs-n.targetTimeMs);for(const t of this.Kc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.tl()})}il(e){this.zc.push(e)}Xc(e){const t=this.Kc.indexOf(e);this.Kc.splice(t,1)}}function Nd(r){let e=r.message||"";return r.stack&&(e=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),e}class da extends fc{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new Dd,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Dd(e),this._firestoreClient=void 0,await e}}}function KR(r,e){const t=typeof r=="object"?r:Qd(),n=typeof r=="string"?r:e,s=Du(t,"firestore").getImmediate({identifier:n});if(!s._initialized){const i=qg("firestore");i&&fw(s,...i)}return s}function Xm(r){if(r._terminated)throw new F(x.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Zm(r),r._firestoreClient}function Zm(r){var n,s,i,o;const e=r._freezeSettings(),t=cw(r._databaseId,((n=r._app)==null?void 0:n.options.appId)||"",r._persistenceKey,(s=r._app)==null?void 0:s.options.apiKey,e);r._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(r._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),r._firestoreClient=new ER(r._authCredentials,r._appCheckCredentials,r._queue,t,r._componentsProvider&&function(c){const h=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(h),_online:h}}(r._componentsProvider))}function GR(r,e){at("enableIndexedDbPersistence() will be deprecated in the future, you can use `FirestoreSettings.cache` instead.");const t=r._freezeSettings();return PR(r,Lo.provider,{build:n=>new yR(n,t.cacheSizeBytes,e==null?void 0:e.forceOwnership)}),Promise.resolve()}function PR(r,e,t){if((r=Ar(r,da))._firestoreClient||r._terminated)throw new F(x.FAILED_PRECONDITION,"Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");if(r._componentsProvider||r._getSettings().localCache)throw new F(x.FAILED_PRECONDITION,"SDK cache is already specified.");r._componentsProvider={_online:e,_offline:t},Zm(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bR{convertValue(e,t="none"){switch(ye(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ae(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Dt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw B(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return Xn(e,(s,i)=>{n[s]=this.convertValue(i,t)}),n}convertVectorValue(e){var n,s,i;const t=(i=(s=(n=e.fields)==null?void 0:n[Hn].arrayValue)==null?void 0:s.values)==null?void 0:i.map(o=>ae(o.doubleValue));return new ze(t)}convertGeoPoint(e){return new Tt(ae(e.latitude),ae(e.longitude))}convertArray(e,t){return(e.values||[]).map(n=>this.convertValue(n,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=pi(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Cr(e));default:return null}}convertTimestamp(e){const t=xt(e);return new se(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=ee.fromString(e);N(zp(n),9688,{name:e});const s=new Gn(n.get(1),n.get(3)),i=new U(n.popFirst(5));return s.isEqual(t)||Fe(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SR extends bR{constructor(e){super(),this.firestore=e}convertBytes(e){return new nt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Te(this.firestore,null,t)}}const kd="@firebase/firestore",Od="4.16.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eg{constructor(e,t,n,s,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Te(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new VR(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(_i("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class VR extends eg{data(){return super.data()}}function CR(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}class ws{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class qn extends eg{constructor(e,t,n,s,i,o){super(e,t,n,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new lo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(_i("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new F(x.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=qn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}qn._jsonSchemaVersion="firestore/documentSnapshot/1.0",qn._jsonSchema={type:_e("string",qn._jsonSchemaVersion),bundleSource:_e("string","DocumentSnapshot"),bundleName:_e("string"),bundle:_e("string")};class lo extends qn{data(e={}){return super.data(e)}}class ks{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new ws(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new lo(this._firestore,this._userDataWriter,n.key,n,new ws(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new F(x.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(u=>{ge(s._snapshot.query)?Ru(s._snapshot.query):uc(s.query._query);const c=new lo(s._firestore,s._userDataWriter,u.doc.key,u.doc,new ws(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(u=>i||u.type!==3).map(u=>{const c=new lo(s._firestore,s._userDataWriter,u.doc.key,u.doc,new ws(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return u.type!==0&&(h=o.indexOf(u.doc.key),o=o.delete(u.doc.key)),u.type!==1&&(o=o.add(u.doc),f=o.indexOf(u.doc.key)),{type:xR(u.type),doc:c,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new F(x.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=ks._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=zu.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],s=[];return this.docs.forEach(i=>{i._document!==null&&(t.push(i._document),n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function xR(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return B(61501,{type:r})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ks._jsonSchemaVersion="firestore/querySnapshot/1.0",ks._jsonSchema={type:_e("string",ks._jsonSchemaVersion),bundleSource:_e("string","QuerySnapshot"),bundleName:_e("string"),bundle:_e("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HR(r){r=Ar(r,Te);const e=Ar(r.firestore,da),t=Xm(e);return AR(t,r._key).then(n=>NR(e,r,n))}function WR(r,e,t){r=Ar(r,Te);const n=Ar(r.firestore,da),s=CR(r.converter,e,t),i=_w(n);return DR(n,[yw(i,"setDoc",r._key,s,r.converter!==null,t).toMutation(r._key,Je.none())])}function DR(r,e){const t=Xm(r);return RR(t,e)}function NR(r,e,t){const n=t.docs.get(e._key),s=new SR(r);return new qn(r,s,e._key,n,new ws(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){lE(Br),Tr(new jn("firestore",(n,{instanceIdentifier:s,options:i})=>{const o=n.getProvider("app").getImmediate(),u=new da(new fE(n.getProvider("auth-internal")),new gE(o,n.getProvider("app-check-internal")),iT(o,s),o);return i={useFetchStreams:t,...i},u._setSettings(i),u},"PUBLIC").setMultipleInstances(!0)),sn(kd,Od,e),sn(kd,Od,"esm2020")})();export{Jt as G,Qd as a,$R as b,KR as c,zR as d,GR as e,HR as f,OR as g,qR as h,j_ as i,MR as j,UR as k,LR as l,BR as m,FR as o,WR as s};
