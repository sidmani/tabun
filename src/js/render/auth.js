const Drive = require('./drive');
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
    try { 
      const drive = new Drive(response.access_token, response.expires_in + Math.floor(Date.now() / 1000));
      await drive.validate(response.access_token);
      drive.persist();
      window.location = '../main/';
    } catch (e) {
      document.body.innerHTML = 'Authentication error. <a href="/auth/">Try again</a>';
    }
  } else {
    try {
      const drive = Drive.retrieve();
      await drive.validate();
      window.location = '../main/';
    } catch (e) {
      window.location = Drive.authURL;
    }
  }
};
