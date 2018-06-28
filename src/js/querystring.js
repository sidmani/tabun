module.exports = {
  parse(str) {
    const ret = {};
    str.split('&').forEach(p => {
      if (p.includes('=')) {
        const pair = p.split('=');
        ret[pair[0]] = pair[1];
      } else {
        ret[p] = true;
      }
    });
    return ret;
  },
  build(obj) {
    return Object.keys(obj).map(key => `${encodeURI(key)}=${encodeURI(obj[key])}`).join('&');
  }
};
