const LocalStorageEntry = function(key) { 
  this.key = key;
};

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

LocalStorageEntry.prototype.load = function() {
  if (!window.localStorage[this.key]) {
    return {};
  }
  return JSON.parse(stripTimestamp(window.localStorage[this.key]));
};

LocalStorageEntry.prototype.dump = function(value) {
  window.localStorage[this.key] = prependTimestamp(JSON.stringify(value));
};

LocalStorageEntry.prototype.get = function(key) {
  return this.load()[key];
};

LocalStorageEntry.prototype.set = function(key, value) {
  const c = this.load(); 
  c[key] = value;
  this.dump(c);
};

// XXX: no error handling here
LocalStorageEntry.prototype.timestamp = function() {
  return getTimestamp(window.localStorage[this.key]);
};

