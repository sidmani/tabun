function Folder(id, drive) {
  this.id = id;
  this.drive = drive;
}

Folder.create = async function (drive, name) {
  return drive.createFolder(name);
};

Folder.prototype.createKeys = async function (count) {
  const reqs = [].fill(this.drive.generateIds(1000), 0, Math.floor(count / 1000));
  reqs.push(this.drive.generateIds(count % 1000));
  return this.drive.request(reqs);
};

Folder.prototype.getProperties = async function (id) {
  const res = await this.drive.request(this.drive.getMeta(id, 'properties'));
  return res.properties;
};

Folder.prototype.query = async function (q) {
  return this.drive.list(`(${this.id} in parents)${ q ? `and (${q})` : ''}`, 'properties');
};

// Version protocol

// retrieve the list of versions
Folder.prototype.versions = async function () {
  const json = await this.getProperties(this.id);
  return Object.keys(json.properties);
};

// get data by version id
Folder.prototype.getVersions = async function (versions) {
  const reqs = versions.map(v => this.query(`properties has { version='${v}' }`));
  return this.drive.request(reqs);
};

// key is a string and object is a string:string mapping
// TODO: this method doesn't create as necessary

Folder.prototype.batchSet = async function (dict) {
  const requests = Object.keys(dict).map(key => this.drive.updateMeta(key, { properties: dict[key] }));
  return this.drive.request(requests);
};


