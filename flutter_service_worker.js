'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "16c49467b30724ff245d43bdd82a385c",
"favicon.ico": "4987d41e5a2f11314ebd36636c0121c1",
"index.html": "8fb9509acabdae24ac5a0a8f59f0b2a8",
"/": "8fb9509acabdae24ac5a0a8f59f0b2a8",
"main.dart.js": "e065e6c5494e2d6687f852803028c723",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "c1326befc988b879c460cc1e44ad330c",
"assets/AssetManifest.json": "aa720e89b7372ed88db27d98a35d8d31",
"assets/NOTICES": "5be6b49b5de82da184178e3996dad14a",
"assets/FontManifest.json": "19db8ee1cf8ef6fd9be7b3d283ac5480",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "7df6159021f009dcc5552511382a57e8",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/images/externallink.png": "4c59ed976ababa0c039034744e6a4c9b",
"assets/assets/images/brain.svg": "65be2980a57b88d3a437b397fa63dc4d",
"assets/assets/images/spin.gif": "47444684c9ba4beda1878778e03e6b75",
"assets/assets/images/ryan.png": "f4989b8d04a4a63b7af307e8194475d4",
"assets/assets/images/intent_icons/asana.png": "e2ee2e6de6582429eb522dd3aefee7e2",
"assets/assets/images/intent_icons/google_slide.png": "a85d2ef5a1d1497b443375b3aec8fd85",
"assets/assets/images/intent_icons/zoom.svg": "b6305922901364183ad9afe8551f54bb",
"assets/assets/images/intent_icons/github.png": "ec3a60c8c6539a07eb70b52f6737ea6e",
"assets/assets/images/intent_icons/gmail.png": "dfa19bfe001e82f237e073953577fe42",
"assets/assets/images/intent_icons/google_drive.png": "4ecf44558a5a4828debbad12277a5bf5",
"assets/assets/images/intent_icons/google_calendar.png": "8bc65c06e79ff362277128481ea1f4b5",
"assets/assets/images/intent_icons/slack.png": "cd0c78940438c039ec1dabeb68b3f339",
"assets/assets/images/intent_icons/twitter.png": "66a1d5ba1042c4010f6ae9d26a6f772d",
"assets/assets/images/intent_icons/linkedin.png": "30c453b7f5fbdb09ea0cb42a5dc7a6e5",
"assets/assets/images/intent_icons/workday.png": "b872a42c14791366d71ac0d351998f98",
"assets/assets/images/openai.svg": "60709abf1b9a69f8e4939960a44d025b",
"assets/assets/images/tasks.png": "ea9e03b80437842c484a411090db8920",
"assets/assets/images/logo.png": "49f4b2bebd2339e6765cba42322d1182",
"assets/assets/images/workflow/connection.png": "1eb529452c20b9bb1332a6aae0f0f3b3",
"assets/assets/images/workflow/Workflow_Expand_Notrunning.png": "63b837f704eca08c77471c3e074842af",
"assets/assets/images/workflow/Workflow_Noexpand_Notrunning.png": "83bf5d100d83d5dc144e0a44be70e392",
"assets/assets/images/workflow/down.png": "4f7809d35fbd18e55ea46f2c14f8fdbc",
"assets/assets/images/workflow/right.png": "1e174d8d12d1018052ed291b91c8647d",
"assets/assets/images/timeline.png": "27fe51ed2945d8c97d06cd8050234eb6",
"assets/assets/doc/initial_doc_data.json": "1e85529091c18b160d66129c88296b1b",
"assets/assets/fonts/calibri-bold.ttf": "8879a4caa29c42ce616cd5f172299366",
"assets/assets/fonts/calibri-bold-italic.ttf": "a3e6f73440d8535c2c7c43489e942a10",
"assets/assets/fonts/calibri-italic.ttf": "5e5c563c9151df02784454399060ffb0",
"assets/assets/fonts/calibri-regular.ttf": "baf2d27a2cc7aea124138fb8b4fb5b4d",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
