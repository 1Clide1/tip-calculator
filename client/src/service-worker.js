/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate, CacheFirst } from "workbox-strategies";

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== "navigate") {
      return false;
    } // If this is a URL that starts with /_, skip.

    if (url.pathname.startsWith("/_")) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.
    request.destination === "image", CacheFirst();
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
  // Add in any other file extensions or routing criteria as needed.
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"), // Customize this strategy as needed, e.g., by changing to CacheFirst.
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [
      // Ensure that once this runtime cache reaches a maximum size the
      // least-recently used images are removed.
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.
console.log("service worker ready to go!");
// naming the cache and data
const CACHE_NAME = "tip-calculator-cache-v1";
const URLS = [
  "/",
  "/keepdachange.app",
  "/index.html",
  "static/js/main.chunk.js",
  "static/js/0.chunk.js",
  "/static/css/main.b9082901.chunk.css",
  "/static/js/2.c24141ae.chunk.js",
  "/static/js/main.61434094.chunk.js",
  "/keepdachange.app/favicon/favicon.ico",
  "/keepdachange.app/favicon/favicon-16x16.png",
  "/keepdachange.app/favicon/favicon-32x32.png",
  "/keepdachange.app/favicon/apple-touch-icon-iphone-60x60.png",
  "/keepdachange.app/favicon/apple-touch-icon-ipad-76x76.png",
  "/keepdachange.app/favicon/apple-touch-icon-iphone-retina-120x120.png",
  "/keepdachange.app/favicon/apple-touch-icon-ipad-retina-152x152.png",
  "/keepdachange.app/favicon/apple-touch-icon.png",
  "/keepdachange.app/favicon/android-chrome-192x192.png",
  "/keepdachange.app/favicon/android-chrome-512x512.png",
  "/keepdachange.app/manifest.json",
];
// Respond with cached resources
self.addEventListener("fetch", function (e) {
  console.log("fetch request : " + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        // if cache is available, respond with cache
        console.log("responding with cache : " + e.request.url);
        return request;
      } else {
        // if there are no cache, try fetching request
        console.log("file is not cached, fetching : " + e.request.url);
        return fetch(e.request);
      }
    })
  );
});
// installing the service worker
self.addEventListener("install", function (evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("files were pre-cached!!");
      return cache.addAll(URLS);
    })
  );
  self.skipWaiting();
});
// intercept the fetch request with the service worker
self.addEventListener("fetch", function (evt) {
  // if the cache does not include an api
  //   must have if there is no api
  evt.respondWith(
    fetch(evt.request).catch(function () {
      return caches.match(evt.request).then(function (response) {
        if (response) {
          return response;
        } else if (evt.request.headers.get("accept").includes("text/html")) {
          // return the cached home page for all requests for html pages
          return caches.match("/");
        }
      });
    })
  );
});
