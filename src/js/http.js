
const qs = require('./querystring');

async function http(url, query, body, token, method) {
  let resource = url;
  if (query) {
    resource += `?${qs.build(query)}`;
  }

  return fetch(resource, {
    body,
    method,
    headers: new Headers({ Authorization: `Bearer ${token}` }),
  });
}

async function get(url, query, token, body) {
  return http(url, query, body, token, 'GET');
}

async function getJSON(url, query, token, body) {
  const res = await get(url, query, token, body);
  return res.json();
}

async function post(url, query, token, body) {
  return http(url, query, body, token, 'POST');
}

module.exports = {
  post,
  get,
  getJSON,
};
