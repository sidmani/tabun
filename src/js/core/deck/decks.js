const Sources = require('./sources');
const SyncedFile = require('../syncedFile.js');
const FolderStore = require('../store/folderStore.js');

function Decks(settings, drive, db) {
  this.settings = settings;
  this.drive = drive;
  this.db = db;
}

Decks.prototype.list = function() {
  return this.settings.get().decks;
};

Decks.prototype.add = async function(source, locator) { 
  if (!Sources[source]) {
    throw new Error('Unknown source');
  }

  const s = this.settings.get();
  if (s.decks.filter(d => d.source === source && d.locator === locator).length !== 0) {
    throw new Error('Deck already exists');
  }

  // get metadata from source
  const meta = await Sources[source].getMeta(locator);
  console.log(meta);

  // create (hopefully) unique filename
  const filename = `${meta.name}_${new Date().getTime()}`;
  
  // retrieve settings and update
  s.decks.push({
    source,
    locator,
    name: meta.name,
    version: meta.version,
    filename,
  });

   
  await Promise.all([
    db.put('decks', {});

    file.synchronize('id,ease,interval,next\n'),
    this.settings.set(s),
  ]);
};

Decks.prototype.delete = async function(index) {
  const s = this.settings.get();
  if (!s.decks[index]) {
    throw new Error('Deck does not exist');
  }
  const deck = s.decks[index];
  const file = new SyncedFile(this.drive, deck.data);
  await file.delete();
  s.decks = s.decks.filter(d => d.filename !== deck.filename);
  return this.settings.set(s);
};

module.exports = Decks;
