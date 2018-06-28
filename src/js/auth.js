const drive = require('./drive');
const qs = require('./querystring');

module.exports = async function auth() {
  const hash = window.location.hash.substr(1);
  if (hash.length > 0) {
    // return from google
    const response = qs.parse(hash);

    if (response.error) {
      console.error('Auth failure.');
      return;
    }

    // validate the token
    await drive.validate(response.access_token);
    window.localStorage.token = response.access_token;
    window.location = '/main/';
  } else if (!window.localStorage.token) {
    // redirect to google
    drive.auth();
  } else {
    // token exists
    try {
      await drive.validate(window.localStorage.token);
      // token is ok
      window.location = '/main/';
    } catch (e) {
      // reauthenticate
      window.localStorage.token = undefined;
      drive.auth();
    }
  }
};
