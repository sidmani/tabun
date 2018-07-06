const qs = require('./util/querystring');

const authScope = 'https://www.googleapis.com/auth/drive.appdata';
const clientId = '631778365896-q1bihh884del9i6kg1qf22d6t563kj2e.apps.googleusercontent.com';
const redirectURI = 'https://localhost:8000/auth';

const endpoints = {
  upload: 'https://www.googleapis.com/upload/drive/v3/files',
  files: 'https://www.googleapis.com/drive/v3/files',
  drive: 'https://www.googleapis.com/drive/v3',
  auth: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenValidation: 'https://www.googleapis.com/oauth2/v3/tokeninfo',
  generateAuth = function() {
    const state = 'foo'; // TODO: generate state
    const query = {
      client_id: clientId,
      redirect_uri: redirectURI,
      response_type: 'token',
      scope: authScope,
      include_granted_scopes: true,
      state,
    };

    return {
      url: `${endpoints.auth}?${qs.build(query)}`,
      state,
    }    
  },
};

module.exports = endpoints;

