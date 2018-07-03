module.exports = function buildHTML(object) {
  const element = document.createElement(object.tag.toUpperCase());
  Object.keys(object).forEach(attr => {
    if (attr !== 'tag' && attr !== 'children' && attr !== 'text') {
      element.setAttribute(attr, object[attr]);
    }
  });

  if (object.children) {
    object.children.forEach(c => {
      element.appendChild(buildHTML(c));
    });
  }

  if (object.text) {
    element.appendChild(document.createTextNode(object.text));
  }

  return element;
}
