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
require('regenerator-runtime/runtime');

const settings = require('./render/settings');
const decks = require('./render/decks');
const auth = require('./render/auth');
const dexie = require('dexie');

module.exports = {
  settings,
  decks,
  auth,
};
