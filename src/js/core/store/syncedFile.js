function SyncedFile(drive, name) {
  this.drive = drive;
  this.name = name;
  this.localStorageIdKey = name + '_id';
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

SyncedFile.prototype.retrieveRemoteTimestamp = async function(id) {
  const meta = await this.drive.meta(id, 'modifiedTime');
  console.log(meta);
  return Date.parse(meta.modifiedTime).getTime();
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
  return window.localStorage[this.name];
}

// set file in localStorage
SyncedFile.prototype.setLocal = function(content) {
  window.localStorage[this.name] = prependTimestamp(content);  
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
};

SyncedFile.prototype.delete = async function() {
  const id = await this.retrieveRemoteId();
  await this.drive.delete(id);
  window.localStorage.removeItem(this.localStorageIdKey);
  window.localStorage.removeItem(this.name);
};

module.exports = SyncedFile;
