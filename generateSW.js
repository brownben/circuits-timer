const { generateSW } = require('rollup-plugin-workbox')

generateSW({
  swDest: './docs/service-worker.js',
  globDirectory: './docs',
  globPatterns: ['**/*.{html,json,js,css,woff2,png,svg,txt}'],

  cacheId: 'circuits-timer-precache',
  sourcemap: false,
  inlineWorkboxRuntime: true,
  mode: 'production',

  navigateFallback: '/circuits-timer/index.html',
}).writeBundle()
