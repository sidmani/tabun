function Settings(drive) {
  this.drive = drive;
}

Settings.prototype.retrieveRemoteId = async function() {
  if (window.localStorage.settingsId) {
    return window.localStorage.settingsId;
  }

  const res = await this.drive.list('name = \'tabun.json\'');
  if (res.files.length === 0) {
    return undefined;
  }

  window.localStorage.settingsId = res.files[0].id;
  return res.files[0].id; 
};

Settings.prototype.retrieveRemote = async function() {
  const id = await this.retrieveRemoteId(); 
  if (!id) {
    window.localStorage.settingsId = undefined;
    return undefined;
  }

  try {
    return (await drive.get(id)).json();
  } catch(e) {
    window.localStorage.settingsId = undefined;
    throw e;
  }
};

Settings.prototype.setRemote = async function(object) {
  const id = await this.retrieveRemoteId();
  const str = JSON.stringify(object);
  if (!id) {
    // tabun.json does not exist
    return drive.put('tabun.json', str);
  }
  // tabun.json exists
  return drive.update(id, str);
};

Settings.prototype.retrieveLocal = function() {
  const local = window.localStorage.settings;
  if (!local) {
    return undefined;
  }
  return JSON.parse(local);
};

Settings.prototype.setLocal = function(object) {
  window.localStorage.settings = JSON.stringify(object);
};

Settings.prototype.synchronize = async function() {
  const remote = await this.retrieveRemote();
  const local = this.retrieveLocal();
  
  if (!remote || (local && local.time > remote.time)) {
    // local supersedes remote because either
    // - remote does not exist
    // - both exist and local is newer
    await this.setRemote(local);
  } else {
    // remote supersedes local because either:
    // - local does not exist OR
    // - both exist and remote is newer
    this.setLocal(remote);
  }
};

module.exports = Settings; 
