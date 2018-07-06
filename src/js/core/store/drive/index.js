function Drive(token, expiry) {
  this.token = token;
  this.expiry = expiry;
}

Object.assign(Drive.prototype, require('./create.js'));
Object.assign(Drive.prototype, require('./update.js'));
Object.assign(Drive.prototype, require('./request.js'));
Object.assign(Drive.prototype, require('./read.js'));

// store and retrieve the token in localstorage
Drive.retrieve = function() {
  if (!window.localStorage.driveData) {
    throw new Error('Could not load token.');
  }

  const saved = JSON.parse(window.localStorage.driveData);
  return new Drive(saved.token, saved.expiry);
};

// TODO: this function is convenient but breaks encapsulation
Drive.setup = async function() {
  try {
    const d = Drive.retrieve();
    await d.validate();
    return d;
  } catch(e) {
    window.location = Drive.authURL;
  }
};

// persist drive token to disk
Drive.prototype.persist = function() {
  window.localStorage.driveData = JSON.stringify({ token: this.token, expiry: this.expiry });
};

// validate drive token
Drive.prototype.validate = function() {
  return {
    endpoint: endpoints.tokenValidation;
    query: { access_token: this.token },
    method: 'GET',
    handler: async function(res) {
      const json = await res.json();
      if (json.error || json.aud !== clientId || json.scope !== authScope) {
        throw new Error('Token validation failed');
      }     
    },
  };
};

module.exports = Drive;
