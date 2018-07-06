const http = require('../..//util/http');
module.exports = {
  request: async function(req) {
    const res = await http.request(
      req.endpoint, 
      req.query, 
      req.body, 
      req.method, 
      Object.assign({ Authorization: `Bearer ${this.token}` }, req.headers)
    );
    
    if (req.handler) {
      return req.handler(res);
    }
    return res;
  },
  batch: async function(reqs) {
    // TODO: implementation
  },
};
