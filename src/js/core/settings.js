const SyncedFile = require('./syncedFile');

// first call should always be synchronize(defaults) to prevent overwriting of remote data
function Settings(drive) {
  this.drive = drive;
  this.file = new SyncedFile(drive, 'tabun.json'); 
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

module.exports = Settings; 
