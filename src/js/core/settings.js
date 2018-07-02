const SyncedFile = require('./syncedFile');

// first call should always be synchronize(defaults) to prevent overwriting of remote data
function Settings(drive) {
  this.drive = drive;
  this.file = new SyncedFile(drive, 'settings', 'tabun.json'); 
}

Settings.default = function() {
  return {
    decks: [],
  };
};

Settings.prototype.synchronize = async function(object) {
  return this.file.synchronize(object ? JSON.stringify(object) : undefined);
};

Settings.prototype.set = function(object) {
  this.file.setLocal(JSON.stringify(object));
  return this.synchronize();
};

Settings.prototype.get = function() {
  return JSON.parse(this.file.retrieve());
};

// all mutators operate exclusively on the local data
// expected to call synchronize() upon once changes are completed
// Settings.prototype.addDeck = function(source, locator) {
//   const s = this.get();
//  const userData = new SyncedFile(this.drive, `${source}:${locator}`);
//  s.decks.push({
//    source,
//    at: locator,
//  });
//  this.set(
// };

module.exports = Settings; 
