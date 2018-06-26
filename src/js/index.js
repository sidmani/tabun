// Tabun - a distributed, extensible spaced-repetition flashcard software
// Copyright (C) 2018 Sid Mani
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
const user = require('./user');
const deck = require('./deck');

const start = function() {
  // set default settings in localstorage if nonexistent
  if (!localStorage.settings) {
    localStorage.settings = JSON.stringify({
      decks: [{
        github: "sidmani/tabun_example"
      }]
    });
  }

  const settings = JSON.parse(window.localStorage.settings);
  const decks = settings.decks;
  // hide text
  document.getElementById('desc').style.display = 'none';
  // show app
  const app = document.getElementById('app');
  app.style.display = 'block';

  // load decks
  document.getElementById('subtitle').innerHTML = "Decks";
  const loadedDecks = [];
  for (let i = 0; i < decks.length; i++) {
    deck.load(decks[i])
      .then(d => {
        loadedDecks.push(d);
        app.innerHTML = displayDecks(loadedDecks);
      });
  }
};

const displayDecks = function(decks) {
  let result = `<div class="decks">`;
  for (let i = 0; i < decks.length; i++) {
    console.log(decks[i]);
    result += `<div class="deck"><span class="deck-name">${decks[i].name}</span><span class="deck-author">${decks[i].author}</span></div>`;
  }
  return result + `</div>`;
};

module.exports = {
  start,
  displayDecks,
};
