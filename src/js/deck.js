// const fetch = require('fetch');

const load = function(deck) {
  if (deck.github) {
    // use public github API to load
    return fetch('https://api.github.com/repos/' + deck.github + '/contents/deck.json')
      .then(res => res.json())
      .then(json => JSON.parse(window.atob(json.content)))
  } else {
    throw Error('unsupported deck source');
  }
};

module.exports = { load };
