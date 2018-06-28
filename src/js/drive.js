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

const client_id = '631778365896-q1bihh884del9i6kg1qf22d6t563kj2e.apps.googleusercontent.com'

function auth(state) {
  window.location = `${endpoints.auth}?${qs.build({
    client_id,
    redirect_uri: 'https://localhost:8000/auth',
    response_type: 'token',
    scope: authScope,
    include_granted_scopes: true,
    state,
  })}`;
}

async function validate(token) {
  const json = await http.getJSON(endpoints.tokenValidation, { access_token: token }, token);

  if (json.error || json.aud !== client_id || json.scope !== authScope) {
    throw new Error('Validation error');
  }

  return json;
}

async function validateOrAuth() {
  if (!window.localStorage.token) {
    return auth();
  }

  try {
    return await validate(window.localStorage.token);
  } catch (e) {
    return auth();
  }
}

// async function meta(id, token) {
//   const res = await fetch(`${endpoints.drive}/files/${id}`, {
//     headers: headers(token),
//   });
//   return res.json();
// }

async function list(q, token, spaces = ['appDataFolder']) {
  return http.getJSON(endpoints.files, {
    spaces: spaces.join(','),
    q,
  },
  token);
}

async function create(name, data, parents = ['appDataFolder'], token) {
  // upload file
  const res = await http.post(endpoints.upload, { uploadType: 'media' }, token, data);
}

module.exports = {
  list,
  auth,
  validate,
  validateOrAuth,
};
