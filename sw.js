if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>i(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-1846d813"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/timeable/_next/static/X84P9BGsNuxBb3gvksi0H/_buildManifest.js",revision:"X84P9BGsNuxBb3gvksi0H"},{url:"/timeable/_next/static/X84P9BGsNuxBb3gvksi0H/_middlewareManifest.js",revision:"X84P9BGsNuxBb3gvksi0H"},{url:"/timeable/_next/static/X84P9BGsNuxBb3gvksi0H/_ssgManifest.js",revision:"X84P9BGsNuxBb3gvksi0H"},{url:"/timeable/_next/static/chunks/framework-6e4ba497ae0c8a3f.js",revision:"X84P9BGsNuxBb3gvksi0H"},{url:"/timeable/_next/static/chunks/main-445ec74aef6ca905.js",revision:"X84P9BGsNuxBb3gvksi0H"},{url:"/timeable/_next/static/chunks/pages/404-4671ab2a29ad5840.js",revision:"X84P9BGsNuxBb3gvksi0H"},{url:"/timeable/_next/static/chunks/pages/_app-9cd1d19dd7237c4c.js",revision:"X84P9BGsNuxBb3gvksi0H"},{url:"/timeable/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"X84P9BGsNuxBb3gvksi0H"},{url:"/timeable/_next/static/chunks/pages/index-b3478cf7fe3a3104.js",revision:"X84P9BGsNuxBb3gvksi0H"},{url:"/timeable/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"X84P9BGsNuxBb3gvksi0H"},{url:"/timeable/_next/static/chunks/webpack-ecaa13226c529862.js",revision:"X84P9BGsNuxBb3gvksi0H"},{url:"/timeable/_next/static/css/0a91ca0fa9ff046e.css",revision:"X84P9BGsNuxBb3gvksi0H"},{url:"/timeable/_next/static/css/c8a7199f0a1d3e20.css",revision:"X84P9BGsNuxBb3gvksi0H"},{url:"/timeable/bg.mp4",revision:"a79ce986d0b9c747e25b2cb96565bb9c"},{url:"/timeable/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/timeable/icon-192x192.png",revision:"d8d40bc4b5d3a48280998549bb0f844a"},{url:"/timeable/icon-256x256.png",revision:"b292cdf0400c568fc5850e20996441a6"},{url:"/timeable/icon-384x384.png",revision:"4db813457d02f7011545f14955d58b80"},{url:"/timeable/icon-512x512.png",revision:"a569a295d02e2d58fe29c407deb16a73"},{url:"/timeable/icon.png",revision:"7661903fbb4aca94419da224c71c308b"},{url:"/timeable/manifest.json",revision:"93b1f81952cca7c93ed4fd8b21c9752b"},{url:"/timeable/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/timeable",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
