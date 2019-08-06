const Decks = require('../core/deck/decks');
const Drive = require('../core/drive');
const Settings = require('../core/settings');
const build = require('./buildHTML');

function layout(decks) {
  const tableBody = document.getElementById('decks').getElementsByTagName('TBODY')[0];
  
  for (let i = 0; i < decks.length; i += 1) {
    tableBody.appendChild(build({
      tag: 'tr',
      'class': 'deck',
      children: [{
        tag: 'td',
        'class': 'deck-name',
        text: decks[i].name,
      }, {
        tag: 'td',
        'class': 'deck-source',
        text: decks[i].source,
      }],
    })); 
  }
}

async function display() {
  // set add deck button handler
  const add = document.getElementById('add');
  add.onclick = function() {
    add.style.display = 'none';
    document.getElementById('add-input').style.display = 'block';
  };

  const addCancel = document.getElementById('add-no');
  const locatorInput = document.getElementById('locator');
  const sourceInput = document.getElementById('source');
  addCancel.onclick = function() {
    document.getElementById('add-input').style.display = 'none';
    add.style.display = 'inline';
    locatorInput.value = '';
  };
  
  // redirect to auth if token doesn't exist
  const drive = await Drive.setup();

  // create settings and sync
  const settings = new Settings(drive);
  await settings.synchronize(Settings.default());
  
  // create deck manager
  const decks = new Decks(settings, drive);
  layout(decks.list());

  const addOk = document.getElementById('add-ok');
  addOk.onclick = async function() {
    try {
      await decks.add(sourceInput.value, locatorInput.value);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = { display };
