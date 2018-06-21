const fs = require('fs');
const build = require('./build.js');

fs.watch('src', { recursive: true }, (event) => {
  console.log('regenerating...')
  build();
});
