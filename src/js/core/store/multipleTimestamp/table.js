function Table(dbTable, timestamped = true) {
  this.table = dbTable;
  this.timestamped = timestamped;
}

Table.prototype.set = async function(key, value) {
  const obj = this.timestamped ? Object.assign({ timestamp: new Date().getTime() }, value) : value;
  return this.table.put(obj, key);
};

Table.prototype.get = async function(key) {
  const obj = await this.table.get(key);
  // strip out timestamp if the table is timestamped
  obj.timestamp = this.timestamped ? undefined : obj.timestamp;
  return obj;
};

Table.prototype.timestamp = async function(key) {
  if (!this.timestamped) {
    throw new Error('Cannot get timestamp from non-timestamped table');
  }

  return (await this.table.get(key)).timestamp;
};
