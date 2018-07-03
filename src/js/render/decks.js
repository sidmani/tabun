const Decks = require('../core/deck/decks');
const Drive = require('../core/drive');
const Settings = require('../core/settings');
const build = require('./buildHTML');

function layout(decks) {
  const obj = {
    tag: 'div',
    'class': 'decks',
    children: [],
  }
  
  for (let i = 0; i < decks.length; i += 1) {
    obj.children.push({
      tag: 'div',
      'class': 'deck',
      children: [{
        tag: 'span',
        'class': 'deck-name',
        text: decks[i].name,
      }, {
        tag: 'span',
        'class': 'deck-source',
        text: decks[i].source,
      }],
    }); 
  }
  
  document.getElementById('app').appendChild(build(obj));
}

async function display() {
  // redirect to auth if token doesn't exist
  const drive = await Drive.setup();

  // create settings and sync
  const settings = new Settings(drive);
  await settings.synchronize(Settings.default());
  
  // create deck manager
  const decks = new Decks(settings, drive);
  layout(decks.list());
}


module.exports = { display };
