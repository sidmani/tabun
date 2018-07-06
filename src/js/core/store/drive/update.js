const endpoints = require('./endpoints');
module.exports = {
  update: function(id, newData) {
    return {
      endpoint: `${endpoints.upload}/${id}`,
      query: { uploadType: 'media' },
      body: newData,
      method: 'PATCH',
    };
  },
  updateMeta: function(id, meta) {
    return {
      endpoint: `${endpoints.files}/${id}`,
      body: JSON.stringify(meta),
      method: 'PATCH',
    };
  },
};
