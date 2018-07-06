function Folder(id, drive) {
  this.id = id;
  this.drive = drive;
}

Folder.create = async function(drive, name) {
  return drive.createFolder(name);
};

Folder.prototype.createKeys = async function(count) {
  const reqs = [].fill(this.drive.generateIds(1000), 0, Math.floor(count / 1000));
  reqs.push(this.drive.generateIds(count % 1000));
  return this.drive.batch(reqs);
};

// key is a string and object is a string:string mapping
Folder.prototype.set = async function(id, object) {
  try {
    await this.drive.request(this.drive.updateMeta(id, { properties: object }));
  } catch(e) {
    // file 404, create instead
    await this.drive.request(this.drive.createMeta(id, { properties: object }, [this.id]));
  }
};

Folder.prototype.get = async function(id) {
  const req = this.drive.getMeta(id, 'properties');
  const res = await this.drive.request(req);
  return res.properties;
};

// TODO: this method doesn't create as necessary
Folder.prototype.batchSet = async function(dict) {
  const requests = Object.keys(dict).map(key => this.drive.updateMeta(key, { properties: dict[key] }));
  return this.drive.batch(requests);
};

Folder.prototype.query = async function(q) {
  const res = await this.drive.list(`(${this.id} in parents)${ q ? `and (${q})` : ''}`, 'properties');
  return res.map(file => file.properties);
};

