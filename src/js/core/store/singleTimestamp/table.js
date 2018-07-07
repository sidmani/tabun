function Table(db, key) {
  this.table = db[key];
  this.timestampKey = `${key}_timestamp`;
}

Table.prototype.synchronize = require('./synchronize');

Table.prototype.get = function () {
  return this.table.toArray();
};

Table.prototype.set = async function (value, timestamp) {
  await this.table.bulkPut(value);
  window.localStorage[this.timestampKey] = timestamp;
};

Table.prototype.timestamp = function () {
  return window.localStorage[this.timestampKey] || 0;
};
