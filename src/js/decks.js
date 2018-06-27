// const fetch = require('fetch');

function load(deck) {
  if (deck.github) {
    // use public github API to load
    return fetch('https://api.github.com/repos/' + deck.github + '/contents/deck.json')
      .then(res => res.json())
      .then(json => JSON.parse(window.atob(json.content)))
  } else {
    throw Error('unsupported deck source');
  }
};

function generateHTML(decks) {
  let result = `<div class="decks">`;
  for (let i = 0; i < decks.length; i++) {
    result += `<div class="deck"><span class="deck-name">${decks[i].name}</span><span class="deck-version">${decks[i].version}</span></div>`;
  }
  return result + `</div>`;
};

function display(settings) {
  const decks = [];
  const app = document.getElementById('app');
  settings.decks
    .map(deck => load(deck))
    .forEach(deckPromise => {
      deckPromise
        .then(d => {
          decks.push(d);
          app.innerHTML = generateHTML(decks);
        });
    });
}


module.exports = { load, display };
