const github = {
  getMeta: async function(locator) { // locator is of the form 'user/repo-name'
    return fetch(`https://api.github.com/repos/${locator}/contents/deck.json`)
      .then(res => res.json())
      .then(json => JSON.parse(window.atob(json.content)))
  },
};

module.exports = {
  github,
};
