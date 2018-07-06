const LocalStorageEntry = function(key) { 
  this.key = key;
};

// functions for timestamp parse and insertion
function prependTimestamp(str) {
  return `${new Date().getTime()}|${str}`;
}

function stripTimestamp(str) {
  return str.substr(str.indexOf('|') + 1);
}

function getTimestamp(str) {
  return parseInt(str.substr(0, str.indexOf('|')), 10);
}

function splitTimestamp(str) {
  if (!str) {
    return undefined;
  }

  return {
    time: getTimestamp(str),
    contents: stripTimestamp(str),
  };
}

LocalStorageEntry.prototype.synchronize = require('./synchronize');

// singleTimestamp protocol
LocalStorageEntry.prototype.get = function() {
  if (!window.localStorage[this.key]) {
    return {};
  }
  return JSON.parse(stripTimestamp(window.localStorage[this.key]));
};

LocalStorageEntry.prototype.set = function(value) {
  window.localStorage[this.key] = prependTimestamp(JSON.stringify(value));
};

LocalStorageEntry.prototype.timestamp = function() {
  if (!window.localStorage[this.key]) {
    return 0;
  }
  return getTimestamp(window.localStorage[this.key]);
};

