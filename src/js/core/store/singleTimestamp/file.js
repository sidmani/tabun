function File(id, drive) {
  this.id = id;
  this.drive = drive;
}

File.prototype.synchronize = require('./synchronize');

File.create = async function(drive, name, data) {
  return drive.request(drive.create(data, meta: { name, properties: { timestamp: 0 } }));
};

// singleTimestamp protocol
File.prototype.get = async function() {
  return drive.request(drive.get(this.id));
};

File.prototype.set = async function(value) {
  return drive.request(drive.update(this.id, data));
};

File.prototype.timestamp = async function() {
  const res = await drive.request(drive.getMeta(this.id, 'properties/timestamp'));
  return (await res.json()).properties.timestamp;
};
