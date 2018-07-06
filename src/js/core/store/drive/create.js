const http = require('../../util/http');
const endpoints = require('./endpoints');

module.exports = {
  create: function(name, data, parents = ['appDataFolder']) {
    const meta = {
      name,
      parents,
    };
    const body = http.multipart([JSON.stringify(meta), data], [http.mime.json, http.mime.plainText]);
    
    return {
      endpoint: endpoints.upload,
      query: { uploadType: 'multipart' },
      body,
      method: 'PUT',
      headers: {
        'Content-Type': 'multipart/related; boundary=boundary',
        'Content-Length': Buffer.byteLength(data, 'utf8'),
      },
    };
  }, 
  createMeta: function(id, properties, parents = ['appDataFolder']) {
    return {
      endpoint: endpoints.files,
      body: JSON.stringify({
        id,
        properties,
        parents,
      }),
      method: 'POST',
      handler: async function(res) {
        return (await res.json()).id;
      },
    };
  },
  createFolder: function(name, parents = ['appDataFolder']) {
    return {
      endpoint: endpoints.files,
      body: JSON.stringify({
        mimeType: 'application/vnd.google-apps.folder',
        name,
      }),
      method: 'POST',
      handler: async function(res) {
        return (await res.json()).id;
      },
    };
  },
  createIds: async function(count, space = 'appDataFolder') {
    const res = await this.httpMethod(`${endpoints.files}/generateIds`, { count, space }, undefined, 'GET');
    return res.ids;
  },
  delete: function(id) {
    return {
      endpoint: `${endpoints.files}/${id}`,
      method: 'DELETE',
    };
  },
};

