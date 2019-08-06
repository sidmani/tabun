const endpoints = require('./endpoints');

module.exports = {
  get(id) {
    return {
      endpoint: `${endpoints.files}/${id}`,
      query: { alt: 'media' },
      method: 'GET',
    };
  },
  getMeta(id, fields = '') {
    return {
      endpoint: `${endpoints.files}/${id}`,
      query: { fields },
      method: 'GET',
      async handler(res) {
        return res.json();
      },
    };
  },
  list(q, fields, spaces = ['appDataFolder']) {
    return {
      endpoint: endpoints.files,
      query: { spaces: spaces.join(','), q, fields },
      method: 'GET',
      async handler(res) {
        return (await res.json()).files;
      },
    };
  },
};
