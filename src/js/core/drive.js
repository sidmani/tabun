const qs = require('./querystring');
const http = require('./http');

const authScope = 'https://www.googleapis.com/auth/drive.appdata';
const endpoints = {
  upload: 'https://www.googleapis.com/upload/drive/v3/files',
  files: 'https://www.googleapis.com/drive/v3/files',
  drive: 'https://www.googleapis.com/drive/v3',
  auth: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenValidation: 'https://www.googleapis.com/oauth2/v3/tokeninfo',
};

const clientId = '631778365896-q1bihh884del9i6kg1qf22d6t563kj2e.apps.googleusercontent.com';

function Drive(token, expiry) {
  this.token = token;
  this.expiry = expiry;
}

Drive.prototype.httpMethod = async function(endpoint, query, body, method, headers) {
  return http.request(endpoint, query, body, method, Object.assign({ Authorization: `Bearer ${this.token}` }, headers));
};

Drive.authURL = `${endpoints.auth}?${qs.build({
    client_id: clientId,
    redirect_uri: 'https://localhost:8000/auth',
    response_type: 'token',
    scope: authScope,
    include_granted_scopes: true,
    state: 'foo',
  })}`; 

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

Drive.prototype.persist = function() {
  window.localStorage.driveData = JSON.stringify({ token: this.token, expiry: this.expiry });
};

Drive.prototype.validate = async function() {
  const res = await this.httpMethod(endpoints.tokenValidation, { access_token: this.token }, undefined, 'GET');
  const json = await res.json();
  if (json.error || json.aud !== clientId || json.scope !== authScope) {
    throw new Error('Token validation failed');
  }
};

Drive.prototype.get = async function(id) {
  return this.httpMethod(`${endpoints.files}/${id}`, { alt: 'media' }, undefined, 'GET');
};

Drive.prototype.list = async function(q, spaces = ['appDataFolder']) {
  const res = await this.httpMethod(endpoints.files, {
    spaces: spaces.join(','),
    q,
  }, undefined, 'GET');
 
  return (await res.json()).files;;
};

Drive.prototype.put = async function(name, data, parents = ['appDataFolder']) {
  const meta = {
    name,
    parents,
  };

  const body = http.multipart([JSON.stringify(meta), data], [http.mime.json, http.mime.plainText]);

  return this.httpMethod(endpoints.upload, { uploadType: 'multipart' }, body, 'POST', {
    'Content-Type': 'multipart/related; boundary=boundary',
    'Content-Length': Buffer.byteLength(data, 'utf8'),
  });
};

Drive.prototype.update = async function(id, newData) {
  return this.httpMethod(`${endpoints.upload}/${id}`, { uploadType: 'media' }, newData, 'PATCH');
}

module.exports = Drive;
