function File(id, drive) {
  this.id = id;
  this.drive = drive;
}

File.prototype.synchronize = require('./synchronize');

File.create = async function (name, data, drive) {
  const id = drive.request(drive.create({ name, properties: { timestamp: 0 } }, data));
  return new File(id, drive);
};

File.byName = async function (name, drive) {
  const files = await drive.request(drive.list(`name = '${this.name}'`));
  if (files.length === 0) {
    return undefined;
  }

  return new File(files[0].id, drive);
};

// singleTimestamp protocol
File.prototype.get = async function () {
  return this.drive.request(this.drive.get(this.id));
};

File.prototype.set = async function (value, timestamp) {
  return this.drive.request(this.drive.update(
    this.id,
    { properties: { timestamp } },
    JSON.stringify(value),
  ));
};

File.prototype.timestamp = async function () {
  const res = await this.drive.request(this.drive.getMeta(this.id, 'properties/timestamp'));
  return (await res.json()).properties.timestamp;
};
