const drive = require('./drive');
const settings = require('./settings');

function load(deck) {
  if (deck.github) {
    // use public github API to load
    return fetch('https://api.github.com/repos/' + deck.github + '/contents/deck.json')
      .then(res => res.json())
      .then(json => JSON.parse(window.atob(json.content)))
  }
  throw Error('unsupported deck source');
}

function generateHTML(decks) {
  let result = '<div class="decks">';
  for (let i = 0; i < decks.length; i += 1) {
    result += `<div class="deck"><span class="deck-name">${decks[i].name}</span><span class="deck-version">${decks[i].version}</span></div>`;
  }
  return `${result}</div>`;
}

async function display() {
  // redirect to auth if token doesn't exist
  await drive.validateOrAuth();
  const file = await settings.get();
  console.log(file);
  // const decks = [];
  // const app = document.getElementById('app');
  // settings.decks
  //   .map(deck => load(deck))
  //   .forEach(deckPromise => {
  //     deckPromise
  //       .then(d => {
  //         decks.push(d);
  //         app.innerHTML = generateHTML(decks);
  //       });
  //   });
}


module.exports = { load, display };
