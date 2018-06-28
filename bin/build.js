const anodize = require('anodize');
const browserify = require('browserify');
const babelify = require('babelify');
const uglifyify = require('uglifyify');
const fs = require('fs');
const mkdirp = require('mkdirp');
const watchify = require('watchify');

const b = browserify(['src/js/index.js'], {
  cache: {},
  packageCache: {},
  standalone: 'tabun',
})
  .transform(babelify, { global: true })
  .transform(uglifyify, { global: true });

function bundle() {
  b.bundle()
    .on('error', console.error)
    .pipe(fs.createWriteStream('www/index.js'));
}


module.exports.build = function build() {
  mkdirp('www');
  bundle();
  anodize.run();
};

module.exports.watch = function watch() {
  b.plugin(watchify);
  mkdirp('www');
  b.on('update', bundle);
  bundle();
  anodize.watch({ input: '.', serve: true, port: 8000 });
};
