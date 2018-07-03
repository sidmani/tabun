const Sources = require('./sources');
const SyncedFile = require('../syncedFile.js');

function Decks(settings, drive) {
  this.settings = settings;
  this.drive = drive;
}

Decks.prototype.list = function() {
  return this.settings.get().decks;
};

Decks.prototype.add = async function(source, locator) { 
  if (!Sources[source]) {
    throw new Error('Unknown source');
  }

  // get metadata from source
  const meta = await Sources[source].getMeta(locator);
  console.log(meta);

  // create (hopefully) unique filename
  const filename = `${meta.name}_${new Date().getTime()}`;
  
  // retrieve settings and update
  const s = this.settings.get();
  s.decks.push({
    source,
    at: locator,
    name: meta.name,
    version: meta.version,
    data: filename,
  });
  const file = new SyncedFile(this.drive, filename);

  await Promise.all([
    file.synchronize('id,ease,interval,next\n'),
    this.settings.set(s),
  ]);
};

module.exports = Decks;
