const Local = require('./store/singleTimestamp/localStorageEntry.js');
const Remote = require('./store/singleTimestamp/file.js');

// first call should always be synchronize(defaults) to prevent overwriting of remote data
function Settings(drive) {
  this.drive = drive;
  this.local = new Local('settings');
}

Settings.default = function() {
  return {
    decks: [],
  };
};

Settings.prototype.synchronize = async function(object) {
  if (!this.remote) {
    const remote = ;
    this.remote = await Remote.byName('tabun.json', this.drive) || await Remote.create('tabun.json', t
  }
  return this.local.synchronize(this.remote, object);
};

Settings.prototype.set = function(object) {
  this.local.set(object, new Date().getTime());
};

Settings.prototype.get = function() {
  return this.local.get();
};

module.exports = Settings; 
