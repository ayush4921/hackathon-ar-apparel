/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["cart.html","1086da5c2ecaed32dd583a49cea39b82"],["checkout.html","dc943c90d2f252e219129f34abe198ef"],["css/JeeWidget.css","eaf4ceaeb734c41c0b16d5e31530655d"],["css/animate.css","657864089e90dd1603c4bab2be10f861"],["css/bootstrap.min.css","fee68c0f2f583161134a1fcb5950501d"],["css/classy-nav.min.css","d5b23b127e0958744fd8274a21e70024"],["css/core-style.css","f71ba303bc0d7b0c0a0e19bec95e3932"],["css/core-style.css.map","1fe4e3286d2fe001b5c01e3eb1615336"],["css/font-awesome.min.css","269550530cc127b6aa5a35925a7de6ce"],["css/jquery-ui.min.css","f5d095f4fe63781bb585c1226d1ac093"],["css/magnific-popup.css","2239303d6f05be6b812d727760b745c9"],["css/nice-select.css","c2e46afbe65d3cac302e5db87abde51b"],["css/owl.carousel.css","b51416af9e8adbe3d16f5f2526aba221"],["debug.log","3c3137ee18b5951f8540038aff4e1740"],["demo.html","259e5adc940611d66856c4bccecbfc18"],["fonts/FontAwesome.otf","0d2717cd5d853e5c765ca032dfd41a4d"],["fonts/fontawesome-webfont.eot","674f50d287a8c48dc19ba404d20fe713"],["fonts/fontawesome-webfont.svg","912ec66d7572ff821749319396470bde"],["fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["fonts/helvetica_neu_bold-webfont.ttf","4977fe71d296690d4363bf338197225d"],["fonts/helvetica_neu_bold-webfont.woff","f9c3c1802f72242572610edc99e9bf7b"],["fonts/helvetica_neu_bold-webfont.woff2","f302e7d728e248b7d417dbacc35c199a"],["fonts/helveticaneue_medium-webfont.ttf","c2067568d57d6317a07b3dfa051c164d"],["fonts/helveticaneue_medium-webfont.woff","52292e7a56c7f35bc38c07aa226b3526"],["fonts/helveticaneue_medium-webfont.woff2","05288832f58997a646f8c2fda25353fd"],["glasses3D/README.md","c7e07bbba7a254fe92338adef55af78f"],["glasses3D/glasses1.json","7c8dfc69b337879acee94306a1b4dc0b"],["glasses3D/glasses3Textured.json","677b9a3fd8eab25204fe7d6d7569baa0"],["images/adjust.svg","e8c71afc2f4f10c633dde468cc9d9ca2"],["images/back-white.svg","283a01a44b141cec372d6bd7251f4690"],["images/logo.PNG","1d6bc9b8a821acf08f9977dba2ea9069"],["img/bg-img/1.jpg","0d127b97c4475ff3dc70c7ce5060d73f"],["img/bg-img/2.jpg","f2f15d8b063d927129e3d1e3a8aa9078"],["img/bg-img/3.jpg","2609ff30cea715f0b298db7b7a74208f"],["img/bg-img/4.jpg","65b279ca522032cf8607872f442de44d"],["img/bg-img/5.jpg","f56d468787b87119691985b6ec67451f"],["img/bg-img/6.jpg","1bb707f5d22577a7ad09d9a45a18d238"],["img/bg-img/7.jpg","eaf067915d2aa42603e1c05491c285ce"],["img/bg-img/8.jpg","2dcb8ba684bdf0fca8a67930c8cf5e25"],["img/bg-img/9.jpg","2b779d29cbf402ac08f37bd8fbccd68b"],["img/bg-img/cart1.jpg","57c5e9436cd1ab8705d9e761d8cd8a58"],["img/bg-img/cart2.jpg","a0399de7aaccad4ca80d615a0aa4b95f"],["img/bg-img/cart3.jpg","06ec6871b5880bec7cb9038ebe6e3740"],["img/core-img/cart.png","ec671ecf4dabc6a6c884df53900eaf85"],["img/core-img/favicon.ico","f732b9bf02f87844395c3a78b6180a7e"],["img/core-img/favorites.png","27a9d0006b18afbe5d32a9ff4d3a368f"],["img/core-img/logo.png","622d46387f084edb9232f3e75c8ae18b"],["img/core-img/logo2.png","ab550f7ccc1f5df1a2a9a2fc5cf0c432"],["img/core-img/paypal.png","f98bdfb4ac0896070044e890ac7eb986"],["img/core-img/search.png","460c636741e32cd53250ea087865b7da"],["img/product-img/pro-big-1.jpg","dbffe2bf4bc0eabb6a05b7a9c2ba0807"],["img/product-img/pro-big-2.jpg","4c1f54df81a3295fdb65541e7f7309e0"],["img/product-img/pro-big-3.jpg","b0a32507d30aad5a6014c53d5adc24d7"],["img/product-img/pro-big-4.jpg","1ea8966c43cc2f1091c2216b19c71c54"],["img/product-img/product1.jpg","afade9e9018c63ab9cb310131c223397"],["img/product-img/product2.jpg","3d22fdc62ec7c6e529580bd26789cb8d"],["img/product-img/product3.jpg","2675550aa31a5b9bc68f7047fb620b9b"],["img/product-img/product4.jpg","04a578c83fe2adb704b4e9e4b60af1b6"],["img/product-img/product5.jpg","0f13ffdbaa9a75209b4660f43ac4bf8a"],["img/product-img/product6.jpg","0a4f96042e0abdc4382b981bc9d69ef6"],["index.html","7c4919725c12424a60d8fd6bc85ee9b8"],["js/JeelizNNCwidget.js","44a136267205180e3e2f3b88ea491f37"],["js/active.js","f9da80ad744a2b8ddf995c0f7fb2d83e"],["js/bootstrap.min.js","ce6e785579ae4cb555c9de311d1b9271"],["js/classy-nav.min.js","f98911d6d3a2a18e347bcbe95fa3db2c"],["js/jquery/jquery-2.2.4.min.js","2f6b11a7e914718e0290410e85366fe9"],["js/map-active.js","230b827f749c1b3b7f62fd7702271fad"],["js/plugins.js","7d1afff08ca9b2115ce4bc08e1e01bdb"],["js/popper.min.js","6383a57baa1479e8490a42f4184b7f0b"],["product-details.html","59ce757165ed23337419c9216d701813"],["productimages/1.webp","3f976877f941c4361339209d2d503750"],["productimages/2.jpg","9e793a53e7d7c62006063eb051c3b552"],["productimages/2.webp","db0f05896559802e3a26b47d555275e1"],["productimages/3.jpg","0851ec5c0ec5ab131ed213d3563362a3"],["productimages/3.webp","f6be6fc61e81ebb1699376fbb977c7c1"],["productimages/4.jpg","3c2066dc022dbfd29ea148b68d06dc63"],["productimages/4.webp","a65aea715b3c88604638f2318a903419"],["productimages/5.jpg","8f30f20f4f46221da134ef3790c27f89"],["productimages/5.webp","ea655b78cad35404b81780aefb4a9d1a"],["productimages/6.jpg","20aa3033419918b94c31b0c30f0b5746"],["productimages/6.webp","664ea9f785a230330ab3946d87eba380"],["productimages/7.jpg","3f3b8df4e28334c817f8ec4c0021f3e6"],["productimages/8.jfif","3174291e9aacc4ba05d5136f0838cfa8"],["productimages/8.jpg","97a4f8dedc0d8250a2f1514dc86b321e"],["scss/_mixin.scss","a9c126586e3ffa1a0134c48114a234a1"],["scss/_responsive.scss","92c6e2f63453b05f3e89a5c2e09001d6"],["scss/_theme_color.scss","b8b92e144cc32d833d1544e5f9e93788"],["scss/_variables.scss","3be7b618d9757ef11b5f7591e533fcf9"],["scss/style.scss","de16af2ca101759e8330df0c997d65ad"],["shop.html","efc8c8dad3faf5e022aacd777a24a60c"],["style.css","7893a7799c7aa35599a6dbbfc6d68a7f"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







