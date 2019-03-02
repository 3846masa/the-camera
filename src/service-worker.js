importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js',
);

workbox.core.setCacheNameDetails({ prefix: 'the-camera' });
workbox.routing.registerRoute(
  /./,
  new workbox.strategies.StaleWhileRevalidate(),
);
