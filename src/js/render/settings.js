const Drive = require('../core/drive');
const Settings = require('../core/settings');
const build = require('./buildHTML');

function layout(s) {
  console.log(s);
}

async function display() {
  const drive = await Drive.setup();
  const settings = new Settings(drive);
  await settings.synchronize();

  layout(settings.get());
}

module.exports = { display }
