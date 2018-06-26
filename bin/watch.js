const fs = require('fs');
const build = require('./build.js');
const rm = require('rimraf');

fs.watch('src', { recursive: true }, (event) => {
  console.log('regenerating...')
  rm.sync('www/*', );
  build();
});
