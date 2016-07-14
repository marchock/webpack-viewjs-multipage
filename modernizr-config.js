module.exports = {
  filename: 'js/modernizr-bundle.js',
  "minify": true,
  "options": [
    "setClasses"
  ],
  "feature-detects": [
    "test/svg",
    "test/touchevents",
    "test/css/transforms3d"
  ]
}