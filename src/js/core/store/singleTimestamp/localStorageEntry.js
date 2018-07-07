const LocalStorageEntry = function (key) {
  this.key = key;
};

LocalStorageEntry.prototype.synchronize = require('./synchronize');

// singleTimestamp protocol
LocalStorageEntry.prototype.get = function () {
  const str = window.localStorage[this.key];
  if (!str) {
    return {};
  }

  // strip timestamp and return parsed JSON
  const json = str.substr(str.indexOf('|') + 1);
  return JSON.parse(json);
};

LocalStorageEntry.prototype.set = function (value, timestamp) {
  // store concatenated timestamp and JSON
  window.localStorage[this.key] = `${timestamp}|${JSON.stringify(value)}`;
};

LocalStorageEntry.prototype.timestamp = function () {
  const str = window.localStorage[this.key];
  if (!str) {
    return 0;
  }

  // get timestamp and return parsed integer
  return parseInt(str.substr(0, str.indexOf('|')), 10);
};
