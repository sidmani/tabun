const endpoints = require('./endpoints');

module.exports = {
  get: function(id) {
    return {
      endpoint: `${endpoints.files}/${id}`,
      query: { alt: 'media' },
      method: 'GET',
    };
  },
  getMeta: function(id, fields = '') {
    return {
      endpoint: `${endpoints.files}/${id}`,
      query: { fields },
      method: 'GET',
    };
  },
  list: function(q, fields, spaces = ['appDataFolder']) {
    return {
      endpoint: endpoints.files,
      query: { spaces: spaces.join(','), q, fields },
      method: 'GET',
      handler: async function(res) {
        return (await res.json()).files;
      },
    };
  },
};
