const http = require('../../util/http');
const endpoints = require('./endpoints');

function upload(meta, data) {
  const body = http.multipart([JSON.stringify(meta), data], [http.mime.json, http.mime.plainText]);

  return {
    query: { uploadType: 'multipart' },
    body,
    headers: {
      'Content-Type': 'multipart/related; boundary=boundary',
      'Content-Length': Buffer.byteLength(data, 'utf8'),
    },
  };
}

function createMetaOnly(meta = {}) {
  return {
    endpoint: endpoints.files,
    body: JSON.stringify(meta),
    method: 'POST',
    handler: async function (res) {
      return (await res.json()).id;
    },
  };
}

module.exports.create = function (meta, data) {
  if (data) {
    meta.parents = meta.parents || ['appDataFolder'];

    const req = upload(data, meta);
    req.method = 'PUT';
    req.endpoint = endpoints.upload;
    req.handler = async function (res) {
      return (await res.json()).id;
    };

    return req;
  }
  return createMetaOnly(meta);
};

module.exports.createFolder = function (name, parents) {
  return createMetaOnly({
    mimeType: 'application/vnd.google-apps.folder',
    name,
    parents,
  });
};

module.exports.createIds = function (count, space = 'appDataFolder') {
  return {
    endpoint: `${endpoints.files}/generateIds`,
    query: { count, space },
    method: 'GET',
    handler: async function (res) {
      return (await res.json()).ids;
    },
  };
};

module.exports.update = function (id, meta, data) {
  if (data) {
    const req = upload(meta, data);
    req.method = 'PATCH';
    req.endpoint = `${endpoints.upload}/${id}`;

    return req;
  }
  return {
    endpoint: `${endpoints.files}/${id}`,
    body: JSON.stringify(meta),
    method: 'PATCH',
  };
};

module.exports.delete = function (id) {
  return {
    endpoint: `${endpoints.files}/${id}`,
    method: 'DELETE',
  };
};
