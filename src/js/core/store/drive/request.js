const http = require('../..//util/http');

async function single(req) {
  const res = await http.request(
    req.endpoint,
    req.query,
    req.body,
    req.method,
    Object.assign({ Authorization: `Bearer ${this.token}` }, req.headers),
  );

  if (req.handler) {
    return req.handler(res);
  }
  return res;
}

async function batch(reqs) {
}

module.exports = {
  async request(req) {
    if (!Array.isArray(req)) {
      return single(req);
    }

    if (req.length === 0) {
      return [];
    }

    if (req.length === 1) {
      return single(req[0]);
    }

    return batch(req);
  },
};

