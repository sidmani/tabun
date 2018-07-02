function SyncedFile(drive, localStorageKey, name) {
  this.drive = drive;
  this.name = name;
  this.localStorageKey = localStorageKey;
  this.localStorageIdKey = localStorageKey + '_id';
}

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

// get id of file by name
SyncedFile.prototype.retrieveRemoteId = async function() {
  if (window.localStorage[this.localStorageIdKey]) {
    return window.localStorage[this.localStorageIdKey];
  }

  const files = await this.drive.list(`name = '${this.name}'`);
  if (files.length === 0) {
    return undefined;
  }

  window.localStorage[this.localStorageIdKey] = files[0].id;
  return files[0].id;
};

// get file with prepended timestamp from remote
SyncedFile.prototype.retrieveRemote = async function() {
  const id = await this.retrieveRemoteId();
  
  if (!id) {
    window.localStorage.removeItem(this.localStorageIdKey);
    return undefined;
  }

  try {
    return (await this.drive.get(id)).text();
  } catch (e) {
    window.localStorage.removeItem(this.localStorageIdKey);
    throw e;
  }
};

// set file on remote
SyncedFile.prototype.setRemote = async function(content) {
  const id = await this.retrieveRemoteId();
  const str = prependTimestamp(content);
  // file does not exist, create
  if (!id) {
    return this.drive.put(this.name, str);
  }

  // file exists, update
  return this.drive.update(id, str);
};

// get file with prepended timestamp from localStorage
SyncedFile.prototype.retrieveLocal = function() {
  return window.localStorage[this.localStorageKey];
}

// set file in localStorage
SyncedFile.prototype.setLocal = function(content) {
  window.localStorage[this.localStorageKey] = prependTimestamp(content);  
}

// convenience method to get data and strip timestamp
SyncedFile.prototype.retrieve = function() {
  const file = this.retrieveLocal();
  if (!file) {
    throw new Error(`Could not load local data for file ${this.name}`);
  }
  return stripTimestamp(file);
};

SyncedFile.prototype.synchronize = async function(contents) {
  const remote = splitTimestamp(await this.retrieveRemote());
  const local = splitTimestamp(this.retrieveLocal());

  if (local && ((remote && local.time > remote.time) || !remote)) {
    // overwrite remote with local if local exists and either:
    // - remote exists and is outdated
    // - remote does not exist
    await this.setRemote(local.contents);
  } else if (remote) {
    // overwrite local with remote if remote exists and either:
    // - local exists and is outdated
    // - local does not exist
    this.setLocal(remote.contents);
  } else {
    // both do not exist
    if (!contents) {
      throw new Error('No data to synchronize!');
    }

    this.setLocal(contents);
    await this.setRemote(contents);
  }
}

module.exports = SyncedFile;
