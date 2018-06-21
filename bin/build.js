const browserify = require('browserify');
const babelify = require('babelify');
const uglifyify = require('uglifyify');
const fs = require('fs');
const mkdirp = require('mkdirp');
const cp = require('recursive-copy');

module.exports = function build() {
  mkdirp('docs/');

  // build javascript
  browserify(['src/js/index.js'])
    .transform(babelify, { global: true })
    .transform(uglifyify, { global: true })
    .bundle()
    .on('error', (err) => console.log(err))
    .pipe(fs.createWriteStream('www/index.js'));

  // copy static files
  cp('src/static', 'www/', { overwrite: true });
}
