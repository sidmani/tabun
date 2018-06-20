const browserify = require('browserify');
const babelify = require('babelify');
const uglifyify = require('uglifyify');
const fs = require('fs');
const mkdirp = require('mkdirp');

mkdirp('www/');
browserify(['src/js/index.js'])
  .transform(babelify)
  .transform(uglifyify, { global: true })
  .bundle()
  .on('error', (err) => console.log(err))
  .pipe(fs.createWriteStream('www/index.js'));
