module.exports = function() {
  const params = window.location.search.substr(1);
  if (params.length > 0) {
    // return from github
    console.log("received params " + params);
  } else if (!window.localStorage.token) {
    // redirect to GitHub
    const querystr = `client_id=7289916c579cec081358&redirect_uri=https://sidmani.github.io/tabun/auth&scope=gist&state=${"foobar"}`

    window.location = "https://github.com/login/oauth/authorize?" + querystr;
  } else {
    // check auth?
  }
}
