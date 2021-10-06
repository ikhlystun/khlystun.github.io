try{self["workbox:core:5.1.4"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.4"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class i extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const a=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),"");class c{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:n,route:i}=this.findMatchingRoute({url:s,request:e,event:t});let a,c=i&&i.handler;if(!c&&this.s&&(c=this.s),c){try{a=c.handle({url:s,request:e,event:t,params:n})}catch(e){a=Promise.reject(e)}return a instanceof Promise&&this.i&&(a=a.catch(n=>this.i.handle({url:s,request:e,event:t}))),a}}findMatchingRoute({url:e,request:t,event:s}){const n=this.t.get(t.method)||[];for(const i of n){let n;const a=i.match({url:e,request:t,event:s});if(a)return n=a,(Array.isArray(a)&&0===a.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(n=void 0),{route:i,params:n}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let r;const o=()=>(r||(r=new c,r.addFetchListener(),r.addCacheListener()),r);const f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},u=e=>[f.prefix,e,f.suffix].filter(e=>e&&e.length>0).join("-"),h=e=>e||u(f.precache),d=e=>e||u(f.runtime);function l(e){e.then(()=>{})}const b=new Set;class p{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this.o=null,this.u=e,this.h=t,this.l=s,this.p=n||(()=>this.close())}get db(){return this.o}async open(){if(!this.o)return this.o=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this.u,this.h);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this.l&&this.l(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this.p.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:i,includeKeys:a=!1}={}){return await this.transaction([e],"readonly",(c,r)=>{const o=c.objectStore(e),f=t?o.index(t):o,u=[],h=f.openCursor(s,n);h.onsuccess=()=>{const e=h.result;e?(u.push(a?e:e.value),i&&u.length>=i?r(u):e.continue()):r(u)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,i)=>{const a=this.o.transaction(e,t);a.onabort=()=>i(a.error),a.oncomplete=()=>n(),s(a,e=>n(e))})}async g(e,t,s,...n){return await this.transaction([t],s,(s,i)=>{const a=s.objectStore(t),c=a[e].apply(a,n);c.onsuccess=()=>i(c.result)})}close(){this.o&&(this.o.close(),this.o=null)}}p.prototype.OPEN_TIMEOUT=2e3;const w={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(w))for(const s of t)s in IDBObjectStore.prototype&&(p.prototype[s]=async function(t,...n){return await this.g(s,t,e,...n)});try{self["workbox:expiration:5.1.4"]&&_()}catch(e){}const g=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class y{constructor(e){this.v=e,this.o=new p("workbox-expiration",1,{onupgradeneeded:e=>this.m(e)})}m(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this.v)}async setTimestamp(e,t){const s={url:e=g(e),timestamp:t,cacheName:this.v,id:this._(e)};await this.o.put("cache-entries",s)}async getTimestamp(e){return(await this.o.get("cache-entries",this._(e))).timestamp}async expireEntries(e,t){const s=await this.o.transaction("cache-entries","readwrite",(s,n)=>{const i=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),a=[];let c=0;i.onsuccess=()=>{const s=i.result;if(s){const n=s.value;n.cacheName===this.v&&(e&&n.timestamp<e||t&&c>=t?a.push(s.value):c++),s.continue()}else n(a)}}),n=[];for(const e of s)await this.o.delete("cache-entries",e.id),n.push(e.url);return n}_(e){return this.v+"|"+g(e)}}class v{constructor(e,t={}){this.q=!1,this.R=!1,this.k=t.maxEntries,this.j=t.maxAgeSeconds,this.v=e,this.U=new y(e)}async expireEntries(){if(this.q)return void(this.R=!0);this.q=!0;const e=this.j?Date.now()-1e3*this.j:0,t=await this.U.expireEntries(e,this.k),s=await self.caches.open(this.v);for(const e of t)await s.delete(e);this.q=!1,this.R&&(this.R=!1,l(this.expireEntries()))}async updateTimestamp(e){await this.U.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.j){return await this.U.getTimestamp(e)<Date.now()-1e3*this.j}return!1}async delete(){this.R=!1,await this.U.expireEntries(1/0)}}const m=(e,t)=>e.filter(e=>t in e),x=async({request:e,mode:t,plugins:s=[]})=>{const n=m(s,"cacheKeyWillBeUsed");let i=e;for(const e of n)i=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:i}),"string"==typeof i&&(i=new Request(i));return i},q=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:i=[]})=>{const a=await self.caches.open(e),c=await x({plugins:i,request:t,mode:"read"});let r=await a.match(c,n);for(const t of i)if("cachedResponseWillBeUsed"in t){const i=t.cachedResponseWillBeUsed;r=await i.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:r,request:c})}return r},R=async({cacheName:e,request:s,response:n,event:i,plugins:c=[],matchOptions:r})=>{const o=await x({plugins:c,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:a(o.url)});const f=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let i=t,a=!1;for(const t of n)if("cacheWillUpdate"in t){a=!0;const n=t.cacheWillUpdate;if(i=await n.call(t,{request:e,response:i,event:s}),!i)break}return a||(i=i&&200===i.status?i:void 0),i||null})({event:i,plugins:c,response:n,request:o});if(!f)return;const u=await self.caches.open(e),h=m(c,"cacheDidUpdate"),d=h.length>0?await q({cacheName:e,matchOptions:r,request:o}):null;try{await u.put(o,f)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of b)await e()}(),e}for(const t of h)await t.cacheDidUpdate.call(t,{cacheName:e,event:i,oldResponse:d,newResponse:f,request:o})},k=q,j=async({request:e,fetchOptions:s,event:n,plugins:i=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const a=m(i,"fetchDidFail"),c=a.length>0?e.clone():null;try{for(const t of i)if("requestWillFetch"in t){const s=t.requestWillFetch,i=e.clone();e=await s.call(t,{request:i,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const r=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of i)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:r,response:t}));return t}catch(e){for(const t of a)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:c.clone(),request:r.clone()});throw e}};try{self["workbox:strategies:5.1.4"]&&_()}catch(e){}let U;async function L(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},i=t?t(n):n,a=function(){if(void 0===U){const e=new Response("");if("body"in e)try{new Response(e.body),U=!0}catch(e){U=!1}U=!1}return U}()?s.body:await s.blob();return new Response(a,i)}try{self["workbox:precaching:5.1.4"]&&_()}catch(e){}function N(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const i=new URL(n,location.href),a=new URL(n,location.href);return i.searchParams.set("__WB_REVISION__",s),{cacheKey:i.href,url:a.href}}class E{constructor(e){this.v=h(e),this.L=new Map,this.N=new Map,this.M=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:i}=N(n),a="string"!=typeof n&&n.revision?"reload":"default";if(this.L.has(i)&&this.L.get(i)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this.L.get(i),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.M.has(e)&&this.M.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:i});this.M.set(e,n.integrity)}if(this.L.set(i,e),this.N.set(i,a),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],i=await self.caches.open(this.v),a=await i.keys(),c=new Set(a.map(e=>e.url));for(const[e,t]of this.L)c.has(t)?n.push(e):s.push({cacheKey:t,url:e});const r=s.map(({cacheKey:s,url:n})=>{const i=this.M.get(s),a=this.N.get(n);return this.K({cacheKey:s,cacheMode:a,event:e,integrity:i,plugins:t,url:n})});await Promise.all(r);return{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this.v),t=await e.keys(),s=new Set(this.L.values()),n=[];for(const i of t)s.has(i.url)||(await e.delete(i),n.push(i.url));return{deletedURLs:n}}async K({cacheKey:e,url:s,cacheMode:n,event:i,plugins:a,integrity:c}){const r=new Request(s,{integrity:c,cache:n,credentials:"same-origin"});let o,f=await j({event:i,plugins:a,request:r});for(const e of a||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:i,request:r,response:f}):f.status<400))throw new t("bad-precaching-response",{url:s,status:f.status});f.redirected&&(f=await L(f)),await R({event:i,plugins:a,response:f,request:e===s?r:new Request(e),cacheName:this.v,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.L}getCachedURLs(){return[...this.L.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.L.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.v)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.v,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),i=new Request(e);return()=>n({request:i})}}let M;const K=()=>(M||(M=new E),M);const T=(e,t)=>{const s=K().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:i}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const c=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(a,t);if(yield c.href,s&&c.pathname.endsWith("/")){const e=new URL(c.href);e.pathname+=s,yield e.href}if(n){const e=new URL(c.href);e.pathname+=".html",yield e.href}if(i){const e=i({url:a});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let O=!1;function D(e){O||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const i=h();self.addEventListener("fetch",a=>{const c=T(a.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!c)return;let r=self.caches.open(i).then(e=>e.match(c)).then(e=>e||fetch(c));a.respondWith(r)})})(e),O=!0)}const A=[],C={get:()=>A,add(e){A.push(...e)}},P=e=>{const t=K(),s=C.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},S=e=>{const t=K();e.waitUntil(t.activate())};var I;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),I={},function(e){K().addToCacheList(e),e.length>0&&(self.addEventListener("install",P),self.addEventListener("activate",S))}([{url:"/_next//static/worker/a444854a46b0aad6281ceca767000b27.js",revision:"3877fd203813158e1fb4ce850c983140"},{url:"/_next/static/CLbtecUjR6TslfAuq8wfj/_buildManifest.js",revision:"ec77ec072a05a1be5a1c74630f5379a6"},{url:"/_next/static/CLbtecUjR6TslfAuq8wfj/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/206-8a3c001be5388e966a48.js",revision:"eef5b87faa2fa5285426f596ca299a16"},{url:"/_next/static/chunks/2b7b2d2a.ad395630f430d84c3532.js",revision:"4c76cca3e34b313b0cb6d2847bdaf3b5"},{url:"/_next/static/chunks/316-4f35d7986d7e927a8422.js",revision:"bdcc96c71e7e5282f5819c96431452f6"},{url:"/_next/static/chunks/384-5fe367290997ad32b5b9.js",revision:"0328cdb3b62af1be5f6c4477c8786569"},{url:"/_next/static/chunks/763.382ebb2a94fa6a08ab63.js",revision:"3cd5f9c56e1373490359a86dc3ca9f5b"},{url:"/_next/static/chunks/831-345cc379727b71d4b31e.js",revision:"96c1f07ba7a1e55bdb591f09b086751f"},{url:"/_next/static/chunks/911.75dd6d819141debcc344.js",revision:"45b973173e5dde7b4701304251bb4b93"},{url:"/_next/static/chunks/931-6f2c09e20c3d67f2dc77.js",revision:"3be574c1912f920633d8b1cb29785b12"},{url:"/_next/static/chunks/framework-c93ed74a065331c4bd75.js",revision:"f1bf165707208832eb81650043255b25"},{url:"/_next/static/chunks/main-6431fce530575a0ebbd1.js",revision:"a17ba513388334aefb127bd47c364a41"},{url:"/_next/static/chunks/pages/_app-74e9a57ec56a2b5ca4ad.js",revision:"fb81f35040917246e4502e8c104e6a19"},{url:"/_next/static/chunks/pages/_error-dd94dceb95f49facb9ec.js",revision:"64ce7cf210e852ff4bb6764f5152215c"},{url:"/_next/static/chunks/pages/eg-eod-overview-eeb0a404724c0c8c6aad.js",revision:"4eb0a67d4dc43e16a8a7804b45b67f91"},{url:"/_next/static/chunks/pages/index-1c2b6ec69ddfbe038924.js",revision:"84dbaa680d5ad5dada2e01dbe95da82a"},{url:"/_next/static/chunks/pages/patient-identification-22bb546c23845eca21d9.js",revision:"3540515d34b842a7acdf406811df549d"},{url:"/_next/static/chunks/pages/patient-identification/clinical-signs-89917a5ece3e69ed328d.js",revision:"7d9266e0aeb4f84169918002580c120f"},{url:"/_next/static/chunks/pages/patient-identification/patient-with-eoe-ibs-0da891041101c32191cd.js",revision:"a8f821af6aa1577ac2bc5d74732946b6"},{url:"/_next/static/chunks/pages/patient-identification/prior-diagnoses-6798a1485ad561637c6d.js",revision:"c86ff18edd12685525a95e0f538a858f"},{url:"/_next/static/chunks/pages/patient-identification/symptom-overview-9aa1dce628f765963c8f.js",revision:"2bf108724916dcd93d865b3768a71b07"},{url:"/_next/static/chunks/pages/rethinking-prevalence-65df0ced2be38e333336.js",revision:"29c5f01267d5e047cb4f7120545b2656"},{url:"/_next/static/chunks/pages/rethinking-prevalence/egd-with-biopsy-3afbe64beb6b1e918abe.js",revision:"84c38f87d42f3e5f3b1266ede01d8926"},{url:"/_next/static/chunks/pages/rethinking-prevalence/study-design-f572dac3793b719f548a.js",revision:"92b3a2e7b104b18288954f17e6ca8dfd"},{url:"/_next/static/chunks/pages/rethinking-prevalence/study-results-60648ed1a76133efe834.js",revision:"1e8f21b2502dd0894aeb37ef05dc8d37"},{url:"/_next/static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-1539ff4a9072d9605e11.js",revision:"75093e11053bc5df1870c19acbcc7866"},{url:"/_next/static/css/2294688c36185bd8328f.css",revision:"356e37905f4e416cd3554daaeaa6effe"},{url:"/_next/static/css/40c9e62023790c66f67e.css",revision:"98cdf15be43b2a5528ec691d3467be2b"},{url:"/_next/static/css/495cbe409e50cadf193d.css",revision:"1d5fe63fdbe42ef58301fbeb1d7063f2"},{url:"/_next/static/css/5b60e1c120cc14fe6bec.css",revision:"24a794ea7289e5020895db8020d57081"},{url:"/_next/static/css/5c1b6a5e56ea1f075dfc.css",revision:"f2b5ab9e7ab3949f7d9ff2453c7e1c45"},{url:"/_next/static/css/7bc2a668e467af561e4b.css",revision:"21377491b83eacadf0576ee7f61051d5"},{url:"/_next/static/css/9482b1101b390b6fc1c3.css",revision:"0f7183023a3fd0001b7ad5edf7fc1171"},{url:"/_next/static/css/9b604aef77e28f5fee83.css",revision:"14a358718137d1b80d66f7618ec04780"},{url:"/_next/static/css/a0951b87920a1187f1d2.css",revision:"7f2110506074faa4cf0826961618175a"},{url:"/_next/static/css/c04d9d18f140072cf5fa.css",revision:"c49f82006343819ca583db11821acfd1"},{url:"/_next/static/css/d4aede520dc1dead48f4.css",revision:"88c7401e7415e3aa252fd5037241a0d7"},{url:"/_next/static/css/e49262d802bad09a0027.css",revision:"3dbecffd2f854686ffdb7411419d7bf0"},{url:"/_next/static/css/f1b0fc8ad0cbc34f0695.css",revision:"3e74daeffbdd25add7c680ff303c2dca"},{url:"/_next/static/images/bluebokeh-bg@2x-962b002922dfe6c8c8b0bd349e91d6c0.jpg",revision:"962b002922dfe6c8c8b0bd349e91d6c0"},{url:"/_next/static/images/clinical-signs-chart-bg@2x-fba3a001449315978a039da5a44a963f.png",revision:"fba3a001449315978a039da5a44a963f"},{url:"/_next/static/images/egd-with-biopsy-chart-bg@2x-6496137f1fd4ba86db5a6e141fb9581b.png",revision:"6496137f1fd4ba86db5a6e141fb9581b"},{url:"/_next/static/images/gi-symptom-diary@2x-bb931ac16f14f2d17bcf89231fa1dcf6.jpg",revision:"bb931ac16f14f2d17bcf89231fa1dcf6"},{url:"/_next/static/images/histologic-criteria-image@2x-63a2d33cbae87c7d2402826ea5a12e32.jpg",revision:"63a2d33cbae87c7d2402826ea5a12e32"},{url:"/_next/static/images/home-bg@2x-e76a7f775f95b0af70d92bbc9f18d476.jpg",revision:"e76a7f775f95b0af70d92bbc9f18d476"},{url:"/_next/static/images/ibs-chart-bg@2x-dbc80aa0fe3599bea4b8bc50dbc1e114.png",revision:"dbc80aa0fe3599bea4b8bc50dbc1e114"},{url:"/_next/static/images/overlap-with-eoe-chart-bg@2x-d66523f9eb19f2ae11620296683ac40f.png",revision:"d66523f9eb19f2ae11620296683ac40f"},{url:"/_next/static/images/prior-diagnoses-US-study-chart-bg@2x-edc2134ea38f5b605bebda7015fa44c5.png",revision:"edc2134ea38f5b605bebda7015fa44c5"},{url:"/_next/static/images/prior-diagnoses-prev-study-chart-bg@2x-63bd46379f4566f7755e8e2913859585.png",revision:"63bd46379f4566f7755e8e2913859585"},{url:"/_next/static/images/symptom-overview-frequency-chart-bg@2x-071dc2ff76a9554f28f671b55d881c61.png",revision:"071dc2ff76a9554f28f671b55d881c61"},{url:"/_next/static/images/symptom-overview-incidence-chart-bg@2x-8af6ae2c7489373ee187ff73c5f37cfe.png",revision:"8af6ae2c7489373ee187ff73c5f37cfe"}]),D(I),function(e,s,a){let c;if("string"==typeof e){const t=new URL(e,location.href);c=new n(({url:e})=>e.href===t.href,s,a)}else if(e instanceof RegExp)c=new i(e,s,a);else if("function"==typeof e)c=new n(e,s,a);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});c=e}o().registerRoute(c)}(/^https?.*/,new class{constructor(e={}){this.v=d(e.cacheName),this.T=e.plugins||[],this.O=e.fetchOptions,this.D=e.matchOptions}async handle({event:e,request:s}){"string"==typeof s&&(s=new Request(s));let n,i=await k({cacheName:this.v,request:s,event:e,matchOptions:this.D,plugins:this.T});if(!i)try{i=await this.A(s,e)}catch(e){n=e}if(!i)throw new t("no-response",{url:s.url,error:n});return i}async A(e,t){const s=await j({request:e,event:t,fetchOptions:this.O,plugins:this.T}),n=s.clone(),i=R({cacheName:this.v,request:e,response:n,event:t,plugins:this.T});if(t)try{t.waitUntil(i)}catch(e){}return s}}({cacheName:"NetworkFirst",plugins:[new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const i=this.C(n),a=this.P(s);l(a.expireEntries());const c=a.updateTimestamp(t.url);if(e)try{e.waitUntil(c)}catch(e){}return i?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.P(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.S=e,this.j=e.maxAgeSeconds,this.I=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),b.add(t))}P(e){if(e===d())throw new t("expire-custom-caches-only");let s=this.I.get(e);return s||(s=new v(e,this.S),this.I.set(e,s)),s}C(e){if(!this.j)return!0;const t=this.F(e);if(null===t)return!0;return t>=Date.now()-1e3*this.j}F(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.I)await self.caches.delete(e),await t.delete();this.I=new Map}}({maxEntries:2e3,purgeOnQuotaError:!0})]}),"GET");
