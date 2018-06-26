(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.tabun = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

// const fetch = require('fetch');

var load = function load(deck) {
  if (deck.github) {
    // use public github API to load
    return fetch('https://api.github.com/repos/' + deck.github + '/contents/deck.json').then(function (res) {
      return res.json();
    }).then(function (json) {
      return JSON.parse(window.atob(json.content));
    });
  } else {
    throw Error('unsupported deck source');
  }
};

module.exports = { load: load };

},{}],2:[function(require,module,exports){
'use strict';

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
var user = require('./user');
var deck = require('./deck');

var start = function start() {
  // set default settings in localstorage if nonexistent
  if (!localStorage.settings) {
    localStorage.settings = JSON.stringify({
      decks: [{
        github: "sidmani/tabun_example"
      }]
    });
  }

  var settings = JSON.parse(window.localStorage.settings);
  var decks = settings.decks;
  // hide text
  document.getElementById('desc').style.display = 'none';
  // show app
  var app = document.getElementById('app');
  app.style.display = 'block';

  // load decks
  document.getElementById('subtitle').innerHTML = "Decks";
  var loadedDecks = [];
  for (var i = 0; i < decks.length; i++) {
    deck.load(decks[i]).then(function (d) {
      loadedDecks.push(d);
      app.innerHTML = displayDecks(loadedDecks);
    });
  }
};

var displayDecks = function displayDecks(decks) {
  var result = '<div class="decks">';
  for (var i = 0; i < decks.length; i++) {
    console.log(decks[i]);
    result += '<div class="deck"><span class="deck-name">' + decks[i].name + '</span><span class="deck-author">' + decks[i].author + '</span></div>';
  }
  return result + '</div>';
};

module.exports = {
  start: start,
  displayDecks: displayDecks
};

},{"./deck":1,"./user":3}],3:[function(require,module,exports){
'use strict';

// load user config files
module.exports.load = function load(url) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'github_gist';
};

module.exports.default = {
  decks: []
};

},{}]},{},[2])(2)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZGVjay5qcyIsInNyYy9qcy9pbmRleC5qcyIsInNyYy9qcy91c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7QUFFQSxJQUFNLE9BQU8sU0FBUCxJQUFPLENBQVMsSUFBVCxFQUFlO0FBQzFCLE1BQUksS0FBSyxNQUFULEVBQWlCO0FBQ2Y7QUFDQSxXQUFPLE1BQU0sa0NBQWtDLEtBQUssTUFBdkMsR0FBZ0QscUJBQXRELEVBQ0osSUFESSxDQUNDO0FBQUEsYUFBTyxJQUFJLElBQUosRUFBUDtBQUFBLEtBREQsRUFFSixJQUZJLENBRUM7QUFBQSxhQUFRLEtBQUssS0FBTCxDQUFXLE9BQU8sSUFBUCxDQUFZLEtBQUssT0FBakIsQ0FBWCxDQUFSO0FBQUEsS0FGRCxDQUFQO0FBR0QsR0FMRCxNQUtPO0FBQ0wsVUFBTSxNQUFNLHlCQUFOLENBQU47QUFDRDtBQUNGLENBVEQ7O0FBV0EsT0FBTyxPQUFQLEdBQWlCLEVBQUUsVUFBRixFQUFqQjs7Ozs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFNLE9BQU8sUUFBUSxRQUFSLENBQWI7QUFDQSxJQUFNLE9BQU8sUUFBUSxRQUFSLENBQWI7O0FBRUEsSUFBTSxRQUFRLFNBQVIsS0FBUSxHQUFXO0FBQ3ZCO0FBQ0EsTUFBSSxDQUFDLGFBQWEsUUFBbEIsRUFBNEI7QUFDMUIsaUJBQWEsUUFBYixHQUF3QixLQUFLLFNBQUwsQ0FBZTtBQUNyQyxhQUFPLENBQUM7QUFDTixnQkFBUTtBQURGLE9BQUQ7QUFEOEIsS0FBZixDQUF4QjtBQUtEOztBQUVELE1BQU0sV0FBVyxLQUFLLEtBQUwsQ0FBVyxPQUFPLFlBQVAsQ0FBb0IsUUFBL0IsQ0FBakI7QUFDQSxNQUFNLFFBQVEsU0FBUyxLQUF2QjtBQUNBO0FBQ0EsV0FBUyxjQUFULENBQXdCLE1BQXhCLEVBQWdDLEtBQWhDLENBQXNDLE9BQXRDLEdBQWdELE1BQWhEO0FBQ0E7QUFDQSxNQUFNLE1BQU0sU0FBUyxjQUFULENBQXdCLEtBQXhCLENBQVo7QUFDQSxNQUFJLEtBQUosQ0FBVSxPQUFWLEdBQW9CLE9BQXBCOztBQUVBO0FBQ0EsV0FBUyxjQUFULENBQXdCLFVBQXhCLEVBQW9DLFNBQXBDLEdBQWdELE9BQWhEO0FBQ0EsTUFBTSxjQUFjLEVBQXBCO0FBQ0EsT0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE1BQU0sTUFBMUIsRUFBa0MsR0FBbEMsRUFBdUM7QUFDckMsU0FBSyxJQUFMLENBQVUsTUFBTSxDQUFOLENBQVYsRUFDRyxJQURILENBQ1EsYUFBSztBQUNULGtCQUFZLElBQVosQ0FBaUIsQ0FBakI7QUFDQSxVQUFJLFNBQUosR0FBZ0IsYUFBYSxXQUFiLENBQWhCO0FBQ0QsS0FKSDtBQUtEO0FBQ0YsQ0E1QkQ7O0FBOEJBLElBQU0sZUFBZSxTQUFmLFlBQWUsQ0FBUyxLQUFULEVBQWdCO0FBQ25DLE1BQUksOEJBQUo7QUFDQSxPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksTUFBTSxNQUExQixFQUFrQyxHQUFsQyxFQUF1QztBQUNyQyxZQUFRLEdBQVIsQ0FBWSxNQUFNLENBQU4sQ0FBWjtBQUNBLDZEQUF1RCxNQUFNLENBQU4sRUFBUyxJQUFoRSx5Q0FBd0csTUFBTSxDQUFOLEVBQVMsTUFBakg7QUFDRDtBQUNELFNBQU8saUJBQVA7QUFDRCxDQVBEOztBQVNBLE9BQU8sT0FBUCxHQUFpQjtBQUNmLGNBRGU7QUFFZjtBQUZlLENBQWpCOzs7OztBQ3pEQTtBQUNBLE9BQU8sT0FBUCxDQUFlLElBQWYsR0FBc0IsU0FBUyxJQUFULENBQWMsR0FBZCxFQUF1QztBQUFBLE1BQXBCLElBQW9CLHVFQUFmLGFBQWU7QUFFNUQsQ0FGRDs7QUFJQSxPQUFPLE9BQVAsQ0FBZSxPQUFmLEdBQXlCO0FBQ3ZCLFNBQU87QUFEZ0IsQ0FBekIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBjb25zdCBmZXRjaCA9IHJlcXVpcmUoJ2ZldGNoJyk7XG5cbmNvbnN0IGxvYWQgPSBmdW5jdGlvbihkZWNrKSB7XG4gIGlmIChkZWNrLmdpdGh1Yikge1xuICAgIC8vIHVzZSBwdWJsaWMgZ2l0aHViIEFQSSB0byBsb2FkXG4gICAgcmV0dXJuIGZldGNoKCdodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zLycgKyBkZWNrLmdpdGh1YiArICcvY29udGVudHMvZGVjay5qc29uJylcbiAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgLnRoZW4oanNvbiA9PiBKU09OLnBhcnNlKHdpbmRvdy5hdG9iKGpzb24uY29udGVudCkpKVxuICB9IGVsc2Uge1xuICAgIHRocm93IEVycm9yKCd1bnN1cHBvcnRlZCBkZWNrIHNvdXJjZScpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgbG9hZCB9O1xuIiwiLy8gVGFidW4gLSBhIGRpc3RyaWJ1dGVkLCBleHRlbnNpYmxlIHNwYWNlZC1yZXBldGl0aW9uIGZsYXNoY2FyZCBzb2Z0d2FyZVxuLy8gQ29weXJpZ2h0IChDKSAyMDE4IFNpZCBNYW5pXG4vL1xuLy8gVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbi8vIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4vLyBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGVcbi8vIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4vL1xuLy8gVGhpcyBwcm9ncmFtIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuLy8gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuLy8gR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4vL1xuLy8gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4vLyBhbG9uZyB3aXRoIHRoaXMgcHJvZ3JhbS4gIElmIG5vdCwgc2VlIDxodHRwczovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5jb25zdCB1c2VyID0gcmVxdWlyZSgnLi91c2VyJyk7XG5jb25zdCBkZWNrID0gcmVxdWlyZSgnLi9kZWNrJyk7XG5cbmNvbnN0IHN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gIC8vIHNldCBkZWZhdWx0IHNldHRpbmdzIGluIGxvY2Fsc3RvcmFnZSBpZiBub25leGlzdGVudFxuICBpZiAoIWxvY2FsU3RvcmFnZS5zZXR0aW5ncykge1xuICAgIGxvY2FsU3RvcmFnZS5zZXR0aW5ncyA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGRlY2tzOiBbe1xuICAgICAgICBnaXRodWI6IFwic2lkbWFuaS90YWJ1bl9leGFtcGxlXCJcbiAgICAgIH1dXG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBzZXR0aW5ncyA9IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5zZXR0aW5ncyk7XG4gIGNvbnN0IGRlY2tzID0gc2V0dGluZ3MuZGVja3M7XG4gIC8vIGhpZGUgdGV4dFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVzYycpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIC8vIHNob3cgYXBwXG4gIGNvbnN0IGFwcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKTtcbiAgYXBwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gIC8vIGxvYWQgZGVja3NcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1YnRpdGxlJykuaW5uZXJIVE1MID0gXCJEZWNrc1wiO1xuICBjb25zdCBsb2FkZWREZWNrcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRlY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgZGVjay5sb2FkKGRlY2tzW2ldKVxuICAgICAgLnRoZW4oZCA9PiB7XG4gICAgICAgIGxvYWRlZERlY2tzLnB1c2goZCk7XG4gICAgICAgIGFwcC5pbm5lckhUTUwgPSBkaXNwbGF5RGVja3MobG9hZGVkRGVja3MpO1xuICAgICAgfSk7XG4gIH1cbn07XG5cbmNvbnN0IGRpc3BsYXlEZWNrcyA9IGZ1bmN0aW9uKGRlY2tzKSB7XG4gIGxldCByZXN1bHQgPSBgPGRpdiBjbGFzcz1cImRlY2tzXCI+YDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnNvbGUubG9nKGRlY2tzW2ldKTtcbiAgICByZXN1bHQgKz0gYDxkaXYgY2xhc3M9XCJkZWNrXCI+PHNwYW4gY2xhc3M9XCJkZWNrLW5hbWVcIj4ke2RlY2tzW2ldLm5hbWV9PC9zcGFuPjxzcGFuIGNsYXNzPVwiZGVjay1hdXRob3JcIj4ke2RlY2tzW2ldLmF1dGhvcn08L3NwYW4+PC9kaXY+YDtcbiAgfVxuICByZXR1cm4gcmVzdWx0ICsgYDwvZGl2PmA7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc3RhcnQsXG4gIGRpc3BsYXlEZWNrcyxcbn07XG4iLCIvLyBsb2FkIHVzZXIgY29uZmlnIGZpbGVzXG5tb2R1bGUuZXhwb3J0cy5sb2FkID0gZnVuY3Rpb24gbG9hZCh1cmwsIHR5cGU9J2dpdGh1Yl9naXN0Jykge1xuXG59XG5cbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIGRlY2tzOiBbXSxcbn07XG4iXX0=
