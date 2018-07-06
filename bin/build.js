const browserify = require('browserify');
const babelify = require('babelify');
const uglifyify = require('uglifyify');
const fs = require('fs');
const mkdirp = require('mkdirp');
const watchify = require('watchify');
const ncp = require('ncp');

const b = browserify(['src/js/index.js'], {
  cache: {},
  packageCache: {},
  standalone: 'tabun',
  debug: true,
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
  ncp('src/web', 'www');
  bundle();
};

module.exports.watch = function watch() {
  b.plugin(watchify);
  mkdirp('www');
  fs.watch('src/web', { recursive: true }, () => {
    ncp('src/web', 'www');
  });
  b.on('update', bundle);
  ncp('src/web', 'www');
  bundle();
};
