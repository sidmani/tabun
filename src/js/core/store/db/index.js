const Dexie = require('dexie');
const dbName = "tabun";

function DB() {
  this.db = new Dexie(dbName);
  db.version(1).stores({
    decks: 'id, name, source',
    notes: 'id, deck',
    records: '++, note, deck, modifiedAt',
  });
}

DB.prototype.put = async function(store, key, value) {
  return this.db[store].put(value, key);
};

DB.prototype.get = async function(store, key) {
  return this.db[store].get(key);
};

// db.put('decks', { name: 'Kanji', source: 'github', locator: 'sidmani/tabun_example' }, 'jUjnJnISUD349d')
// db.put('notes', { deck: '', fields: {} }, value.id }

