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
require("regenerator-runtime/runtime");

const user = require('./user');
const decks = require('./decks');
const auth = require('./auth');

const start = function() {

  if (!localStorage.token) {
    // token doesn't exist, login with github
    // localStorage.settings = JSON.stringify({
    //   decks: [{
    //     github: "sidmani/tabun_example",
    //     version: "0.0.1",
    //   }]
    // });

  }

  // const settings = JSON.parse(window.localStorage.settings);
  // const decks = settings.decks;
  // // load decks
  // const loadedDecks = [];
  // for (let i = 0; i < decks.length; i++) {
  //   deck.load(decks[i])
  //     .then(d => {
  //       loadedDecks.push(d);
  //       app.innerHTML = displayDecks(loadedDecks);
  //     });
  // }
};

module.exports = {
  start,
  decks,
  auth,
};
