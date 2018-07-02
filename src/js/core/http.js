const qs = require('./querystring');

const mime = {
  json: 'application/json',
  plainText: 'text/plain',
};

async function request(url, query, body, method, headers) {
  let resource = url;
  if (query) {
    resource += `?${qs.build(query)}`;
  }

  return fetch(resource, {
    body,
    method,
    headers: new Headers(headers),
  });
}

function multipart(parts, mimeTypes, boundary = 'boundary') {
  let result = '';
  for (let i = 0; i < parts.length; i++) {
    result += `--${boundary}
Content-Type: ${mimeTypes[i]}; charset=UTF-8

${parts[i]}
`;
  }
  result += `
--${boundary}--`;
  return result;
}

module.exports = {
  request,
  multipart,
  mime,
};
