function File(id, drive) {
  this.id = id;
  this.drive = drive;
}

File.create = async function(drive, name, data) {
  return drive.request(drive.create(name, data));
};

File.prototype.set = async function(data) {
  return drive.request(drive.update(this.id, data));
};

File.prototype.get = async function() {
  return drive.request(drive.get(this.id));
};

File.prototype.timestamp = async function() {
  const res = await drive.request(drive.getMeta(this.id, 'modifiedAt'));
  return Date.parse(res.modifiedAt).getTime();
};
